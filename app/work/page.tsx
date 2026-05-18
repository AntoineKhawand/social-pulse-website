import type { Metadata } from "next";
import ProjectGrid from "@/components/work/ProjectGrid";
import SplitText from "@/components/ui/SplitText";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Social Pulse's portfolio — branding, social media, video, and web design projects across Lebanon and the GCC.",
};

export default function WorkPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-20 bg-dark border-b border-dark-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-6">Portfolio</p>
          <h1 className="font-display font-bold text-[clamp(3rem,9vw,8rem)] text-white leading-none mb-8">
            <SplitText text="Our Work" />
          </h1>
          <p className="text-neutral-muted text-lg max-w-xl">
            Projects that moved the needle — for brands across Beirut, the Gulf, and beyond.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-dark min-h-screen">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <ProjectGrid />
        </div>
      </section>
    </>
  );
}
