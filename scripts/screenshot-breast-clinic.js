const { chromium } = require("playwright");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const posts = [
  { id: 1, url: "https://www.instagram.com/p/C6gnmHAMiYY/" },
  { id: 2, url: "https://www.instagram.com/p/C6wTg1_sceJ/" },
  { id: 3, url: "https://www.instagram.com/p/C60y2viMrcS/" },
  { id: 4, url: "https://www.instagram.com/p/C6_0PT3MhHv/" },
  { id: 5, url: "https://www.instagram.com/p/C7GZC2UM4Ex/" },
  { id: 6, url: "https://www.instagram.com/p/C7R_E5Zs7Oe/" },
  { id: 7, url: "https://www.instagram.com/p/C7zPNQjMIeD/" },
  { id: 8, url: "https://www.instagram.com/p/C8CM1ZIssKp/" },
  { id: 9, url: "https://www.instagram.com/p/C8T8lT6M3aA/" },
];

const outDir = path.join(__dirname, "../public/projects/the-breast-clinic/social");

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    const request = proto.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    });
    request.on("error", (err) => { fs.unlinkSync(dest); reject(err); });
  });
}

(async () => {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  for (const post of posts) {
    const page = await context.newPage();
    const destJpg = path.join(outDir, `post-${post.id}.jpg`);

    // Skip if already downloaded
    if (fs.existsSync(destJpg)) {
      console.log(`Post ${post.id}: already exists, skipping`);
      await page.close();
      continue;
    }

    try {
      await page.goto(post.url, { waitUntil: "domcontentloaded", timeout: 25000 });
      await page.waitForTimeout(3000);

      // Try og:image first
      const ogImage = await page.$eval(
        'meta[property="og:image"]',
        (el) => el.getAttribute("content")
      ).catch(() => null);

      if (ogImage && ogImage.startsWith("http")) {
        console.log(`Post ${post.id}: downloading og:image...`);
        await downloadFile(ogImage, destJpg);
        const stat = fs.statSync(destJpg);
        console.log(`Post ${post.id}: saved (${Math.round(stat.size / 1024)} KB)`);
      } else {
        // Fallback: screenshot the page at 600×600 viewport
        console.log(`Post ${post.id}: no og:image, taking page screenshot...`);
        await page.setViewportSize({ width: 600, height: 750 });
        await page.screenshot({ path: destJpg, type: "jpeg", quality: 85 });
        console.log(`Post ${post.id}: screenshot saved`);
      }
    } catch (e) {
      console.log(`Post ${post.id}: ERROR — ${e.message.slice(0, 100)}`);
    }

    await page.close();
  }

  await browser.close();
  console.log("\nDone. Files in:", outDir);
})();
