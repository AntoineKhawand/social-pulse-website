import type { Metadata } from "next";
import ProjectGrid from "@/components/work/ProjectGrid";
import SplitText from "@/components/ui/SplitText";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Work — Portfolio of Social Pulse Lebanon",
  description:
    "Explore Social Pulse's portfolio: branding, social media, video production, and web design case studies for retail, medical, hospitality, and lifestyle brands across Lebanon and the GCC.",
  keywords: [
    "social media agency portfolio lebanon",
    "branding case studies beirut",
    "creative agency portfolio lebanon",
    "digital marketing results lebanon",
    "social pulse portfolio",
  ],
  openGraph: {
    title: "Portfolio — Social Pulse Lebanon",
    description:
      "Case studies from Social Pulse: branding, social media, video, and web design for brands in Lebanon and the GCC.",
    url: "https://www.socialpulselb.com/work",
  },
  alternates: { canonical: "https://www.socialpulselb.com/work" },
};

export default function WorkPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.socialpulselb.com" },
          { name: "Work", url: "https://www.socialpulselb.com/work" },
        ]}
      />

      {/* Page hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-20 bg-dark border-b border-dark-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-6">Portfolio</p>
          <h1 className="font-display font-bold text-[clamp(2.8rem,9vw,8rem)] text-white leading-none mb-6 md:mb-8">
            <SplitText text="Our Work" />
          </h1>
          <p className="text-neutral-muted text-base md:text-lg max-w-xl leading-relaxed">
            Projects that moved the needle for brands across Beirut, Lebanon, and the Gulf.
            From 0.8% to 4.2% engagement. From zero bookings to +140% in 60 days.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-20 bg-dark min-h-screen">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <ProjectGrid />
        </div>
      </section>
    </>
  );
}
