const { chromium } = require("playwright");

const urls = [
  "https://www.instagram.com/p/C6gnmHAMiYY/",
  "https://www.instagram.com/p/C6wTg1_sceJ/?img_index=1",
  "https://www.instagram.com/p/C60y2viMrcS/?img_index=1",
  "https://www.instagram.com/p/C6_0PT3MhHv/?img_index=1",
  "https://www.instagram.com/p/C7GZC2UM4Ex/?img_index=1",
  "https://www.instagram.com/p/C7R_E5Zs7Oe/",
  "https://www.instagram.com/p/C7zPNQjMIeD/?img_index=1",
  "https://www.instagram.com/p/C8CM1ZIssKp/?img_index=1",
  "https://www.instagram.com/p/C8T8lT6M3aA/?img_index=1",
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForTimeout(3000);

      // Check og:type and title for reel/video indicators
      const ogType   = await page.$eval('meta[property="og:type"]',   (el) => el.getAttribute("content")).catch(() => "");
      const ogTitle  = await page.$eval('meta[property="og:title"]',  (el) => el.getAttribute("content")).catch(() => "");
      const ogVideo  = await page.$eval('meta[property="og:video"]',  (el) => el.getAttribute("content")).catch(() => "");
      const twitterCard = await page.$eval('meta[name="twitter:card"]', (el) => el.getAttribute("content")).catch(() => "");

      // Count slide dots (carousel indicator)
      const dots = await page.$$('button[aria-label*="Go to slide"]').catch(() => []);
      const slideCount = dots.length;

      // Check for video element
      const hasVideo = (await page.$("video")) !== null;

      // Check page title / description
      const description = await page.$eval('meta[name="description"]', (el) => el.getAttribute("content")).catch(() => "");

      let type = "post";
      if (hasVideo || ogVideo || twitterCard === "player") type = "reel";
      else if (slideCount > 1 || url.includes("img_index")) type = "carousel";

      console.log(`Post ${i + 1}: ${url.split("/p/")[1].split("/")[0].split("?")[0]}`);
      console.log(`  type: ${type}`);
      if (type === "carousel") console.log(`  slide dots found: ${slideCount}`);
      if (type === "reel") console.log(`  has video: ${hasVideo}`);
      console.log(`  og:type=${ogType} | twitter:card=${twitterCard}`);
      console.log(`  title: ${ogTitle.slice(0, 80)}`);
      console.log();
    } catch (e) {
      console.log(`Post ${i + 1}: ERROR — ${e.message.slice(0, 80)}`);
    }
    await page.close();
  }

  await browser.close();
})();
