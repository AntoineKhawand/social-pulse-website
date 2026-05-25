const { chromium } = require("playwright");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const reels = [
  { id: 10, url: "https://www.instagram.com/p/C8obqOCu0F-/" },
  { id: 11, url: "https://www.instagram.com/p/C9z7AonMP-H/" },
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
    request.on("error", (err) => { try { fs.unlinkSync(dest); } catch (_) {} reject(err); });
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  for (const reel of reels) {
    const page = await context.newPage();
    const destJpg = path.join(outDir, `post-${reel.id}.jpg`);

    try {
      await page.goto(reel.url, { waitUntil: "domcontentloaded", timeout: 25000 });
      await page.waitForTimeout(3000);

      const ogImage = await page.$eval(
        'meta[property="og:image"]',
        (el) => el.getAttribute("content")
      ).catch(() => null);

      if (ogImage && ogImage.startsWith("http")) {
        await downloadFile(ogImage, destJpg);
        const stat = fs.statSync(destJpg);
        console.log(`Reel ${reel.id}: saved (${Math.round(stat.size / 1024)} KB)`);
      } else {
        console.log(`Reel ${reel.id}: no og:image found`);
      }
    } catch (e) {
      console.log(`Reel ${reel.id}: ERROR — ${e.message.slice(0, 100)}`);
    }

    await page.close();
  }

  await browser.close();
})();
