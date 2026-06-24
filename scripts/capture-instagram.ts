/**
 * Enhanced Instagram capture script
 *
 * Usage:
 *   npx tsx scripts/capture-instagram.ts <handle> <project-slug> [max-posts]
 *
 * Example:
 *   npx tsx scripts/capture-instagram.ts dareadvisors_official dare-advisors 12
 *
 * What it does:
 *   1. Opens the Instagram profile and grabs post URLs
 *   2. For each post — detects type: post / reel / carousel
 *   3. Posts    → saves thumbnail
 *   4. Carousels→ clicks through every slide and saves each image
 *   5. Reels    → downloads the MP4 video directly
 *   6. Prints the socialPosts[] array to paste into lib/projects.ts
 *
 * Output:
 *   public/projects/<slug>/social/post-N.jpg
 *   public/projects/<slug>/social/post-N-slide-M.jpg  (carousel slides)
 *   public/projects/<slug>/social/post-N.mp4          (reel videos)
 */

import { chromium, Page } from "playwright";
import path from "path";
import fs from "fs";
import https from "https";
import http from "http";

const [, , handle, slug, maxStr, offsetStr] = process.argv;
const MAX_POSTS = parseInt(maxStr    ?? "12", 10);
const OFFSET    = parseInt(offsetStr ?? "0",  10);

if (!handle || !slug) {
  console.error("Usage: npx tsx scripts/capture-instagram.ts <handle> <project-slug> [max-posts] [offset]");
  process.exit(1);
}

const OUTPUT_DIR = path.join(process.cwd(), "public", "projects", slug, "social");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Helpers ────────────────────────────────────────────────────────────────────

function downloadUrl(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    const file  = fs.createWriteStream(dest);
    proto.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
        "Referer": "https://www.instagram.com/",
      },
    }, (res) => {
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function dismissOverlays(page: Page) {
  for (const text of ["Accept All", "Allow all cookies", "Allow essential and optional cookies"]) {
    try { await page.click(`text=${text}`, { timeout: 2_500 }); await page.waitForTimeout(500); break; }
    catch {}
  }
  for (const sel of ['[aria-label="Close"]', 'button:has-text("Not Now")', 'button:has-text("Not now")']) {
    try { await page.click(sel, { timeout: 2_500 }); await page.waitForTimeout(500); break; }
    catch {}
  }
}

async function extractInstagramImages(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const seen = new Set<string>();
    const urls: string[] = [];
    for (const img of document.querySelectorAll<HTMLImageElement>("article img, main img")) {
      const src = img.src || "";
      if ((src.includes("cdninstagram") || src.includes("fbcdn")) && !seen.has(src)) {
        seen.add(src);
        urls.push(src);
      }
    }
    return urls;
  });
}

// ── Per-post scraping ──────────────────────────────────────────────────────────

interface PostResult {
  index: number;
  type: "post" | "reel" | "carousel";
  thumb: string;
  slides: string[];    // carousel slide paths (relative to public)
  videoSrc?: string;   // reel video path (relative to public)
  instagramUrl: string;
}

