/**
 * Capture specific Instagram post URLs.
 *
 * Usage:
 *   npx tsx scripts/capture-instagram-urls.ts <slug> <url1> <url2> ...
 *
 * Example:
 *   npx tsx scripts/capture-instagram-urls.ts medonations \
 *     https://www.instagram.com/p/Abc123/ \
 *     https://www.instagram.com/reel/Xyz789/
 *
 * - Visits each URL in order, screenshots the main image.
 * - Detects type: post / reel / carousel.
 * - Captures all carousel slides.
 * - Saves to public/projects/<slug>/social/post-N.jpg
 * - Prints the socialPosts[] array ready to paste into lib/projects.ts.
 */

import { chromium, Page } from "playwright";
import path from "path";
import fs from "fs";
import https from "https";
import http from "http";

// ── Args ───────────────────────────────────────────────────────────────────────

const [, , slug, offsetOrUrl, ...restArgs] = process.argv;

if (!slug || !offsetOrUrl) {
  console.error("Usage: npx tsx scripts/capture-instagram-urls.ts <slug> [offset] <url1> <url2> ...");
  process.exit(1);
}

// Optional numeric offset (e.g. 6 → files start at post-7)
let OFFSET = 0;
let rawUrls: string[];
if (/^\d+$/.test(offsetOrUrl)) {
  OFFSET = parseInt(offsetOrUrl, 10);
  rawUrls = restArgs;
} else {
  rawUrls = [offsetOrUrl, ...restArgs];
}

// Clean URLs — strip query params, deduplicate, keep only /p/ and /reel/ paths
const urls = [...new Set(
  rawUrls
    .map((u) => {
      try {
        const parsed = new URL(u);
        return `https://www.instagram.com${parsed.pathname.replace(/\/?$/, "/")}`;
      } catch { return null; }
    })
    .filter((u): u is string => !!u && (u.includes("/p/") || u.includes("/reel/")))
)];

console.log(`\n📸  Capturing ${urls.length} unique posts  →  public/projects/${slug}/social/\n`);
urls.forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
console.log();

const OUT_DIR = path.join(process.cwd(), "public", "projects", slug, "social");
fs.mkdirSync(OUT_DIR, { recursive: true });

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
    try { await page.click(`text=${text}`, { timeout: 2_000 }); await page.waitForTimeout(400); break; }
    catch { /* not present */ }
  }
  for (const sel of ['[aria-label="Close"]', 'button:has-text("Not Now")', 'button:has-text("Not now")']) {
    try { await page.click(sel, { timeout: 2_000 }); await page.waitForTimeout(400); break; }
    catch { /* not present */ }
  }
}

async function extractMainImage(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("article img, main img"));
    const best = imgs
      .filter((img) =>
        img.src &&
        (img.src.includes("cdninstagram") || img.src.includes("fbcdn")) &&
        !img.src.includes("s150x150") &&
        !img.src.includes("s320x320") &&
        img.naturalWidth > 200
      )
      .sort((a, b) => b.naturalWidth - a.naturalWidth)[0];
    return best?.src ?? null;
  });
}

// ── Per-post capture ───────────────────────────────────────────────────────────

interface PostResult {
  src: string;
  type: "post" | "reel" | "carousel";
  instagramUrl: string;
  slides?: string[];
  videoSrc?: string;
}

