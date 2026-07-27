import type { Metadata } from "next";
import SplitText from "@/components/ui/SplitText";
import Services from "@/components/home/Services";
import ContactCTA from "@/components/home/ContactCTA";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Services — Branding, Social Media, Video & Web Design | Beirut",
  description:
    "Social Pulse offers branding and identity design, social media management, video production, photography, and web design for brands in Lebanon and the GCC. Request a quote today.",
  keywords: [
    "branding agency beirut lebanon",
    "social media management beirut",
    "video production agency lebanon",
    "web design company beirut",
    "digital marketing agency GCC",
    "instagram management lebanon",
    "content creation beirut",
  ],
  openGraph: {
    title: "Services — Social Pulse Lebanon",
    description:
      "Branding, social media management, video production, web design, and photography services in Lebanon and the GCC.",
    url: "https://www.socialpulselb.com/services",
  },
  alternates: { canonical: "https://www.socialpulselb.com/services" },
};

const faqs = [
  {
    q: "What services does Social Pulse offer?",
    a: "Social Pulse offers branding and visual identity design, social media management, video production and motion graphics, web design and development, and photography services for brands in Lebanon and the GCC.",
  },
  {
    q: "Does Social Pulse work with businesses in Saudi Arabia and the UAE?",
    a: "Yes. While we are based in Beirut, Lebanon, Social Pulse serves clients across the GCC including Saudi Arabia, the UAE, Kuwait, and Qatar. All services can be delivered remotely or on-site.",
  },
  {
    q: "How much does social media management cost in Lebanon?",
    a: "Our social media management packages start from $1,200 per month for new brands, and scale based on content volume, platform count, and ad spend. Contact us for a custom quote.",
  },
  {
    q: "How long does a branding project take?",
    a: "A complete brand identity project (logo, guidelines, and collateral) typically takes 3–6 weeks depending on scope. We work in close collaboration with clients throughout the process.",
  },
  {
    q: "Do you offer healthcare social media marketing?",
    a: "Yes. We have specialized expertise in healthcare social media marketing with 12+ medical and aesthetic clinic clients in Beirut and Lebanon. We understand the regulatory and trust requirements of the medical sector.",
  },
  {
    q: "Can Social Pulse build my website?",
    a: "Yes. We design and develop fully custom websites using Next.js and modern web technologies. Each site is mobile-responsive, SEO-optimized, fast-loading, and built to convert visitors into clients.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.socialpulselb.com" },
          { name: "Services", url: "https://www.socialpulselb.com/services" },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-dark border-b border-dark-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-6">Services</p>
          <h1 className="font-display font-bold text-[clamp(2.5rem,8vw,8rem)] text-white leading-none break-words">
            <SplitText text="What we offer" />
          </h1>
          <p className="text-neutral-muted text-base md:text-xl max-w-xl mt-6 md:mt-8 leading-relaxed">
            End-to-end creative services that take your brand from idea to impact, in Beirut,
            across Lebanon, and throughout the GCC.
          </p>
        </div>
      </section>

      {/* Services accordion */}
      <Services />

      {/* FAQ section for AEO */}
      <section className="py-20 md:py-24 bg-dark-100 border-t border-dark-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <div className="mb-10 md:mb-12">
            <p className="text-xs uppercase tracking-widest text-brand-light mb-4">FAQ</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white">
              Common questions
            </h2>
          </div>
          <div className="max-w-3xl grid grid-cols-1 gap-0 divide-y divide-dark-300">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="font-medium text-white text-base md:text-lg mb-2">{faq.q}</h3>
                <p className="text-neutral-muted text-sm md:text-base leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