async function scrapePost(page: Page, postUrl: string, idx: number, gridThumb: string): Promise<PostResult | null> {
  try {
    await page.goto(postUrl, { waitUntil: "load", timeout: 60_000 });
    await dismissOverlays(page);
    await page.waitForTimeout(2_000);

    const baseName = `post-${idx + 1}`;
    const thumbPath = path.join(OUTPUT_DIR, `${baseName}.jpg`);

    const result: PostResult = {
      index: idx,
      type: "post",
      thumb: `/projects/${slug}/social/${baseName}.jpg`,
      slides: [],
      instagramUrl: postUrl,
    };

    // ── Temporary cover: use grid thumbnail as fallback, will be overwritten
    //    by the full-quality post-page image for posts and carousel slide 1.
    if (gridThumb && (gridThumb.includes("cdninstagram") || gridThumb.includes("fbcdn"))) {
      try {
        await downloadUrl(gridThumb, thumbPath);
      } catch { /* ignore — post-page image will overwrite */ }
    }

    // ── Detect reel ─────────────────────────────────────────────────────────
    const isReel = postUrl.includes("/reel/") || await page.evaluate(() => !!document.querySelector("video"));

    if (isReel) {
      result.type = "reel";
      // Try to get the video source URL for direct playback
      const videoSrc = await page.evaluate(() => {
        const v = document.querySelector<HTMLVideoElement>("video");
        return v?.src || v?.currentSrc || null;
      });
      if (videoSrc && videoSrc.startsWith("http")) {
        const videoPath = path.join(OUTPUT_DIR, `${baseName}.mp4`);
        try {
          await downloadUrl(videoSrc, videoPath);
          result.videoSrc = `/projects/${slug}/social/${baseName}.mp4`;
          console.log(`  ✓ reel video   ${baseName}.mp4`);
        } catch {
          console.warn(`  ⚠ reel video download failed`);
        }
      }
      return result;
    }

    // ── Detect carousel ──────────────────────────────────────────────────────
    const nextBtn = page.locator('[aria-label="Next"]').first();
    const hasNext = await nextBtn.isVisible().catch(() => false);

    if (hasNext) {
      result.type = "carousel";

      const slideImages: string[] = [];
      let slideIdx = 0;
      const maxSlides = 10;
      let prevImgUrl = "";

      while (slideIdx < maxSlides) {
        // Wait until the main image URL changes (ensures new slide is loaded)
        if (prevImgUrl) {
          await page.waitForFunction(
            (prev: string) => {
              const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("article img, main img"));
              const large = imgs.find(
                (el) =>
                  el.src.includes("cdninstagram") &&
                  !el.src.includes("s150x150") &&
                  !el.src.includes("s320x320") &&
                  el.naturalWidth > 200
              );
              return !!large && large.src !== prev;
            },
            prevImgUrl,
            { timeout: 5_000 }
          ).catch(() => {});
        }

        // Extract the currently visible main slide image
        const imgs = await extractInstagramImages(page);
        const mainImg = imgs.find(
          (u) => !u.includes("s150x150") && !u.includes("s320x320")
        );

        if (mainImg && mainImg !== prevImgUrl) {
          if (slideIdx === 0) {
            // Slide 1 is the cover — overwrite the (potentially cropped) grid thumbnail
            // with the full-quality uncropped image from the post page.
            try {
              await downloadUrl(mainImg, thumbPath);
              console.log(`  ✓ cover        ${baseName}.jpg  (slide 1, full quality)`);
            } catch {
              console.warn(`  ⚠ slide 1 cover download failed`);
            }
          } else {
            const slideName = `${baseName}-slide-${slideIdx + 1}.jpg`;
            const slidePath = path.join(OUTPUT_DIR, slideName);
            try {
              await downloadUrl(mainImg, slidePath);
              slideImages.push(`/projects/${slug}/social/${slideName}`);
              console.log(`  ✓ carousel     ${slideName}`);
            } catch {
              console.warn(`  ⚠ slide ${slideIdx + 1} download failed`);
            }
          }
        }

        if (mainImg) prevImgUrl = mainImg;

        // Click Next
        const btn = page.locator('[aria-label="Next"]').first();
        const visible = await btn.isVisible().catch(() => false);
        if (!visible) break;
        await btn.click();
        slideIdx++;
      }

      result.slides = slideImages;
      return result;
    }

    // ── Regular post — overwrite grid thumbnail with full-quality post image ──
    const imgs = await extractInstagramImages(page);
    const mainImg = imgs.find((u) => !u.includes("s150x150") && !u.includes("s320x320")) || imgs[0];
    if (mainImg) {
      try {
        await downloadUrl(mainImg, thumbPath);
        console.log(`  ✓ cover        ${baseName}.jpg  (post, full quality)`);
      } catch {
        console.warn(`  ⚠ post image download failed — keeping grid thumbnail`);
      }
    }

    return result;
  } catch (err) {
    console.warn(`  ✗ failed post ${idx + 1} — ${(err as Error).message}`);
    return null;
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n📱  @${handle}  →  public/projects/${slug}/social/\n`);

  const browser = await chromium.launch({
    headless: false,
    channel: "chrome",
    args: ["--no-sandbox", "--disable-blink-features=AutomationControlled"],
  });
  const ctx = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 900 },
    locale: "en-US",
    extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
  });
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  const profilePage = await ctx.newPage();
  await profilePage.route("**/*.{woff,woff2,otf,ttf}", (r) => r.abort());

  // ── Step 1: collect post URLs + grid thumbnails from profile ─────────────
  await profilePage.goto(`https://www.instagram.com/${handle}/`, { waitUntil: "load", timeout: 60_000 });
  await dismissOverlays(profilePage);
  await profilePage.waitForTimeout(3_000);

  // Detect login wall — pause so the user can log in manually
  const isLoginWall = await profilePage.locator('input[name="username"]').isVisible({ timeout: 3_000 }).catch(() => false);
  if (isLoginWall) {
    console.log(
      "\n  ⚠️  Instagram is showing a login wall.\n" +
      "      Log in manually in the browser window, navigate back to the profile, then press Enter here...\n"
    );
    await new Promise<void>((resolve) => { process.stdin.once("data", () => resolve()); });
    await profilePage.waitForTimeout(2_000);
    await dismissOverlays(profilePage);
  }

  // Scroll aggressively to load all post rows, waiting for DOM updates between passes
  await profilePage.evaluate(async () => {
    let lastCount = 0;
    for (let pass = 0; pass < 12; pass++) {
      window.scrollBy(0, window.innerHeight);
      await new Promise((r) => setTimeout(r, 1_200));
      const count = document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]').length;
      if (count === lastCount && pass > 3) break; // no new posts appeared — stop early
      lastCount = count;
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 800));
  });

  // Extract post URLs paired with their grid cover thumbnails
  const postData: { url: string; thumb: string }[] = await profilePage.evaluate(() => {
    const results: { url: string; thumb: string }[] = [];
    const seen = new Set<string>();
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="/p/"], a[href*="/reel/"]');
    for (const a of links) {
      const href = a.href;
      if (!href || seen.has(href)) continue;
      seen.add(href);
      // Find the closest img inside this link
      const img = a.querySelector("img") as HTMLImageElement | null;
      const thumb = img?.src || "";
      results.push({ url: href, thumb });
    }
    return results;
  });

  const postUrls = postData.map((d) => d.url);
  const gridThumbs = postData.map((d) => d.thumb);

  if (postUrls.length === 0) {
    // Fallback — just grab thumbnails from profile page
    console.warn("  ⚠  Could not extract post URLs — falling back to thumbnail capture\n");
    const imgUrls = await extractInstagramImages(profilePage);
    let saved = 0;
    for (let i = 0; i < Math.min(imgUrls.length, MAX_POSTS); i++) {
      const dest = path.join(OUTPUT_DIR, `post-${i + 1}.jpg`);
      try { await downloadUrl(imgUrls[i], dest); saved++; console.log(`  ✓ post-${i + 1}.jpg`); }
      catch (e) { console.warn(`  ✗ post-${i + 1}: ${(e as Error).message}`); }
    }
    await browser.close();
    printOutput([], saved);
    return;
  }

  const total   = Math.min(postUrls.length - OFFSET, MAX_POSTS);
  console.log(`  Found ${postUrls.length} posts — capturing ${total} starting at offset ${OFFSET} (file numbering starts at post-${OFFSET + 1})\n`);

  // ── Step 2: scrape each post ──────────────────────────────────────────────
  const results: PostResult[] = [];
  const postPage = await ctx.newPage();

  for (let i = 0; i < total; i++) {
    const globalIdx = OFFSET + i;          // index into postUrls[]
    const fileIdx   = OFFSET + i;          // determines post-N.jpg filename (1-based in scrapePost)
    console.log(`\n  [${i + 1}/${total}] post-${fileIdx + 1}  ${postUrls[globalIdx]}`);
    const r = await scrapePost(postPage, postUrls[globalIdx], fileIdx, gridThumbs[globalIdx] ?? "");
    if (r) results.push(r);
  }

  await browser.close();

  // ── Output ────────────────────────────────────────────────────────────────
  console.log("\n\n─── Paste into lib/projects.ts ───────────────────────────────\n");
  console.log(`socialPosts: [`);
  for (const r of results) {
    let line = `  { src: "${r.thumb}", type: "${r.type}"`;
    if (r.videoSrc) line += `, videoSrc: "${r.videoSrc}"`;
    if (r.instagramUrl) line += `, instagramUrl: "${r.instagramUrl}"`;
    if (r.slides.length > 0) {
      const slidesStr = r.slides.map((s) => `"${s}"`).join(", ");
      line += `, slides: [${slidesStr}]`;
    }
    line += " },";
    console.log(line);
  }
  console.log(`],`);
}

function printOutput(_results: PostResult[], count: number) {
  console.log("\n\n─── Paste into lib/projects.ts ───────────────────────────────\n");
  console.log(`socialPosts: [`);
  for (let i = 1; i <= count; i++) {
    console.log(`  { src: "/projects/${slug}/social/post-${i}.jpg" },`);
  }
  console.log(`],`);
}

run().catch((err) => { console.error(err); process.exit(1); });