async function capturePost(page: Page, url: string, idx: number): Promise<PostResult | null> {
  const baseName  = `post-${OFFSET + idx + 1}`;
  const thumbPath = path.join(OUT_DIR, `${baseName}.jpg`);
  const relThumb  = `/projects/${slug}/social/${baseName}.jpg`;

  try {
    await page.goto(url, { waitUntil: "load", timeout: 45_000 });
    await page.waitForTimeout(1_800);
    await dismissOverlays(page);

    // Wait for the post image
    await page
      .waitForSelector('article img[srcset], article img[src*="cdninstagram"], article img[src*="fbcdn"]', { timeout: 10_000 })
      .catch(() => {});

    // ── Reel detection ─────────────────────────────────────────────────────
    const isReel = url.includes("/reel/") || await page.evaluate(() => !!document.querySelector("video"));

    if (isReel) {
      // Use thumbnail image for cover
      const imgSrc = await extractMainImage(page);
      if (imgSrc) {
        await downloadUrl(imgSrc, thumbPath).catch(() => {});
        console.log(`  ✓ reel cover   ${baseName}.jpg`);
      }
      // Try to grab video src
      const videoSrc = await page.evaluate(() => {
        const v = document.querySelector<HTMLVideoElement>("video");
        return v?.src || v?.currentSrc || null;
      });
      if (videoSrc?.startsWith("http")) {
        const videoPath = path.join(OUT_DIR, `${baseName}.mp4`);
        await downloadUrl(videoSrc, videoPath).catch(() => {});
        console.log(`  ✓ reel video   ${baseName}.mp4`);
        return { src: relThumb, type: "reel", instagramUrl: url, videoSrc: `/projects/${slug}/social/${baseName}.mp4` };
      }
      return { src: relThumb, type: "reel", instagramUrl: url };
    }

    // ── Carousel detection ─────────────────────────────────────────────────
    const hasNext = await page.locator('[aria-label="Next"]').first().isVisible().catch(() => false);

    if (hasNext) {
      const slideFiles: string[] = [];
      let slideIdx  = 0;
      let prevImgUrl = "";
      const maxSlides = 12;

      while (slideIdx < maxSlides) {
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

        const imgSrc = await extractMainImage(page);

        if (imgSrc && imgSrc !== prevImgUrl) {
          if (slideIdx === 0) {
            // First slide = cover thumbnail
            await downloadUrl(imgSrc, thumbPath).catch(() => {});
            console.log(`  ✓ cover        ${baseName}.jpg`);
          } else {
            const slideName = `${baseName}-slide-${slideIdx + 1}.jpg`;
            const slidePath = path.join(OUT_DIR, slideName);
            await downloadUrl(imgSrc, slidePath).catch(() => {});
            slideFiles.push(`/projects/${slug}/social/${slideName}`);
            console.log(`  ✓ slide        ${slideName}`);
          }
          prevImgUrl = imgSrc;
        }

        const nextBtn = page.locator('[aria-label="Next"]').first();
        if (!(await nextBtn.isVisible().catch(() => false))) break;
        await nextBtn.click();
        slideIdx++;
        await page.waitForTimeout(600);
      }

      return { src: relThumb, type: "carousel", instagramUrl: url, slides: slideFiles };
    }

    // ── Regular post ───────────────────────────────────────────────────────
    const imgSrc = await extractMainImage(page);
    if (imgSrc) {
      await downloadUrl(imgSrc, thumbPath).catch(() => {});
      console.log(`  ✓ post         ${baseName}.jpg`);
      return { src: relThumb, type: "post", instagramUrl: url };
    }

    // Last resort: screenshot the article element
    const article = page.locator("article").first();
    if (await article.isVisible({ timeout: 3_000 })) {
      await article.screenshot({ path: thumbPath, type: "jpeg", quality: 90 });
      console.log(`  ✓ screenshot   ${baseName}.jpg`);
      return { src: relThumb, type: "post", instagramUrl: url };
    }

    console.warn(`  ✗ no image found for ${url}`);
    return null;
  } catch (err) {
    console.warn(`  ✗ failed: ${(err as Error).message}`);
    return null;
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function run() {
  const browser = await chromium.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-blink-features=AutomationControlled"],
  });
  const ctx = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 900 },
    locale: "en-US",
    extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
  });
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  // Check for login wall on first load
  const checkPage = await ctx.newPage();
  await checkPage.goto("https://www.instagram.com/", { waitUntil: "load", timeout: 30_000 });
  await checkPage.waitForTimeout(1_500);

  const isLoginWall = await checkPage.locator('input[name="username"]').isVisible({ timeout: 3_000 }).catch(() => false);
  if (isLoginWall) {
    console.log(
      "\n  ⚠️  Instagram requires login.\n" +
      "      Log in manually in the browser window, then press Enter here...\n"
    );
    await new Promise<void>((resolve) => { process.stdin.once("data", () => resolve()); });
    await checkPage.waitForTimeout(1_500);
  }
  await checkPage.close();

  const postPage = await ctx.newPage();
  const results: PostResult[] = [];

  for (let i = 0; i < urls.length; i++) {
    console.log(`\n  [${i + 1}/${urls.length}]  ${urls[i]}`);
    const r = await capturePost(postPage, urls[i], i);
    if (r) results.push(r);
    await postPage.waitForTimeout(1_000);
  }

  await browser.close();

  // ── Print output ───────────────────────────────────────────────────────────
  console.log("\n\n─── Paste into lib/projects.ts ───────────────────────────────\n");
  console.log(`instagramHandle: "medonations",`);
  console.log(`socialPosts: [`);
  for (const r of results) {
    let line = `  { src: "${r.src}", type: "${r.type}", instagramUrl: "${r.instagramUrl}"`;
    if (r.videoSrc) line += `, videoSrc: "${r.videoSrc}"`;
    if (r.slides?.length) line += `, slides: [${r.slides.map((s) => `"${s}"`).join(", ")}]`;
    line += " },";
    console.log(line);
  }
  console.log(`],`);
  console.log(`\n✅  Done — ${results.length}/${urls.length} posts captured.\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
