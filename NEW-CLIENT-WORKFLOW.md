# New Client Workflow

Step-by-step checklist for adding a new client/case study to the site. Follow this in order — it covers everything used so far across every project type (web design, social media, branding, presentations).

For script-level details (flags, examples, troubleshooting login walls), see `SOCIAL-CAPTURE-GUIDE.md`. This file is the higher-level checklist that ties everything together.

---

## 0. Gather info first

Before touching code, collect:
- Client name, category (`Branding` | `Social Media` | `Video` | `Web Design` | `Photography`)
- Website URL (if any)
- Instagram handle (if any)
- Short description + longer description (2–4 sentences)
- An accent color (hex) that fits their brand
- Year and location

---

## 1. Add the project entry to `lib/projects.ts`

Copy the closest existing entry as a template (a full featured one like `dare-advisors`, or a minimal `comingSoon: true` stub if content isn't ready yet — see bottom of the file for examples like `objeti`, `skybond-travel`).

Required fields: `slug`, `title`, `client`, `category`, `year`, `location`, `description`, `longDescription`, `coverImage`, `images`, `tags`, `featured`, `accentColor`.

Optional fields, add only what applies:
- `websiteUrl` + `screenshots` — for Web Design projects (step 3)
- `instagramHandle` + `socialPosts` — for Social Media projects (step 4)
- `presentation` — for catalog/PDF deck projects (step 5)
- `techStack`, `features`, `overviewParagraphs`, `highlights`, `quote`, `testimonial`, `result` — richer case-study copy
- `comingSoon: true` — use when you're adding the client card now but content isn't captured yet

`slug` must be URL-safe (lowercase, hyphens) — it drives the route (`/work/<slug>`) and the output folder (`public/projects/<slug>/`).

---

## 2. Add the cover image

Drop an SVG into `public/covers/` and point `coverImage` at it, e.g. `/covers/<name>.svg`. The filename doesn't need to match the slug exactly (existing covers are inconsistently named — Title Case with spaces is fine, just make sure the path in `coverImage` matches the exact filename, spaces included).

If you don't have a cover yet, leave `coverImage: ""` and `comingSoon: true`.

---

## 3. Website screenshots (Web Design projects)

1. Add an entry to the `PROJECTS` array in `scripts/capture-screenshots.ts`:
   ```ts
   {
     slug: "client-slug",
     url: "https://clientwebsite.com",
     pages: [{ label: "Home", path: "/" }],
     // add more pages if the site has an About/Shop/etc worth showing
   },
   ```
2. Run it:
   ```bash
   npx tsx scripts/capture-screenshots.ts client-slug
   ```
   This waits **10 seconds** after each page loads (plus font/image-load checks and a lazy-load scroll pass) before taking the screenshot — this was increased from 2s/5s because faster timings were capturing pages mid-render (blank/white screenshots), especially on sites with animations or lazy-loaded hero sections. If a specific client's site is still capturing blank, that site probably needs even longer — bump the `waitForTimeout` calls in the script rather than re-running blindly.
3. Paste the printed `screenshots: [...]` array into the project's entry in `lib/projects.ts`.
4. **Open the generated JPGs in `public/projects/<slug>/` and actually look at them** before moving on — a blank/white screenshot is the #1 recurring failure. If a page is blank, re-run just that slug.

---

## 4. Instagram content (Social Media projects)

### New client with full post history
```bash
npx tsx scripts/capture-instagram.ts <handle> <slug> 12
```
Opens a **visible** browser (not headless). If Instagram shows a login wall, log in manually in the window and press Enter in the terminal to continue.

### Adding specific posts to an existing client
```bash
npx tsx scripts/capture-instagram-urls.ts <slug> <offset> <url1> <url2> ...
```
`offset` = number of posts already captured (so new files continue the numbering).

Either script prints a `socialPosts: [...]` array — paste it into the client's entry in `lib/projects.ts`. Naming convention: `post-N.jpg` is the cover/slide-1, `post-N-slide-M.jpg` is slide M (M starts at 2).

### Client logo (avatar) for the grid
Add `{ name, handle }` to the `CLIENTS` array in `scripts/capture-client-logos.ts`, then:
```bash
npx tsx scripts/capture-client-logos.ts
```
Saves to `public/clients/<handle>.jpg`.

---

## 5. PDF / catalog presentation (rare — only for deck-style projects like Gulf Central)

`scripts/capture-pdf-presentation.ts` is currently hardcoded to one client (`SLUG` and `PDF_URL` constants at the top). To reuse it for a new client:
1. Edit `SLUG` and `PDF_URL` in the script.
2. Run it: `npx tsx scripts/capture-pdf-presentation.ts` — opens a **visible** browser, log in to SharePoint/OneDrive if prompted, press Enter once the PDF is visible, then it auto-advances through every page.
3. Paste the printed `presentation: { pages: [...] }` block into the client's entry.

---

## 6. Verify locally before committing

```bash
npm run dev
```
Open `/work/<slug>` and check:
- Cover image shows on the `/work` grid
- All screenshots/social posts/presentation pages render (no broken images, no blank/white screenshots)
- Mobile screenshots look right (resize the browser or use dev tools device mode)

---

## 7. Commit

Stage `lib/projects.ts`, any script edits (new `PROJECTS`/`CLIENTS` entries), and the new files under `public/projects/<slug>/`, `public/covers/`, `public/clients/`.
