import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Social Pulse privacy policy covering data collection, cookies, and GDPR compliance.",
  robots: { index: false, follow: false },
};

const sections = [
  {
    title: "Who we are",
    body: "Social Pulse is a creative agency based in Beirut, Lebanon. Our website is www.socialpulselb.com. Contact: socialpulselb@gmail.com",
  },
  {
    title: "What data we collect",
    body: "If you accept analytics cookies, we collect anonymised usage data (pages visited, session duration, browser type, country) via Google Analytics 4. We do not collect personally identifiable information through analytics. If you submit our contact form, we collect your name, email address, and message for the purpose of responding to your enquiry.",
  },
  {
    title: "Cookies",
    body: "We use one optional analytics cookie (Google Analytics 4) which is only set if you click Accept All on our cookie banner. If you decline, no tracking cookie is set. You can withdraw consent at any time by clearing your browser cookies.",
  },
  {
    title: "How we use your data",
    body: "Analytics data is used solely to improve the website experience. Contact form data is used only to respond to your message. We do not sell, rent, or share your data with third parties for marketing purposes.",
  },
  {
    title: "Data retention",
    body: "Analytics data is retained for 14 months in Google Analytics (our selected limit). Contact enquiries are retained for as long as reasonably needed to service your request.",
  },
  {
    title: "Your rights (GDPR)",
    body: "If you are located in the EU, EEA, or the UK, you have the right to access, correct, or delete your personal data. You may also object to processing or request data portability. Contact us at socialpulselb@gmail.com to exercise any of these rights.",
  },
  {
    title: "Third-party services",
    body: "If analytics cookies are accepted, your anonymised data is processed by Google LLC under their privacy policy. Google Analytics is configured with IP anonymisation enabled.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this policy from time to time. Material changes will be noted with a revised date below.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="min-h-screen bg-dark pt-36 pb-24">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-neutral-mid hover:text-white transition-colors mb-8 inline-block"
          >
            ← Back
          </Link>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-neutral-muted text-sm">
            Last updated: May 2026 &nbsp;·&nbsp; Social Pulse Lebanon
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.title} className="border-b border-dark-200 pb-10 last:border-0">
              <h2 className="text-white font-semibold text-base mb-3">{s.title}</h2>
              <p className="text-neutral-muted text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 p-6 rounded-2xl bg-dark-100 border border-dark-300">
          <p className="text-white text-sm font-medium mb-1">Questions about your data?</p>
          <p className="text-neutral-muted text-sm">
            Email us at{" "}
            <a
              href="mailto:socialpulselb@gmail.com"
              className="text-brand-light hover:underline"
            >
              socialpulselb@gmail.com
            </a>
            . We will respond within 30 days.
          </p>
        </div>
      </div>
    </section>
  );
}
