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
        await tab.goto(fullUrl, { waitUntil: "load", timeout: 60_000 });
        await tab.waitForTimeout(1500);
        const desktopPath = path.join(dir, `${name}-desktop.jpg`);
        await tab.screenshot({ path: desktopPath, type: "jpeg", quality: 90, fullPage: true });
        await ctx.close();
        console.log(`  ✓ desktop  ${page.label}`);

        // ── Mobile ────────────────────────────────────────────────────
        const mCtx = await browser.newContext({ viewport: MOBILE });
        const mTab = await mCtx.newPage();
        await mTab.goto(fullUrl, { waitUntil: "load", timeout: 60_000 });
        await mTab.waitForTimeout(1500);
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
