import type { Metadata } from "next";
import SplitText from "@/components/ui/SplitText";
import ContactForm from "@/components/contact/ContactForm";
import BookCall from "@/components/ui/BookCall";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact — Start Your Project with Social Pulse Beirut",
  description:
    "Get in touch with Social Pulse Lebanon to start your branding, social media, video, or web design project. Based in Beirut, serving Lebanon and the GCC. We respond within 24 hours.",
  openGraph: {
    title: "Contact Social Pulse — Creative Agency Beirut",
    description:
      "Start your next project with Social Pulse Lebanon. Branding, social media, video production, and web design for Lebanon and the GCC.",
    url: "https://www.socialpulselb.com/contact",
  },
  alternates: { canonical: "https://www.socialpulselb.com/contact" },
};

const details = [
  {
    label: "Email",
    value: "socialpulselb@gmail.com",
    href: "mailto:socialpulselb@gmail.com",
  },
  {
    label: "Instagram",
    value: "@socialpulse.lb",
    href: "https://www.instagram.com/socialpulse.lb/",
  },
  {
    label: "LinkedIn",
    value: "Social Pulse Lebanon",
    href: "https://www.linkedin.com/company/socialpulselb",
  },
  { label: "Based in", value: "Beirut, Lebanon", href: null },
  { label: "Serving", value: "Lebanon · KSA · UAE · USA · Global", href: null },
  { label: "Response time", value: "Within 24 hours", href: null },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.socialpulselb.com" },
          { name: "Contact", url: "https://www.socialpulselb.com/contact" },
        ]}
      />

      <section className="min-h-screen bg-dark pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">

          {/* Header */}
          <div className="mb-14 md:mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-6">Get in touch</p>
            <h1 className="font-display font-bold text-[clamp(2.2rem,7vw,7rem)] text-white leading-none break-words">
              <SplitText text="Let's build" />
              <br />
              <SplitText text="something great." delay={0.2} className="text-gradient" />
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20">
            {/* Details */}
            <div>
              <p className="text-neutral-muted text-sm md:text-base leading-relaxed mb-10 md:mb-12">
                Tell us about your project and we&apos;ll get back to you within 24 hours with a
                tailored approach for your brand.
              </p>

              <BookCall variant="outline" size="md" label="Book a free consultation →" className="mb-10 md:mb-12 w-full sm:w-auto" />

              <div className="flex flex-col gap-5 md:gap-8">
                {details.map((d) => (
                  <div key={d.label} className="border-b border-dark-200 pb-4 md:pb-6">
                    <p className="text-xs uppercase tracking-widest text-neutral-mid mb-1.5 md:mb-2">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith("http") ? "_blank" : undefined}
                        rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-white font-medium text-sm md:text-base hover:text-brand-light transition-colors"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium text-sm md:text-base">{d.value}</p>
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
    </>
  );
}
