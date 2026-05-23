import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/lib/projects";
import ContactCTA from "@/components/home/ContactCTA";
import RevealBlock from "@/components/ui/RevealBlock";
import BrowserMockup from "@/components/work/BrowserMockup";
import SocialGrid from "@/components/work/SocialGrid";
import BeforeAfterSlider from "@/components/work/BeforeAfterSlider";

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

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

      {/* Long description */}
      <section className="py-24 bg-dark">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <RevealBlock>
            <div className="grid md:grid-cols-[1fr_2fr] gap-16">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-light mb-2">Overview</p>
                <div className="w-8 h-px bg-brand mt-4" />
              </div>
              <p className="text-white text-xl md:text-2xl leading-relaxed font-light">
                {project.longDescription}
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Before/After comparison */}
      {project.beforeAfter && project.beforeAfter.length > 0 && (
        <section className="py-20 md:py-28 bg-dark-100 border-t border-dark-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
            <RevealBlock>
              <div className="flex items-center gap-4 mb-10">
                <p className="text-xs uppercase tracking-widest text-brand-light">Before & After</p>
                <div className="flex-1 h-px bg-dark-200" />
              </div>
              <BeforeAfterSlider items={project.beforeAfter} accentColor={project.accentColor} />
            </RevealBlock>
          </div>
        </section>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-24 bg-dark-100 border-t border-dark-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
            <p className="text-xs uppercase tracking-widest text-brand-light mb-10">
              Related projects
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-dark-300 hover:border-brand transition-colors duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-light transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-neutral-muted text-sm mt-1">{p.category} · {p.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
