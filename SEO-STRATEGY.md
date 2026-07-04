# SEO / GEO / AEO Strategy

How search engines, local/geographic search, and AI answer engines (ChatGPT, Perplexity, Google AI Overviews) understand this site — and the rule every new page must follow.

---

## The rule for every new page

Every file under `app/**/page.tsx` must export **`metadata`** (static pages) or **`generateMetadata`** (dynamic `[slug]` routes) — never rely on inheriting the generic root layout metadata. At minimum:
- `title`, `description`
- `alternates: { canonical: "https://www.socialpulselb.com/<path>" }`
- `openGraph` (and `twitter` if the page has its own image, e.g. a project cover or blog cover)

And render the JSON-LD helper(s) from `components/seo/JsonLd.tsx` that match the page type (see table below). See `app/about/page.tsx`, `app/work/[slug]/page.tsx`, and `app/blog/[slug]/page.tsx` as reference implementations.

For a brand-new client case study specifically, follow `NEW-CLIENT-WORKFLOW.md` — it already produces everything `work/[slug]`'s `generateMetadata`/JSON-LD need (title, description, tags, cover image, testimonial).

---

## Structured data map

`components/seo/JsonLd.tsx` exports:

| Component | Schema type | Used on |
|---|---|---|
| `JsonLd` (default) | `Organization` + `LocalBusiness` + `ProfessionalService`, `WebSite` (with `speakable`) | Every page — rendered once, globally, in `app/layout.tsx` |
| `FaqJsonLd` | `FAQPage` | `app/services/page.tsx` |
| `BreadcrumbJsonLd` | `BreadcrumbList` | `about`, `work`, `work/[slug]`, `blog`, `blog/[slug]`, `contact` |
| `ArticleJsonLd` | `BlogPosting` | `app/blog/[slug]/page.tsx` — headline, author, datePublished, tags, all sourced from `lib/posts.ts` |
| `CreativeWorkJsonLd` | `CreativeWork` (+ nested `Review` when a `testimonial` exists) | `app/work/[slug]/page.tsx` — skipped for `comingSoon` stub projects |

The global Organization schema (`@id: https://www.socialpulselb.com/#organization`) is the anchor every other schema references via `publisher`/`creator`/`{"@id": ...}` — don't duplicate the full Organization block elsewhere, reference it.

---

## GEO (geographic SEO) signals

- `app/layout.tsx` `other` metadata: `geo.region`, `geo.placename`, `geo.position`, `ICBM` — Beirut coordinates.
- `JsonLd.tsx` Organization schema: `address` (PostalAddress), `geo` (GeoCoordinates), `areaServed` (Lebanon, Saudi Arabia, UAE, Kuwait, Qatar, US, France).
- Arabic keywords are included in the root `keywords` array for regional relevance, but there is **no actual Arabic page** on the site — the `hreflang="ar-LB"` alternate that used to point at a non-existent `/ar` route has been removed (it was a broken link, actively harmful for SEO). If bilingual content is ever wanted, that's a standalone i18n project (real `/ar` routes with real translated content), not a metadata tweak — don't re-add the hreflang without the page existing first.

## AEO (answer-engine optimization) signals

What actually helps an AI answer engine cite or summarize this site correctly:
1. **FAQPage schema** (`app/services/page.tsx`) — direct Q&A pairs are the highest-value AEO format.
2. **BlogPosting schema** (`ArticleJsonLd`) — headline/author/date give answer engines clean attribution.
3. **CreativeWork + Review schema** (`CreativeWorkJsonLd`) — surfaces client testimonials as structured trust signals.
4. **`speakable` on the WebSite schema** — currently scoped to `h1` selectors; expand `cssSelector` if a page has a canonical short-answer block worth surfacing (e.g. a definition or key stat).
5. Plain-language, well-structured page copy (clear H1/H2 hierarchy) matters more for AEO than any meta tag — the blog's `parseHeadings`/`## `/`### ` structure in `app/blog/[slug]/page.tsx` already supports this.

---

## Sitemap & robots

- `app/sitemap.ts` includes every static route plus dynamic `work/[slug]` and `blog/[slug]` routes, **excluding** projects with `comingSoon: true` (thin, image-less placeholder pages — kept live on the site for the client-card UI, but deliberately not sitemapped or indexed; see `robots: { index: false, follow: false }` in `work/[slug]`'s `generateMetadata`).
- `app/robots.ts` allows everything except `/api/` and `/_next/`, and declares the sitemap + host.
- `/privacy` is intentionally excluded from the sitemap and marked `noindex` in its own metadata.

---

## Known placeholders / follow-ups

- **Brand images are generated placeholders.** `public/logo.png`, `apple-touch-icon.png`, `favicon.png`, and `og-image.jpg` were produced by `scripts/generate-brand-assets.ts` (a simple brand-color wordmark) to fix what were previously broken image links in the Organization schema, manifest, and social share previews. Replace them with real designed assets whenever available — same output paths, no code changes needed.
- **Google Search Console is not verified.** `app/layout.tsx`'s `verification.google` is still the literal placeholder string `"your-google-search-console-token-here"` — it does nothing until replaced with a real token from Search Console. This can't be fabricated; get the real token and drop it in.
- **No real Arabic page exists.** See the GEO section above — don't add hreflang back without the actual translated route.
