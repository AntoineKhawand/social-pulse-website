import type { Metadata } from "next";
import { blogPosts } from "@/lib/posts";
import SplitText from "@/components/ui/SplitText";
import BlogCard from "@/components/blog/BlogCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Insights — Branding, Social Media & Creative Strategy | Social Pulse",
  description:
    "Expert insights on branding, social media management, video marketing, web design, and creative strategy from Social Pulse, the Beirut-based creative agency serving Lebanon and the GCC.",
  keywords: [
    "creative agency blog lebanon",
    "branding tips beirut",
    "social media strategy lebanon",
    "video marketing GCC",
    "web design insights",
    "digital marketing blog",
  ],
  openGraph: {
    title: "Insights — Social Pulse Lebanon",
    description:
      "Expert articles on branding, social media, video, and web design from Beirut's leading creative agency.",
    url: "https://www.socialpulselb.com/blog",
  },
  alternates: { canonical: "https://www.socialpulselb.com/blog" },
};

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.socialpulselb.com" },
          { name: "Insights", url: "https://www.socialpulselb.com/blog" },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-20 md:pb-32 bg-dark relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full max-w-[1440px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/5 via-dark to-dark opacity-50 z-0 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-brand-light/50" />
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-brand-light font-medium">Insights & News</p>
          </div>
          <h1 className="font-display font-bold text-[clamp(3rem,8vw,8.5rem)] text-white leading-[0.95] mb-8 md:mb-10 tracking-tight">
            <SplitText text="Stories & Strategy" />
          </h1>
          <p className="text-neutral-400 text-lg md:text-2xl max-w-2xl leading-relaxed font-light">
            Expert perspectives on branding, social media, video production, and web design —
            built for brands in Lebanon and the GCC.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="py-20 md:py-28 bg-dark relative z-10 border-t border-dark-200">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
            <div className="flex items-center justify-between mb-10 md:mb-12">
              <h2 className="text-xl md:text-2xl font-display font-bold text-white">Featured</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-light border border-brand/20 px-3 py-1 rounded-full bg-brand/5">
                Must read
              </p>
            </div>
            <BlogCard post={featured} featured />
          </div>
        </section>
      )}

      {/* All posts */}
      <section className="py-20 md:py-32 bg-dark-100 min-h-screen relative z-10 border-t border-dark-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <div className="flex items-center gap-4 mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Latest Articles</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-dark-300 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rest.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
