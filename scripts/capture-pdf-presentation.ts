/**
 * PDF Presentation Capture — SharePoint / OneDrive viewer
 *
 * Usage:
 *   npx tsx scripts/capture-pdf-presentation.ts
 *
 * Opens the SharePoint PDF in a visible browser window.
 * Log in if prompted, wait for the PDF to load, then press ENTER.
 * The script will automatically flip through every page and save
 * each one to:
 *   public/projects/gulf-central-company/presentation/page-N.png
 *
 * After it finishes it prints the `presentation: { pages: [...] }` block
 * ready to paste into lib/projects.ts.
 */

import { chromium, Browser, Page } from "playwright";
import path from "path";
import fs from "fs";
import readline from "readline";

// ── Config ─────────────────────────────────────────────────────────────────────

const SLUG = "gulf-central-company";
const PDF_URL =
  "https://gulfcentral-my.sharepoint.com/personal/marketing_gulfcentral_com_sa/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fmarketing%5Fgulfcentral%5Fcom%5Fsa%2FDocuments%2FGulf%20Central%20%2D%20FoodBook%2FGulf%20Central%20Company%20%2D%20FoodBook%2Epdf&parent=%2Fpersonal%2Fmarketing%5Fgulfcentral%5Fcom%5Fsa%2FDocuments%2FGulf%20Central%20%2D%20FoodBook&ga=1";

// Viewport for the capture — landscape at high quality
const VIEWPORT = { width: 1600, height: 900 };

// ── Helpers ────────────────────────────────────────────────────────────────────

function outDir(): string {
  const dir = path.join(process.cwd(), "public", "projects", SLUG, "presentation");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function pause(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function waitForEnter(msg: string): Promise<void> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(msg, () => {
      rl.close();
      resolve();
    });
  });
}

// ── Page-count detection ───────────────────────────────────────────────────────

async function detectPageCount(page: Page): Promise<number> {
  // Strategy 1 – SharePoint / Office Online viewer: looks for "Page N of M" or "/M" pattern
  try {
    const text = await page.evaluate(() => document.body.innerText);
    const match = text.match(/(?:page\s+\d+\s+of\s+|\/\s*)(\d+)/i);
    if (match) return parseInt(match[1], 10);
  } catch {}

  // Strategy 2 – aria-label or title on navigation input
  try {
    const val = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll("input"));
      for (const inp of inputs) {
        const label = (inp.getAttribute("aria-label") || inp.getAttribute("title") || "").toLowerCase();
        if (label.includes("page") || label.includes("of")) {
          const max = inp.getAttribute("max") || inp.getAttribute("aria-valuemax");
          if (max) return parseInt(max, 10);
        }
      }
      return null;
    });
    if (val) return val;
  } catch {}

  // Strategy 3 – text node matching "X of Y"
  try {
    const count = await page.evaluate(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Text | null;
      while ((node = walker.nextNode() as Text | null)) {
        const m = node.textContent?.match(/\d+\s+of\s+(\d+)/i);
        if (m) return parseInt(m[1], 10);
      }
      return null;
    });
    if (count) return count;
  } catch {}

  return -1; // unknown
}

// ── Locate the PDF content area ────────────────────────────────────────────────

async function getPdfClip(page: Page): Promise<{ x: number; y: number; width: number; height: number } | null> {
  // Try to find the main viewer iframe first
  const frames = page.frames();
  for (const frame of frames) {
    try {
      const box = await frame.evaluate(() => {
        const el =
          document.querySelector(".canvasWrapper") ||
          document.querySelector(".page") ||
          document.querySelector("#viewer") ||
          document.querySelector(".pdfViewer");
        if (el) {
          const r = el.getBoundingClientRect();
          return { x: r.left, y: r.top, width: r.width, height: r.height };
        }
        return null;
      });
      if (box && box.width > 100) return box;
    } catch {}
  }
  return null; // fall back to full viewport
}

// ── Navigate to the next page ──────────────────────────────────────────────────

async function goNextPage(page: Page): Promise<boolean> {
  // Strategy A – click button with aria-label containing "next"
  try {
    const btn = page.locator('[aria-label*="next" i], [aria-label*="Next" i], [title*="next" i], [title*="Next" i]').first();
    if (await btn.count()) {
      const disabled = await btn.getAttribute("disabled");
      if (disabled === null) {
        await btn.click();
        return true;
      }
    }
  } catch {}

  // Strategy B – keyboard ArrowRight (works in browser-native PDF viewer)
  try {
    await page.keyboard.press("ArrowRight");
    return true;
  } catch {}

  return false;
}

// ── Type a page number into the page input ─────────────────────────────────────

async function jumpToPage(page: Page, n: number): Promise<void> {
  try {
    const inputs = page.locator("input[type=number], input[role=spinbutton]");
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const inp = inputs.nth(i);
      const label = (await inp.getAttribute("aria-label") ?? "").toLowerCase();
      if (label.includes("page") || label === "") {
        await inp.fill(String(n));
        await inp.press("Enter");
        await pause(1200);
        return;
      }
    }
  } catch {}
}

// ── Capture one page ───────────────────────────────────────────────────────────

async function capturePage(page: Page, outPath: string): Promise<void> {
  await pause(1000); // let rendering settle
  await page.screenshot({ path: outPath, type: "png", fullPage: false });
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function run() {
  const dir = outDir();

  console.log("\n🚀  Starting PDF presentation capture for Gulf Central Company\n");

  const browser: Browser = await chromium.launch({
    headless: false,
    channel: "chrome",
    args: ["--start-maximized"],
  });

  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();

  console.log("🌐  Opening SharePoint PDF viewer …");
  await page.goto(PDF_URL, { waitUntil: "domcontentloaded", timeout: 90_000 });

  console.log(
    "\n⚠️   A browser window has opened.\n" +
    "     • If you see a Microsoft login screen, sign in.\n" +
    "     • Wait until the PDF is fully visible.\n"
  );
  await waitForEnter("👉  Press ENTER when the PDF is loaded and you can see page 1 …\n");

  // Allow a moment after pressing ENTER for any lingering transitions
  await pause(1500);

  // Detect page count
  let totalPages = await detectPageCount(page);
  if (totalPages <= 0) {
    const answer = await new Promise<string>((resolve) => {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question("❓  Could not auto-detect page count. How many pages does the PDF have? ", (a) => {
        rl.close();
        resolve(a.trim());
      });
    });
    totalPages = parseInt(answer, 10) || 20;
  }

  console.log(`\n📄  Detected ${totalPages} pages. Starting capture …\n`);

  const captured: string[] = [];

  for (let i = 1; i <= totalPages; i++) {
    // Jump to page via input field (most reliable for large PDFs)
    await jumpToPage(page, i);
    await pause(1200);

    const outPath = path.join(dir, `page-${i}.png`);
    await capturePage(page, outPath);
    captured.push(`/projects/${SLUG}/presentation/page-${i}.png`);
    console.log(`  ✓ page ${String(i).padStart(3, " ")} / ${totalPages}  →  ${outPath}`);
  }

  await browser.close();

  // ── Print projects.ts snippet ──────────────────────────────────────────────
  console.log("\n\n─── Paste into lib/projects.ts (gulf-central-company entry) ───\n");
  console.log(`    presentation: {`);
  console.log(`      aspectRatio: "landscape",`);
  console.log(`      pages: [`);
  captured.forEach((p) => console.log(`        "${p}",`));
  console.log(`      ],`);
  console.log(`    },`);
  console.log("\n✅  Done!\n");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
