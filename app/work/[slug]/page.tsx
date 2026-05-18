import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/lib/projects";
import ContactCTA from "@/components/home/ContactCTA";
import RevealBlock from "@/components/ui/RevealBlock";

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
        <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
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

      {/* Image gallery */}
      {project.images.length > 0 && (
        <section className="pb-24 bg-dark">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((src, i) => (
                <RevealBlock key={i} delay={i * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
                  <div className={`relative overflow-hidden rounded-2xl ${i === 0 ? "h-[50vh]" : "h-[40vh]"}`}>
                    <Image
                      src={src}
                      alt={`${project.title} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </RevealBlock>
              ))}
            </div>
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
