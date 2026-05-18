import type { Metadata } from "next";
import SplitText from "@/components/ui/SplitText";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Social Pulse to start your next creative project.",
};

const details = [
  { label: "Email", value: "hello@socialpulselb.com", href: "mailto:hello@socialpulselb.com" },
  { label: "Instagram", value: "@socialpulse.lb", href: "https://www.instagram.com/socialpulse.lb/" },
  { label: "Based in", value: "Beirut, Lebanon", href: null },
  { label: "Serving", value: "Lebanon · GCC · Global", href: null },
];

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-dark pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-6">Get in touch</p>
          <h1 className="font-display font-bold text-[clamp(2.5rem,8vw,7rem)] text-white leading-none">
            <SplitText text="Let's build" />
            <br />
            <SplitText text="something great." delay={0.2} className="text-gradient" />
          </h1>
        </div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-20">
          {/* Details */}
          <div>
            <p className="text-neutral-muted text-base leading-relaxed mb-12">
              Tell us about your project — we&apos;ll get back to you within 24 hours with a tailored approach.
            </p>
            <div className="flex flex-col gap-8">
              {details.map((d) => (
                <div key={d.label} className="border-b border-dark-200 pb-6">
                  <p className="text-xs uppercase tracking-widest text-neutral-mid mb-2">{d.label}</p>
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-white font-medium hover:text-brand-light transition-colors"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{d.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
