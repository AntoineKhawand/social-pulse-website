"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { featuredProjects } from "@/lib/projects";
import SplitText from "@/components/ui/SplitText";

export default function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="py-32 bg-dark">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-4">
              Selected Work
            </p>
            <h2 className="font-display font-bold text-5xl md:text-7xl text-white leading-none">
              <SplitText text="Our Portfolio" />
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-2 text-sm text-neutral-muted hover:text-white transition-colors group"
          >
            View all projects
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-0">
          {featuredProjects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-12 flex md:hidden">
          <Link href="/work" className="text-sm text-brand-light">
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: (typeof featuredProjects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="group relative grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-dark-200 py-16 first:border-t"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      {/* Image */}
      <div
        className={`relative h-[360px] md:h-[480px] overflow-hidden rounded-2xl ${
          isEven ? "md:order-1" : "md:order-2"
        }`}
      >
        <motion.div style={{ y: imgY }} className="absolute inset-[-10%]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        {/* Category badge */}
        <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-dark/70 backdrop-blur-md border border-dark-300 text-xs text-neutral-muted uppercase tracking-widest">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex flex-col justify-center px-0 ${
          isEven ? "md:order-2 md:pl-16" : "md:order-1 md:pr-16"
        }`}
      >
        <span className="text-xs text-neutral-mid uppercase tracking-widest mb-4">
          {String(index + 1).padStart(2, "0")} — {project.year}
        </span>
        <h3 className="font-display font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
          {project.title}
        </h3>
        <p className="text-neutral-muted text-base leading-relaxed mb-8 max-w-sm">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full border border-dark-300 text-neutral-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Result */}
        {project.result && (
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
            <p className="text-sm font-medium" style={{ color: project.accentColor }}>
              {project.result}
            </p>
          </div>
        )}

        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-brand-light transition-colors group/link"
          data-cursor-label="View"
        >
          <span className="border-b border-dark-400 group-hover/link:border-brand-light transition-colors pb-0.5">
            View case study
          </span>
          <span className="translate-x-0 group-hover/link:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
