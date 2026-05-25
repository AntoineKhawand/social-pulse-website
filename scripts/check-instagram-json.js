const { chromium } = require("playwright");

const posts = [
  { id: 1,  url: "https://www.instagram.com/p/C6gnmHAMiYY/" },
  { id: 2,  url: "https://www.instagram.com/p/C6wTg1_sceJ/" },
  { id: 3,  url: "https://www.instagram.com/p/C60y2viMrcS/" },
  { id: 4,  url: "https://www.instagram.com/p/C6_0PT3MhHv/" },
  { id: 5,  url: "https://www.instagram.com/p/C7GZC2UM4Ex/" },
  { id: 6,  url: "https://www.instagram.com/p/C7R_E5Zs7Oe/" },
  { id: 7,  url: "https://www.instagram.com/p/C7zPNQjMIeD/" },
  { id: 8,  url: "https://www.instagram.com/p/C8CM1ZIssKp/" },
  { id: 9,  url: "https://www.instagram.com/p/C8T8lT6M3aA/" },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  for (const post of posts) {
    const page = await context.newPage();
    try {
      await page.goto(post.url, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForTimeout(3000);

      // Extract all script tag contents looking for edge_sidecar (carousel) or is_video
      const scripts = await page.$$eval("script", els =>
        els.map(el => el.textContent || "").filter(t => t.includes("edge_sidecar") || t.includes("is_video") || t.includes("__additionalData"))
      );

      let slideCount = 1;
      let isVideo = false;
      let isCarousel = false;

      for (const script of scripts) {
        // Look for edge_sidecar_to_children count
        const sidecarMatch = script.match(/"edge_sidecar_to_children".*?"count":(\d+)/);
        if (sidecarMatch) {
          slideCount = parseInt(sidecarMatch[1]);
          isCarousel = true;
        }
        if (script.includes('"is_video":true')) isVideo = true;
        if (script.includes('"__typename":"XDTGraphSidecar"') || script.includes('"product_type":"carousel_container"')) {
          isCarousel = true;
        }
      }

      // Also check og:description for slide count hints
      const desc = await page.$eval('meta[property="og:description"]', el => el.getAttribute("content")).catch(() => "");
      const title = await page.$eval('meta[property="og:title"]', el => el.getAttribute("content")).catch(() => "");

      let type = "post";
      if (isVideo) type = "reel";
      else if (isCarousel) type = "carousel";

      console.log(`Post ${post.id}: type=${type}, slides=${isCarousel ? slideCount : "-"}`);
      console.log(`  title: ${title.slice(0, 100)}`);
    } catch (e) {
      console.log(`Post ${post.id}: ERROR — ${e.message.slice(0, 80)}`);
    }
    await page.close();
  }

  await browser.close();
})();
