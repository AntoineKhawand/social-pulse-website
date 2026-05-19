import type { Metadata } from "next";
import Image from "next/image";
import SplitText from "@/components/ui/SplitText";
import RevealBlock from "@/components/ui/RevealBlock";
import ContactCTA from "@/components/home/ContactCTA";
import Stats from "@/components/home/Stats";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About — Social Pulse Creative Agency Beirut",
  description:
    "Meet the Social Pulse team — the Beirut-based creative agency behind powerful brand stories for retail, medical, hospitality, and lifestyle brands across Lebanon and the GCC.",
  openGraph: {
    title: "About Social Pulse — Creative Agency Beirut",
    description:
      "Meet the team behind Social Pulse: branding, social media, video, and web design experts in Beirut, Lebanon.",
    url: "https://www.socialpulselb.com/about",
  },
  alternates: { canonical: "https://www.socialpulselb.com/about" },
};

const team = [
  {
    name: "Ahmed Gamal",
    role: "Co-Founder & Strategy Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "Growth strategy and performance marketing across Lebanon and GCC markets.",
  },
  {
    name: "Marina El Khawand",
    role: "Co-Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    bio: "Brand identity, visual storytelling, and content direction for 50+ brands.",
  },
  {
    name: "Karim N.",
    role: "Lead Videographer & Editor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    bio: "Cinematic reels, After Effects motion graphics, and brand film production.",
  },
  {
    name: "Sara B.",
    role: "Social Media Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    bio: "Community management, content calendars, and paid social for 12+ healthcare clients.",
  },
];

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    desc: "We dig into your brand, audience, competitors, and goals. No assumptions, just honest research that shapes everything that follows.",
  },
  {
    id: "02",
    title: "Strategy",
    desc: "From discovery we build a clear roadmap: positioning, messaging, channel mix, and a content blueprint tailored to your objectives and market.",
  },
  {
    id: "03",
    title: "Creation",
    desc: "Our team brings the strategy to life: design, video, copy, development. Built to the highest standard, delivered on time.",
  },
  {
    id: "04",
    title: "Launch & Scale",
    desc: "We deploy, monitor, and optimize. Data informs every iteration as we push your brand further into the market and keep it there.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.socialpulselb.com" },
          { name: "About", url: "https://www.socialpulselb.com/about" },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-dark">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-6">About us</p>
          <h1 className="font-display font-bold text-[clamp(2.5rem,8vw,8rem)] text-white leading-[0.95] mb-8 md:mb-10">
            <SplitText text="We make brands" />
            <br />
            <SplitText text="impossible to ignore." delay={0.3} className="text-gradient" />
          </h1>
          <p className="text-neutral-muted text-base md:text-xl max-w-2xl leading-relaxed mt-6 md:mt-8">
            Social Pulse is a Beirut-born creative agency operating across Lebanon and the GCC.
            We partner with ambitious brands to build powerful identities, grow engaged communities,
            and produce content that actually converts, for retail, medical, hospitality, finance,
            and lifestyle businesses.
          </p>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-16 md:py-24 bg-dark-100 border-y border-dark-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <RevealBlock>
            <blockquote className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-white leading-tight max-w-4xl">
              &ldquo;We believe every brand has a heartbeat — our job is to amplify it until the whole market feels it.&rdquo;
            </blockquote>
          </RevealBlock>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Team */}
      <section className="py-20 md:py-32 bg-dark">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <div className="mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-4">The team</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-none">
              <SplitText text="The people" />
              <br />
              <SplitText text="behind the work" delay={0.2} />
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {team.map((member, i) => (
              <RevealBlock key={member.name} delay={i * 0.1}>
                <div className="group">
                  <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden mb-2 md:mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      loading="lazy"
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="font-display font-bold text-white text-xs sm:text-sm md:text-lg leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-neutral-muted text-[10px] sm:text-xs md:text-sm mt-0.5 md:mt-1">
                    {member.role}
                  </p>
                  <p className="text-neutral-mid text-xs mt-1 leading-snug hidden md:block">
                    {member.bio}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 md:py-32 bg-dark-100 border-t border-dark-200">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <div className="mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-4">How we work</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-none">
              <SplitText text="Our process" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {processSteps.map((step, i) => (
              <RevealBlock
                key={step.id}
                delay={i * 0.1}
                className={`border-b border-dark-200 py-8 md:py-10 ${
                  i % 2 !== 0 ? "md:border-l md:pl-10" : "md:pr-10"
                }`}
              >
                <span className="text-xs font-mono text-neutral-mid mb-3 md:mb-4 block">
                  {step.id}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-muted text-sm md:text-base leading-relaxed">
                  {step.desc}
                </p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
