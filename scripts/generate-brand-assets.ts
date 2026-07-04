/**
 * Placeholder brand asset generator
 *
 * Usage:
 *   npx tsx scripts/generate-brand-assets.ts
 *
 * Renders a simple brand-color wordmark/monogram with Playwright and
 * screenshots it at the exact sizes the site references but doesn't have:
 *   public/logo.png              512x512  — JsonLd Organization logo, manifest icons
 *   public/apple-touch-icon.png  180x180  — Apple home-screen icon
 *   public/favicon.png            64x64   — browser tab icon
 *   public/og-image.jpg         1200x630  — default OpenGraph/Twitter share image
 *
 * These are intentionally simple placeholders — swap them for real designed
 * assets whenever they're ready, using the same output paths.
 */

import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const OUT_DIR = path.join(process.cwd(), "public");

const DARK = "#080808";
const BRAND = "#7C3AED";
const BRAND_LIGHT = "#A78BFA";

function squareHtml(sizePx: number, monogramSize: number) {
  return `
    <html>
      <head><style>
        html, body { margin: 0; padding: 0; width: ${sizePx}px; height: ${sizePx}px; overflow: hidden; }
        body {
          background: radial-gradient(circle at 50% 40%, ${BRAND}55 0%, ${DARK} 70%);
          display: flex; align-items: center; justify-content: center;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        }
        .monogram {
          font-weight: 800;
          font-size: ${monogramSize}px;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #ffffff 0%, ${BRAND_LIGHT} 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      </style></head>
      <body><div class="monogram">SP</div></body>
    </html>
  `;
}

function ogImageHtml() {
  return `
    <html>
      <head><style>
        html, body { margin: 0; padding: 0; width: 1200px; height: 630px; overflow: hidden; }
        body {
          background:
            radial-gradient(circle at 15% 20%, ${BRAND}40 0%, transparent 45%),
            radial-gradient(circle at 85% 85%, ${BRAND}30 0%, transparent 50%),
            ${DARK};
          display: flex; flex-direction: column; align-items: flex-start; justify-content: center;
          padding: 0 90px;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        }
        .wordmark {
          font-weight: 800;
          font-size: 96px;
          letter-spacing: -0.02em;
          color: #ffffff;
          line-height: 1.05;
        }
        .accent { color: ${BRAND_LIGHT}; }
        .tagline {
          margin-top: 28px;
          font-size: 28px;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.01em;
        }
        .rule {
          margin-top: 40px;
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, ${BRAND}, transparent);
        }
      </style></head>
      <body>
        <div class="wordmark">Social <span class="accent">Pulse</span></div>
        <div class="tagline">The Heartbeat of Your Brand</div>
        <div class="rule"></div>
      </body>
    </html>
  `;
}

async function shoot(html: string, width: number, height: number, outPath: string, type: "png" | "jpeg") {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html);
  await page.waitForTimeout(200);
  await page.screenshot({ path: outPath, type, quality: type === "jpeg" ? 92 : undefined });
  await browser.close();
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("\n🎨  Generating placeholder brand assets\n");

  await shoot(squareHtml(512, 220), 512, 512, path.join(OUT_DIR, "logo.png"), "png");
  console.log("  ✓ public/logo.png (512x512)");

  await shoot(squareHtml(180, 68), 180, 180, path.join(OUT_DIR, "apple-touch-icon.png"), "png");
  console.log("  ✓ public/apple-touch-icon.png (180x180)");

  await shoot(squareHtml(64, 26), 64, 64, path.join(OUT_DIR, "favicon.png"), "png");
  console.log("  ✓ public/favicon.png (64x64)");

  await shoot(ogImageHtml(), 1200, 630, path.join(OUT_DIR, "og-image.jpg"), "jpeg");
  console.log("  ✓ public/og-image.jpg (1200x630)");

  console.log("\n✅  Done. These are placeholders — replace with real designed assets when ready.\n");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
