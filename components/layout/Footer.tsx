import Link from "next/link";
import RevealBlock from "@/components/ui/RevealBlock";

const footerLinks = {
  Work: [
    { label: "Branding", href: "/work?filter=Branding" },
    { label: "Social Media", href: "/work?filter=Social+Media" },
    { label: "Video", href: "/work?filter=Video" },
    { label: "Web Design", href: "/work?filter=Web+Design" },
  ],
  Agency: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Process", href: "/about#process" },
  ],
  Connect: [
    { label: "Contact", href: "/contact" },
    { label: "Instagram", href: "https://www.instagram.com/socialpulse.lb/", external: true },
    { label: "Email", href: "mailto:socialpulselb@gmail.com", external: false },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-100 border-t border-dark-200 pt-14 md:pt-20 pb-8 md:pb-10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">

        {/* Top CTA */}
        <RevealBlock className="mb-14 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 md:pb-16 border-b border-dark-200">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-light mb-4">
                Ready to grow?
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-none">
                Let&apos;s build something
                <br />
                <span className="text-gradient">remarkable.</span>
              </h2>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-full border border-brand text-white font-medium text-sm hover:bg-brand hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300 w-fit"
            >
              Start a project
              <span className="text-brand-light">→</span>
            </Link>
          </div>
        </RevealBlock>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-6 h-6 shrink-0">
                <div className="absolute inset-0 rounded-full bg-brand opacity-80" />
                <div className="absolute inset-[2px] rounded-full bg-dark-100" />
                <div className="absolute inset-[4px] rounded-full bg-brand-light" />
              </div>
              <span className="font-display font-bold text-sm tracking-wider uppercase text-white">
                Social Pulse
              </span>
            </div>
            <p className="text-neutral-muted text-sm leading-relaxed max-w-[200px]">
              The Heartbeat of your Brand — Lebanon · KSA · UAE · USA.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs uppercase tracking-widest text-neutral-mid mb-4 font-medium">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5 md:gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-neutral-muted text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 md:pt-8 border-t border-dark-200">
          <p className="text-neutral-mid text-xs">
            © {year} Social Pulse Lebanon. All rights reserved.
          </p>
          <p className="text-neutral-mid text-xs">www.socialpulselb.com</p>
        </div>
      </div>
    </footer>
  );
}
