import type { Metadata } from "next";
import SplitText from "@/components/ui/SplitText";
import Services from "@/components/home/Services";
import ContactCTA from "@/components/home/ContactCTA";
import RevealBlock from "@/components/ui/RevealBlock";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social Pulse offers branding, social media management, video production, photography, and web design for brands in Lebanon and the GCC.",
};

const packages = [
  {
    name: "Launch",
    price: "from $1,200",
    desc: "Perfect for new brands or businesses refreshing their presence.",
    features: [
      "Brand identity (logo + guidelines)",
      "Social media setup (2 platforms)",
      "12 content pieces / month",
      "Monthly performance report",
    ],
    highlight: false,
  },
  {
    name: "Grow",
    price: "from $2,800",
    desc: "For established brands ready to scale their digital footprint.",
    features: [
      "Everything in Launch",
      "4 reels / month",
      "Paid social campaigns",
      "Website redesign",
      "Bi-weekly strategy calls",
    ],
    highlight: true,
  },
  {
    name: "Dominate",
    price: "Custom",
    desc: "Full-service partnership for brands that want to own their category.",
    features: [
      "Everything in Grow",
      "Monthly brand film",
      "PR & influencer outreach",
      "Dedicated account team",
      "Priority support",
    ],
    highlight: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-dark border-b border-dark-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-6">Services</p>
          <h1 className="font-display font-bold text-[clamp(3rem,9vw,8rem)] text-white leading-none">
            <SplitText text="What we offer" />
          </h1>
          <p className="text-neutral-muted text-xl max-w-xl mt-8 leading-relaxed">
            End-to-end creative services that take your brand from idea to impact.
          </p>
        </div>
      </section>

      {/* Services accordion */}
      <Services />

      {/* Packages */}
      <section className="py-32 bg-dark border-t border-dark-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-4">Packages</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-white leading-none">
              <SplitText text="Simple pricing" />
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <RevealBlock key={pkg.name} delay={i * 0.1}>
                <div
                  className={`rounded-3xl p-8 flex flex-col h-full ${
                    pkg.highlight
                      ? "bg-brand border border-brand shadow-[0_0_60px_rgba(124,58,237,0.3)]"
                      : "border border-dark-300 bg-dark-100"
                  }`}
                >
                  <div className="mb-8">
                    <p className={`text-xs uppercase tracking-widest mb-3 ${pkg.highlight ? "text-violet-200" : "text-neutral-mid"}`}>
                      {pkg.name}
                    </p>
                    <p className={`font-display font-bold text-3xl mb-3 ${pkg.highlight ? "text-white" : "text-white"}`}>
                      {pkg.price}
                    </p>
                    <p className={`text-sm leading-relaxed ${pkg.highlight ? "text-violet-200" : "text-neutral-muted"}`}>
                      {pkg.desc}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3 flex-1 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex items-start gap-3 text-sm ${pkg.highlight ? "text-white" : "text-neutral-muted"}`}>
                        <span className={`mt-1 shrink-0 ${pkg.highlight ? "text-violet-200" : "text-brand-light"}`}>✓</span>
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

      <ContactCTA />
    </>
  );
}
