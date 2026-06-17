/**
 * Playwright screenshot capture script
 *
 * Usage:
 *   npx tsx scripts/capture-screenshots.ts              — capture all web design projects
 *   npx tsx scripts/capture-screenshots.ts nicholas-tawil  — capture one specific slug
 *
 * Output: public/projects/[slug]/[page]-desktop.jpg
 *                              /[page]-mobile.jpg
 *
 * After running, paste the generated `screenshots` arrays into lib/projects.ts.
 */

import { chromium } from "playwright";
import path from "path";
import fs from "fs";

// ── Configuration ──────────────────────────────────────────────────────────────

const DESKTOP = { width: 1440, height: 900 };
const MOBILE  = { width: 390,  height: 844 };

/** Add or extend entries here. Each `pages` item is a sub-page to capture. */
const PROJECTS: Array<{
  slug: string;
  url: string;
  pages: Array<{ label: string; path: string }>;
}> = [
  {
    slug: "dare-advisors",
    url: "https://www.dareadvisors.com",
    pages: [{ label: "Home", path: "/" }],
  },
  {
    slug: "the-breast-clinic",
    url: "https://drcheblazar.com",
    pages: [{ label: "Home", path: "/" }],
  },
  {
    slug: "metle-metlik",
    url: "https://metlemetlik.com",
    pages: [
      { label: "Home",    path: "/" },
      { label: "Experts", path: "/experts" },
    ],
  },
  {
    slug: "nicholas-tawil",
    url: "https://nicholastawil.com",
    pages: [
      { label: "Home",  path: "/" },
      { label: "About", path: "/global-strategist-profile/" },
    ],
  },
  {
    slug: "tiffany-saade",
    url: "https://tiffanysaade.com",
    pages: [{ label: "Home", path: "/" }],
  },
  {
    slug: "the-drop-lane",
    url: "https://thedroplane.com",
    pages: [
      { label: "Home", path: "/" },
      { label: "Shop", path: "/shop" },
    ],
  },
  {
    slug: "heg-construction",
    url: "https://hegconstruction.com",
    pages: [{ label: "Home", path: "/" }],
  },
  {
    slug: "dr-amany-sabbagh",
    url: "https://dramanysabbagh.com",
    pages: [{ label: "Home", path: "/" }],
  },
  {
    slug: "it-signal",
    url: "https://itsignal.org",
    pages: [{ label: "Home", path: "/" }],
  },
  {
    slug: "forearms-security",
    url: "https://forearmssecurity.com",
    pages: [{ label: "Home", path: "/" }],
  },
  {
    slug: "imtihan",
    url: "https://imtihan.live",
    pages: [{ label: "Home", path: "/" }],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function outputDir(slug: string) {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function safeName(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function run() {
  const targetSlug = process.argv[2] ?? null;
  const targets = targetSlug
    ? PROJECTS.filter((p) => p.slug === targetSlug)
    : PROJECTS;

  if (!targets.length) {
    console.error(`No project found for slug "${targetSlug}"`);
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const results: Record<string, string[]> = {};

  for (const project of targets) {
    console.log(`\n📸  ${project.slug}  (${project.url})`);
    const dir = outputDir(project.slug);
    const pageEntries: string[] = [];

    for (const page of project.pages) {
      const name  = safeName(page.label);
      const fullUrl = `${project.url.replace(/\/$/, "")}${page.path}`;

        // ── Desktop ────────────────────────────────────────────────────
      try {
        const ctx = await browser.newContext({ viewport: DESKTOP });
        const tab = await ctx.newPage();
        await tab.goto(fullUrl, { waitUntil: "networkidle", timeout: 90_000 });
        // Ensure the page is fully rendered before scrolling
        await tab.evaluate(async () => {
          // Wait for fonts to load
          await document.fonts.ready;
          // Wait for all images to load
          await Promise.allSettled(
            Array.from(document.images)
              .filter((img) => !img.complete)
              .map((img) => new Promise((r) => { img.onload = r; img.onerror = r; }))
          );
        });
        await tab.waitForTimeout(2000);
        // Scroll through the page to trigger lazy-loaded images/sections
        await tab.evaluate(async () => {
          const totalHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          );
          const step = Math.ceil(window.innerHeight * 0.8);
          for (let y = 0; y < totalHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 200));
          }
          // Scroll back to top and wait for everything to settle
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 1500));
          // Re-check fonts and images after lazy loads
          await document.fonts.ready;
          await Promise.allSettled(
            Array.from(document.images)
              .filter((img) => !img.complete)
              .map((img) => new Promise((r) => { img.onload = r; img.onerror = r; }))
          );
          await new Promise((r) => setTimeout(r, 500));
        });
        const desktopPath = path.join(dir, `${name}-desktop.jpg`);
        await tab.screenshot({ path: desktopPath, type: "jpeg", quality: 90, fullPage: true });
        await ctx.close();
        console.log(`  ✓ desktop  ${page.label}`);

        // ── Mobile ────────────────────────────────────────────────────
        const mCtx = await browser.newContext({ viewport: MOBILE });
        const mTab = await mCtx.newPage();
        await mTab.goto(fullUrl, { waitUntil: "networkidle", timeout: 90_000 });
        // Ensure full render before scrolling
        await mTab.evaluate(async () => {
          await document.fonts.ready;
          await Promise.allSettled(
            Array.from(document.images)
              .filter((img) => !img.complete)
              .map((img) => new Promise((r) => { img.onload = r; img.onerror = r; }))
          );
        });
        await mTab.waitForTimeout(2000);
        // Scroll to trigger lazy loading before the viewport screenshot
        await mTab.evaluate(async () => {
          const totalHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          );
          const step = Math.ceil(window.innerHeight * 0.8);
          for (let y = 0; y < totalHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 200));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 1500));
          await document.fonts.ready;
          await Promise.allSettled(
            Array.from(document.images)
              .filter((img) => !img.complete)
              .map((img) => new Promise((r) => { img.onload = r; img.onerror = r; }))
          );
          await new Promise((r) => setTimeout(r, 500));
        });
        const mobilePath = path.join(dir, `${name}-mobile.jpg`);
        await mTab.screenshot({ path: mobilePath, type: "jpeg", quality: 90 });
        await mCtx.close();
        console.log(`  ✓ mobile   ${page.label}`);

        pageEntries.push(
          `    { label: "${page.label}", desktop: "/projects/${project.slug}/${name}-desktop.jpg", mobile: "/projects/${project.slug}/${name}-mobile.jpg" },`
        );
      } catch (err) {
        console.warn(`  ✗ failed   ${page.label}  —  ${(err as Error).message}`);
      }
    }

    results[project.slug] = pageEntries;
  }

  await browser.close();

  // ── Print the screenshots arrays to paste into projects.ts ─────────────────
  console.log("\n\n─── Paste into lib/projects.ts ───────────────────────────────\n");
  for (const [slug, entries] of Object.entries(results)) {
    if (!entries.length) continue;
    console.log(`// ${slug}`);
    console.log(`screenshots: [`);
    entries.forEach((e) => console.log(e));
    console.log(`],\n`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
