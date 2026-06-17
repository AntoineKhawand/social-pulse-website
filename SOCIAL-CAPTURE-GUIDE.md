# Social Media Content Capture Guide

How to capture posts, carousels, and reels from Instagram and wire them into the site.

---

## Overview of scripts

| Script | Purpose |
|---|---|
| `scripts/capture-instagram.ts` | Capture all posts from an Instagram profile |
| `scripts/capture-instagram-urls.ts` | Capture specific posts by URL (best for adding carousels to an existing client) |
| `scripts/capture-screenshots.ts` | Screenshot live websites for web design project pages |

---

## Capturing carousels for a new or existing client

### Option A — Full profile capture (new client)

```bash
npx tsx scripts/capture-instagram.ts <handle> <slug> [max-posts] [offset]
```

**Examples:**
```bash
# Capture first 12 posts from @medonations into public/projects/medonations/social/
npx tsx scripts/capture-instagram.ts medonations medonations 12

# Capture 6 more posts starting at offset 12 (files become post-13 to post-18)
npx tsx scripts/capture-instagram.ts medonations medonations 6 12
```

What it does:
1. Opens the Instagram profile, collects all visible post URLs
2. Visits each post — detects type: `post`, `reel`, or `carousel`
3. For **carousels**: clicks through every slide, saves cover as `post-N.jpg` and each slide as `post-N-slide-M.jpg`
4. For **reels**: saves thumbnail + tries to download the MP4
5. For **posts**: saves the full-quality image
6. Prints the complete `socialPosts: [...]` array ready to paste into `lib/projects.ts`

---

### Option B — Specific URLs only (adding slides to an existing client)

Use this when you already have the post URLs and want to capture or re-capture specific carousels.

```bash
npx tsx scripts/capture-instagram-urls.ts <slug> [offset] <url1> <url2> ...
```

**Examples:**
```bash
# Capture medonations carousels 8–11 (offset 7 → files start at post-8)
npx tsx scripts/capture-instagram-urls.ts medonations 7 \
  https://www.instagram.com/p/CcnypzrsrE0/ \
  https://www.instagram.com/p/Crn6Z4TsLgn/ \
  https://www.instagram.com/p/CsBr_qbsxfl/ \
  https://www.instagram.com/p/CsWVAJltHGV/

# Capture a single post at position 3 (offset 2 → file becomes post-3)
npx tsx scripts/capture-instagram-urls.ts dare-advisors 2 \
  https://www.instagram.com/p/SomUrl/
```

The `offset` is the number of posts that already exist for this client.
- If you already have `post-1.jpg` through `post-7.jpg`, pass offset `7` so new files start at `post-8.jpg`.

---

## Instagram login (required the first time)

Both capture scripts open a **visible** browser window (not headless). If Instagram shows a login wall:
1. The script will pause and print: `⚠️ Instagram is showing a login wall.`
2. Log in manually in the browser window that opened
3. Press **Enter** in the terminal to continue

---

## After running the script

1. The script prints a `socialPosts: [...]` array in the terminal.
2. Copy it and paste (or merge) into the matching project in `lib/projects.ts`.
3. Check that all referenced files exist under `public/projects/<slug>/social/`.

**Example output to paste:**
```ts
socialPosts: [
  { src: "/projects/medonations/social/post-8.jpg", type: "carousel", instagramUrl: "https://www.instagram.com/p/CcnypzrsrE0/", slides: ["/projects/medonations/social/post-8-slide-2.jpg", "/projects/medonations/social/post-8-slide-3.jpg"] },
],
```

---

## File naming convention

```
public/projects/<slug>/social/
  post-N.jpg              ← cover image (also carousel slide 1)
  post-N-slide-M.jpg      ← carousel slide M (M starts at 2)
  post-N.mp4              ← reel video (optional, for direct playback)
```

In `lib/projects.ts`, the `slides` array starts from slide-2 onward — the cover (`post-N.jpg`) is always slide 1 and is set in `src`.

---

## Medonations — pending captures

Posts 8–11 still need their carousel slides captured. Run:

```bash
npx tsx scripts/capture-instagram-urls.ts medonations 7 \
  https://www.instagram.com/p/CcnypzrsrE0/ \
  https://www.instagram.com/p/Crn6Z4TsLgn/ \
  https://www.instagram.com/p/CsBr_qbsxfl/ \
  https://www.instagram.com/p/CsWVAJltHGV/
```

Then update the four entries in `lib/projects.ts` under the `medonations` project with the printed `slides: [...]` arrays.

---

## Website screenshots

To capture or re-capture website screenshots for web design projects:

```bash
# All web design projects
npx tsx scripts/capture-screenshots.ts

# One specific project
npx tsx scripts/capture-screenshots.ts nicholas-tawil
```

Output goes to `public/projects/<slug>/<page>-desktop.jpg` and `-mobile.jpg`.
Paste the printed `screenshots: [...]` array into `lib/projects.ts`.

To add a new website to the capture list, add an entry to the `PROJECTS` array in `scripts/capture-screenshots.ts`.

---

## Adding a completely new client

1. Add the project to `lib/projects.ts` (copy an existing entry as a template).
2. Run the Instagram capture if they have social posts:
   ```bash
   npx tsx scripts/capture-instagram.ts <handle> <slug> 12
   ```
3. Run the website screenshot capture if they have a website:
   ```bash
   npx tsx scripts/capture-screenshots.ts <slug>
   ```
   (First add the entry to `scripts/capture-screenshots.ts`.)
4. Paste the printed arrays into `lib/projects.ts`.
5. Add the cover SVG to `public/covers/`.
