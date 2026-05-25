const { chromium } = require("playwright");

// Only the carousels — check max slide count by probing img_index
const carousels = [
  { id: "C6wTg1_sceJ", base: "https://www.instagram.com/p/C6wTg1_sceJ/" },
  { id: "C60y2viMrcS", base: "https://www.instagram.com/p/C60y2viMrcS/" },
  { id: "C6_0PT3MhHv", base: "https://www.instagram.com/p/C6_0PT3MhHv/" },
  { id: "C7GZC2UM4Ex", base: "https://www.instagram.com/p/C7GZC2UM4Ex/" },
  { id: "C7zPNQjMIeD", base: "https://www.instagram.com/p/C7zPNQjMIeD/" },
  { id: "C8CM1ZIssKp", base: "https://www.instagram.com/p/C8CM1ZIssKp/" },
  { id: "C8T8lT6M3aA", base: "https://www.instagram.com/p/C8T8lT6M3aA/" },
];

async function getOgImage(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForTimeout(2000);
  return page.$eval('meta[property="og:image"]', el => el.getAttribute("content")).catch(() => null);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  for (const carousel of carousels) {
    const page = await context.newPage();
    try {
      // Probe up to 10 slides — stop when the og:image repeats (same as slide 1 = no more slides)
      const firstImg = await getOgImage(page, `${carousel.base}?img_index=1`);
      let count = 1;

      for (let idx = 2; idx <= 10; idx++) {
        const img = await getOgImage(page, `${carousel.base}?img_index=${idx}`);
        if (!img || img === firstImg) break;
        count = idx;
      }

      console.log(`${carousel.id}: ${count} slides`);
    } catch (e) {
      console.log(`${carousel.id}: ERROR — ${e.message.slice(0, 60)}`);
    }
    await page.close();
  }

  await browser.close();
})();
