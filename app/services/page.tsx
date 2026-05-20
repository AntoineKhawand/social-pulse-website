import type { Metadata } from "next";
import SplitText from "@/components/ui/SplitText";
import Services from "@/components/home/Services";
import ContactCTA from "@/components/home/ContactCTA";
import RevealBlock from "@/components/ui/RevealBlock";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import ProjectEstimator from "@/components/services/ProjectEstimator";

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

const packages = [
  {
    name: "Launch",
    price: "from $1,200/mo",
    desc: "Perfect for new brands or businesses starting or refreshing their digital presence.",
    features: [
      "Brand identity (logo + basic guidelines)",
      "Social media setup on 2 platforms",
      "12 content pieces per month",
      "Basic reel production (2/month)",
      "Monthly performance report",
    ],
    highlight: false,
  },
  {
    name: "Grow",
    price: "from $2,800/mo",
    desc: "For established brands ready to scale their digital footprint across Lebanon and the GCC.",
    features: [
      "Everything in Launch",
      "4 professional reels per month",
      "Paid social campaign management",
      "Website design or redesign",
      "Bi-weekly strategy calls",
      "Community management (DMs + comments)",
    ],
    highlight: true,
  },
  {
    name: "Dominate",
    price: "Custom",
    desc: "Full-service creative partnership for brands that want to own their category.",
    features: [
      "Everything in Grow",
      "Monthly cinematic brand film",
      "Influencer & PR outreach",
      "Dedicated account team",
      "24-hour priority support",
      "Quarterly brand audits",
    ],
    highlight: false,
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
          <h1 className="font-display font-bold text-[clamp(2.5rem,8vw,8rem)] text-white leading-none">
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

      {/* Pricing packages */}
      <section className="py-20 md:py-32 bg-dark border-t border-dark-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <div className="mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-4">Packages</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-none">
              <SplitText text="Simple pricing" />
            </h2>
            <p className="text-neutral-muted text-base mt-4 max-w-md">
              Transparent, scalable packages. No hidden fees, just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {packages.map((pkg, i) => (
              <RevealBlock key={pkg.name} delay={i * 0.1}>
                <div
                  className={`rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col h-full ${
                    pkg.highlight
                      ? "bg-brand border border-brand shadow-[0_0_60px_rgba(124,58,237,0.3)]"
                      : "border border-dark-300 bg-dark-100"
                  }`}
                >
                  <div className="mb-6 md:mb-8">
                    <p
                      className={`text-xs uppercase tracking-widest mb-3 ${
                        pkg.highlight ? "text-violet-200" : "text-neutral-mid"
                      }`}
                    >
                      {pkg.name}
                    </p>
                    <p className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
                      {pkg.price}
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        pkg.highlight ? "text-violet-200" : "text-neutral-muted"
                      }`}
                    >
                      {pkg.desc}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5 md:gap-3 flex-1 mb-6 md:mb-8">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-3 text-sm ${
                          pkg.highlight ? "text-white" : "text-neutral-muted"
                        }`}
                      >
                        <span
                          className={`mt-0.5 shrink-0 text-xs ${
                            pkg.highlight ? "text-violet-200" : "text-brand-light"
                          }`}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/contact"
                    className={`w-full text-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      pkg.highlight
                        ? "bg-white text-brand hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "border border-dark-300 text-white hover:border-brand hover:shadow-[0_0_15px_rgba(124,58,237,0.25)]"
                    }`}
                  >
                    Get started
                  </a>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator */}
      <ProjectEstimator />

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
