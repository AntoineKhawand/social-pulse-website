/**
 * Capture Instagram profile pictures for client logos
 *
 * Usage:
 *   npx tsx scripts/capture-client-logos.ts
 *
 * Output:
 *   public/clients/<handle>.jpg
 */

import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import https from "https";
import http from "http";

const OUTPUT_DIR = path.join(process.cwd(), "public", "clients");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const CLIENTS = [
  { name: "OBJETI",                              handle: "objeti_lb" },
  { name: "Mira Tueny",                          handle: "miratueny_hq" },
  { name: "SkyBond Travel",                      handle: "skybondtravel.lb" },
  { name: "Curaloop",                            handle: "curaloopglobal" },
  { name: "International Maritime Academy",      handle: "maritimeacademyleb" },
  { name: "Overseas Travel",                     handle: "overseas.lb" },
  { name: "Dr. Joseph Ghanimeh",                 handle: "jgyneco" },
  { name: "Céline",                              handle: "celine.artisans" },
  { name: "Dr. Rita Sammour",                    handle: "drritasammour" },
  { name: "International Masters in Orthodontics", handle: "imo.orthodontics" },
  { name: "Dr. Jean-Paul Abboud",               handle: "oculofacialarts" },
  { name: "Marijo Samneh",                       handle: "samnehmarijo" },
  { name: "Stellar Gems",                        handle: "stellargems.ae" },
];

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

async function dismissOverlays(page: import("playwright").Page) {
  for (const text of ["Accept All", "Allow all cookies", "Allow essential and optional cookies"]) {
    try { await page.click(`text=${text}`, { timeout: 2_500 }); await page.waitForTimeout(500); break; }
    catch {}
  }
  for (const sel of ['[aria-label="Close"]', 'button:has-text("Not Now")', 'button:has-text("Not now")']) {
    try { await page.click(sel, { timeout: 2_500 }); await page.waitForTimeout(500); break; }
    catch {}
  }
}

async function run() {
  console.log(`\n📸  Capturing ${CLIENTS.length} Instagram profile pictures\n`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
    viewport: { width: 1280, height: 900 },
    locale: "en-US",
  });

  const results: { name: string; handle: string; file: string | null }[] = [];

  for (const client of CLIENTS) {
    const page = await ctx.newPage();
    const profileUrl = `https://www.instagram.com/${client.handle}/`;
    console.log(`  [${client.handle}]  ${profileUrl}`);

    try {
      await page.goto(profileUrl, { waitUntil: "load", timeout: 60_000 });
      await dismissOverlays(page);
      await page.waitForTimeout(2_000);

      // Extract the profile picture URL — Instagram puts it in a <img> near the top
      const avatarUrl = await page.evaluate(() => {
        // Try the header/profile image — it's usually the first <img> with a circular crop
        const candidates = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
        for (const img of candidates) {
          const src = img.src || "";
          if (
            (src.includes("cdninstagram") || src.includes("fbcdn")) &&
            (src.includes("s150x150") || src.includes("s320x320") || img.naturalWidth <= 400)
          ) {
            return src;
          }
        }
        // Fallback: first CDN image
        for (const img of candidates) {
          const src = img.src || "";
          if (src.includes("cdninstagram") || src.includes("fbcdn")) return src;
        }
        return null;
      });

      if (avatarUrl) {
        const dest = path.join(OUTPUT_DIR, `${client.handle}.jpg`);
        try {
          await downloadUrl(avatarUrl, dest);
          console.log(`    ✓ saved  ${client.handle}.jpg`);
          results.push({ name: client.name, handle: client.handle, file: `/clients/${client.handle}.jpg` });
        } catch (e) {
          console.warn(`    ✗ download failed — ${(e as Error).message}`);
          results.push({ name: client.name, handle: client.handle, file: null });
        }
      } else {
        console.warn(`    ✗ no avatar found`);
        results.push({ name: client.name, handle: client.handle, file: null });
      }
    } catch (e) {
      console.warn(`    ✗ page failed — ${(e as Error).message}`);
      results.push({ name: client.name, handle: client.handle, file: null });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log("\n\n─── Results ───────────────────────────────────────────────\n");
  for (const r of results) {
    const status = r.file ? "✓" : "✗";
    console.log(`  ${status}  ${r.name} (@${r.handle})${r.file ? `  →  ${r.file}` : "  →  FAILED"}`);
  }

  const succeeded = results.filter((r) => r.file);
  console.log(`\n  ${succeeded.length}/${results.length} succeeded\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
