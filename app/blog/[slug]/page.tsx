import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { blogPosts, getPostBySlug } from "@/lib/posts";
import ContactCTA from "@/components/home/ContactCTA";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareButtons from "@/components/blog/ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const canonical = `https://www.socialpulselb.com/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  return {
    title: `${post.title} | Social Pulse Insights`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `${post.title} | Social Pulse`,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      publishedTime,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Social Pulse`,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function parseHeadings(content: string) {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## ") || l.startsWith("### "))
    .map((l) => ({
      level: l.startsWith("### ") ? 3 : 2,
      text: l.replace(/^#{2,3} /, "").trim(),
      id: slugify(l.replace(/^#{2,3} /, "").trim()),
    }));
}

function inlineBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-bold text-white">{p}</strong>
      : p
  );
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const els: React.ReactNode[] = [];
  let listBuf: string[] = [];
  let numBuf: string[] = [];
  let firstPara = true;

  const flushLists = (k: string) => {
    if (listBuf.length) {
      els.push(
        <ul key={`ul${k}`} className="my-5 space-y-2.5 [column-span:all]">
          {listBuf.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-neutral-300 text-[15px] leading-[1.8]">
              <span className="mt-2.5 w-1 h-1 rounded-full bg-brand shrink-0" />
              <span>{inlineBold(item)}</span>
            </li>
          ))}
        </ul>
      );
      listBuf = [];
    }
    if (numBuf.length) {
      els.push(
        <ol key={`ol${k}`} className="my-5 space-y-3 [column-span:all]">
          {numBuf.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-neutral-300 text-[15px] leading-[1.8]">
              <span className="shrink-0 w-6 h-6 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center text-[10px] font-bold text-brand-light mt-0.5">
                {i + 1}
              </span>
              <span className="pt-0.5">{inlineBold(item.replace(/^\d+\.\s*/, ""))}</span>
            </li>
          ))}
        </ol>
      );
      numBuf = [];
    }
  };

  lines.forEach((line, i) => {
    const k = String(i);

    if (line.startsWith("## ")) {
      flushLists(k);
      const text = line.replace("## ", "").trim();
      els.push(
        <h2
          key={k}
          id={slugify(text)}
          className="[column-span:all] font-display font-bold text-xl md:text-2xl text-white mt-12 mb-4 pb-3 border-b border-dark-200 scroll-mt-24 uppercase tracking-wide"
        >
          {text}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushLists(k);
      const text = line.replace("### ", "").trim();
      els.push(
        <h3
          key={k}
          id={slugify(text)}
          className="font-display font-bold text-base md:text-lg text-white mt-8 mb-3 scroll-mt-24"
        >
          {text}
        </h3>
      );
      return;
    }

    if (/^\d+\.\s/.test(line)) { if (listBuf.length) flushLists(k); numBuf.push(line); return; }
    if (line.startsWith("- ")) { if (numBuf.length) flushLists(k); listBuf.push(line.replace(/^- /, "")); return; }

    if (line.startsWith("> ")) {
      flushLists(k);
      els.push(
        <blockquote
          key={k}
          className="[column-span:all] my-8 px-6 py-5 border-l-2 border-brand bg-brand/5 italic text-white/80 text-lg leading-relaxed"
        >
          {line.replace("> ", "")}
        </blockquote>
      );
      return;
    }

    if (line.trim() === "") { flushLists(k); return; }

    flushLists(k);
    const isFirst = firstPara;
    if (firstPara) firstPara = false;

    els.push(
      <p
        key={k}
        className={`text-neutral-300 leading-[1.9] mb-4 text-[15px] ${isFirst ? "[column-span:all] text-base md:text-lg text-neutral-200 font-light" : ""}`}
      >
        {isFirst && (
          <span className="float-left mr-2 font-display font-bold text-[4.2rem] leading-[0.85] text-white mt-1 select-none">
            {line[0]}
          </span>
        )}
        {isFirst ? inlineBold(line.slice(1)) : inlineBold(line)}
      </p>
    );
  });

  flushLists("end");
  return els;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const pageUrl = `https://www.socialpulselb.com/blog/${post.slug}`;
  const headings = parseHeadings(post.content);
  const others = blogPosts.filter((p) => p.slug !== slug);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.socialpulselb.com" },
          { name: "Insights", url: "https://www.socialpulselb.com/blog" },
          { name: post.title, url: pageUrl },
        ]}
      />
      <ArticleJsonLd
        url={pageUrl}
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        datePublished={new Date(post.date).toISOString()}
        author={post.author}
        tags={post.tags}
      />

      <ReadingProgress />

      <div className="bg-dark min-h-screen">

        {/* ── Newspaper Masthead ──────────────────────────────────────────── */}
        <div className="border-b border-dark-200 pt-24 pb-0">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
            <div className="flex items-center justify-between py-3 border-b border-dark-200 text-[10px] uppercase tracking-[0.25em] text-neutral-mid">
              <Link href="/blog" className="hover:text-white transition-colors">← Insights</Link>
              <span className="font-bold text-white/30 tracking-[0.4em]">SOCIAL PULSE</span>
              <span>{post.date} · {post.readTime}</span>
            </div>

            {/* Category rule */}
            <div className="flex items-center gap-4 py-4">
              <div className="h-px flex-1 bg-dark-300" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-light px-4">{post.category}</span>
              <div className="h-px flex-1 bg-dark-300" />
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-[clamp(2.2rem,6vw,5rem)] text-white leading-[1.0] tracking-tight uppercase mb-6 max-w-5xl break-words">
              {post.title}
            </h1>

            {/* Byline row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-5 border-b border-dark-300 text-xs text-neutral-mid uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-[8px] font-bold text-white">SP</span>
                {post.author}
              </span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <div className="ml-auto">
                <ShareButtons url={pageUrl} title={post.title} layout="bottom" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Cover image ─────────────────────────────────────────────────── */}
        <div className="relative w-full h-[40vh] md:h-[55vh] border-b border-dark-200 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
          {/* Left fade */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-dark to-transparent" />
          {/* Right fade */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-dark to-transparent" />
          {/* Bottom fade into article */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark to-transparent" />
          {/* Top fade from masthead */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-dark to-transparent" />
        </div>

        {/* ── Article body ────────────────────────────────────────────────── */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-10 md:py-14">
          <div className="flex gap-12 xl:gap-20 items-start">

            {/* Left: Article content */}
            <div className="flex-1 min-w-0">

              {/* Excerpt / standfirst */}
              <p className="text-white/70 text-base md:text-lg font-light leading-relaxed border-l-2 border-brand/50 pl-5 mb-8 italic">
                {post.excerpt}
              </p>

              {/* Inline ToC — newspaper "In this article" box */}
              {headings.length >= 3 && (
                <div className="mb-10 p-5 border border-dark-300 bg-dark-100/40">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-light mb-3">In this article</p>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                    {headings.filter((h) => h.level === 2).map((h, i) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className="flex items-start gap-2 text-xs text-neutral-muted hover:text-white transition-colors py-0.5"
                      >
                        <span className="text-brand-light/50 font-mono shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        {h.text}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Article body */}
              <div className="max-w-3xl">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-dark-200">
                <span className="text-[10px] uppercase tracking-widest text-neutral-mid font-bold mr-2">Tags</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-[11px] border border-dark-300 text-neutral-muted hover:text-brand-light hover:border-brand/40 transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Share strip */}
              <div className="mt-8 pt-8 border-t border-dark-200">
                <ShareButtons url={pageUrl} title={post.title} layout="bottom" />
              </div>

              {/* Author card */}
              <div className="mt-10 p-6 border border-dark-300 bg-dark-100/30 flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-xs font-bold text-white shrink-0">SP</div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-mid mb-1">Written by</p>
                  <p className="text-white font-bold text-sm mb-2">{post.author}</p>
                  <p className="text-neutral-muted text-xs leading-relaxed">{post.authorBio}</p>
                  <div className="flex gap-4 mt-3">
                    <a href="https://www.instagram.com/socialpulse.lb/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-brand-light hover:text-white transition-colors">@socialpulse.lb ↗</a>
                    <Link href="/work" className="text-[11px] text-neutral-muted hover:text-white transition-colors">Our work →</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: sidebar with other articles */}
            <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
              <div className="border-t-2 border-white pt-4">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white mb-4">More Insights</p>
                <div className="flex flex-col divide-y divide-dark-200">
                  {others.slice(0, 8).map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group flex items-start gap-3 py-3"
                    >
                      <div
                        className="w-12 h-12 shrink-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${p.coverImage})` }}
                      />
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase tracking-widest text-brand-light/60">{p.category}</span>
                        <p className="text-[11px] text-white/70 group-hover:text-white transition-colors leading-snug line-clamp-3 font-medium mt-0.5">
                          {p.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/blog" className="mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-brand-light hover:text-white transition-colors font-bold">
                  View all →
                </Link>
              </div>
            </aside>

          </div>
        </div>

        {/* ── Mobile-only: other articles (sidebar handles desktop) ────────── */}
        <section className="lg:hidden border-t border-dark-200 py-10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-white">More Insights</p>
              <Link href="/blog" className="text-[10px] uppercase tracking-widest text-neutral-mid hover:text-white transition-colors">All →</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {others.slice(0, 6).map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex items-start gap-3 py-3 border-b border-dark-200 last:border-0">
                  <div className="w-14 h-14 shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${p.coverImage})` }} />
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase tracking-widest text-brand-light/60">{p.category}</span>
                    <p className="text-xs font-bold text-white/75 group-hover:text-white transition-colors leading-snug line-clamp-2 mt-0.5">{p.title}</p>
                    <p className="text-[10px] text-neutral-mid mt-1">{p.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Prev / Next navigation ───────────────────────────────────────── */}
        <section className="border-t border-dark-200 py-10 md:py-14">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Previous */}
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-dark-300 hover:border-brand/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                >
                  {/* Background cover image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-105 group-hover:scale-110"
                    style={{ backgroundImage: `url(${prevPost.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/80 to-transparent" />

                  <div className="relative z-10 p-6 md:p-7 flex flex-col h-full min-h-[160px]">
                    {/* Direction label */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex text-brand-light group-hover:text-white transition-colors">
                        <ChevronLeft set="bold" size={16} primaryColor="currentColor" />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-light group-hover:text-white transition-colors font-semibold">Previous</span>
                    </div>

                    {/* Category */}
                    <span className="text-[9px] uppercase tracking-widest text-neutral-mid mb-2">{prevPost.category}</span>

                    {/* Title */}
                    <p className="font-display font-bold text-sm md:text-base text-white/80 group-hover:text-white transition-colors leading-snug line-clamp-2 flex-1">
                      {prevPost.title}
                    </p>

                    {/* Read time */}
                    <p className="text-[10px] text-neutral-mid mt-4">{prevPost.readTime}</p>
                  </div>
                </Link>
              ) : <div className="hidden sm:block" />}

              {/* Next */}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-dark-300 hover:border-brand/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                >
                  {/* Background cover image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-105 group-hover:scale-110"
                    style={{ backgroundImage: `url(${nextPost.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-bl from-dark via-dark/80 to-transparent" />

                  <div className="relative z-10 p-6 md:p-7 flex flex-col h-full min-h-[160px] items-end text-right">
                    {/* Direction label */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-light group-hover:text-white transition-colors font-semibold">Next</span>
                      <span className="inline-flex text-brand-light group-hover:text-white transition-colors">
                        <ChevronRight set="bold" size={16} primaryColor="currentColor" />
                      </span>
                    </div>

                    {/* Category */}
                    <span className="text-[9px] uppercase tracking-widest text-neutral-mid mb-2">{nextPost.category}</span>

                    {/* Title */}
                    <p className="font-display font-bold text-sm md:text-base text-white/80 group-hover:text-white transition-colors leading-snug line-clamp-2 flex-1">
                      {nextPost.title}
                    </p>

                    {/* Read time */}
                    <p className="text-[10px] text-neutral-mid mt-4">{nextPost.readTime}</p>
                  </div>
                </Link>
              ) : <div className="hidden sm:block" />}

            </div>
          </div>
        </section>


      </div>

      <ContactCTA />
    </>
  );
}
