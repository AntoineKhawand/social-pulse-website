import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/lib/projects";
import ContactCTA from "@/components/home/ContactCTA";
import RevealBlock from "@/components/ui/RevealBlock";
import BrowserMockup from "@/components/work/BrowserMockup";
import SocialGrid from "@/components/work/SocialGrid";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Social Pulse`,
      description: project.description,
      images: [{ url: project.coverImage }],
    },
  };
}

function renderOverview(paragraphs: string[], highlights: string[], accentColor: string) {
  function applyHighlights(text: string) {
    if (highlights.length === 0) return <>{text}</>;
    const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(pattern);
    return (
      <>
        {parts.map((part, i) =>
          highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
            <strong key={i} className="font-semibold" style={{ color: accentColor }}>
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  }

  return (
    <div className="space-y-6">
      {paragraphs.map((para, i) => (
        <p
          key={i}
          className={`leading-relaxed font-light ${
            i === 0
              ? "text-2xl md:text-3xl text-white"
              : "text-lg md:text-xl text-white/70"
          }`}
        >
          {applyHighlights(para)}
        </p>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-dark">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-neutral-mid mb-10 uppercase tracking-widest">
            <Link href="/work" className="hover:text-white transition-colors">Work</Link>
            <span>/</span>
            <span className="text-neutral-muted">{project.title}</span>
          </div>

          {/* Title block */}
          <div className="grid md:grid-cols-2 gap-12 mb-16 items-end">
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-6 border"
                style={{ color: project.accentColor, borderColor: project.accentColor + "44" }}
              >
                {project.category}
              </span>
              <h1 className="font-display font-bold text-5xl md:text-7xl text-white leading-none mb-6">
                {project.title}
              </h1>
              <p className="text-neutral-muted text-lg leading-relaxed">{project.description}</p>
            </div>
            <div className="flex flex-col gap-5 md:pl-8">
              {[
                { label: "Client", value: project.client },
                { label: "Year", value: project.year },
                { label: "Location", value: project.location },
                { label: "Category", value: project.category },
                ...(project.result ? [{ label: "Result", value: project.result }] : []),
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start border-b border-dark-200 pb-5">
                  <span className="text-xs uppercase tracking-widest text-neutral-mid w-20 shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  <span className="text-white text-sm">{item.value}</span>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full border border-dark-300 text-neutral-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cover image — full bleed */}
        <div className="relative h-[45vw] min-h-[240px] max-h-[600px] md:h-[70vh] md:max-h-none overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-50" />
        </div>
      </section>

      {/* Live website mockup — any project with a websiteUrl */}
      {project.websiteUrl && (
          <section className="py-20 md:py-28 bg-dark border-t border-dark-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
              <RevealBlock>
                <div className="flex items-center gap-4 mb-10">
                  <p className="text-xs uppercase tracking-widest text-brand-light">Live Website</p>
                  <div className="flex-1 h-px bg-dark-200" />
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-muted hover:text-white transition-colors"
                  >
                    {project.websiteUrl.replace(/^https?:\/\//, "")} ↗
                  </a>
                </div>
                <BrowserMockup
                  url={project.websiteUrl}
                  title={project.title}
                  screenshots={project.screenshots ?? []}
                  accentColor={project.accentColor}
                  techStack={project.techStack}
                  features={project.features}
                />
              </RevealBlock>
            </div>
          </section>
        )}

      {/* Social media grid */}
      {project.instagramHandle && project.socialPosts && project.socialPosts.length > 0 && (
        <section className="py-20 md:py-28 bg-dark border-t border-dark-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
            <RevealBlock>
              <div className="flex items-center gap-4 mb-10">
                <p className="text-xs uppercase tracking-widest text-brand-light">Social Media</p>
                <div className="flex-1 h-px bg-dark-200" />
                <a
                  href={`https://www.instagram.com/${project.instagramHandle}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-muted hover:text-white transition-colors"
                >
                  @{project.instagramHandle} ↗
                </a>
              </div>
              <SocialGrid
                handle={project.instagramHandle}
                posts={project.socialPosts}
                accentColor={project.accentColor}
              />
            </RevealBlock>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="py-24 bg-dark">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <RevealBlock>
            <div className="grid md:grid-cols-[1fr_2fr] gap-16">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-light mb-2">Overview</p>
                <div className="w-8 h-px bg-brand mt-4" />
              </div>
              <div>
                {renderOverview(
                  project.overviewParagraphs ?? [project.longDescription],
                  project.highlights ?? [],
                  project.accentColor
                )}
                {project.quote && (
                  <blockquote
                    className="mt-10 pl-5 border-l-2 text-2xl md:text-3xl font-display font-bold italic text-white"
                    style={{ borderColor: project.accentColor }}
                  >
                    &ldquo;{project.quote}&rdquo;
                  </blockquote>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>



      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-24 bg-dark-100 border-t border-dark-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-light mb-3">Related Projects</p>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white">More work like this</h2>
              </div>
              <Link
                href="/work"
                className="hidden md:flex items-center gap-2 text-sm text-neutral-muted hover:text-white transition-colors duration-200"
              >
                See all work <span className="text-lg leading-none">→</span>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-dark border border-dark-300 hover:border-dark-200 transition-all duration-300"
                >
                  {/* Accent top bar */}
                  <div
                    className="h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ background: p.accentColor }}
                  />
                  {/* Cover image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full border"
                        style={{ color: p.accentColor, borderColor: p.accentColor + "33" }}
                      >
                        {p.category}
                      </span>
                      <span className="text-xs text-neutral-mid">{p.year}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-light transition-colors duration-200 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-neutral-muted text-sm leading-relaxed line-clamp-2 flex-1">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-2 mt-5 pt-5 border-t border-dark-200 text-xs font-medium text-brand-light">
                      View project
                      <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex md:hidden justify-center mt-8">
              <Link
                href="/work"
                className="text-sm text-neutral-muted hover:text-white transition-colors flex items-center gap-2"
              >
                See all work →
              </Link>
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
