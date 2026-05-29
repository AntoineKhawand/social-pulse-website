"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  view?: "grid" | "list";
}

export default function ProjectCard({ project, index, view = "grid" }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  // ── List view ─────────────────────────────────────────────────────────────
  if (view === "list") {
    const inner = (
      <>
        <span className="hidden sm:block text-neutral-mid text-sm font-mono w-6 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden shrink-0">
          {project.comingSoon ? (
            <div
              className="w-full h-full flex items-center justify-center text-white/50 text-sm font-display font-bold"
              style={{ background: `linear-gradient(135deg, ${project.accentColor}22, ${project.accentColor}44)` }}
            >
              {project.title.charAt(0)}
            </div>
          ) : (
            <Image
              src={project.coverImage}
              alt={project.title}
              width={64}
              height={64}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-base md:text-lg text-white group-hover:text-brand-light transition-colors truncate">
            {project.title}
          </h3>
          <p className="text-neutral-muted text-xs md:text-sm truncate">{project.client}</p>
        </div>

        <span className="hidden md:block px-3 py-1 text-xs rounded-full border border-dark-300 text-neutral-muted shrink-0">
          {project.category}
        </span>

        <span className="hidden sm:block text-neutral-muted text-sm shrink-0">
          {project.year}
        </span>

        {!project.comingSoon && (
          <span className="text-neutral-muted group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 text-sm">
            →
          </span>
        )}
      </>
    );

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {project.comingSoon ? (
          <div className="flex items-center gap-3 md:gap-6 py-4 md:py-5 border-b border-dark-200 group opacity-50 cursor-default">
            {inner}
          </div>
        ) : (
          <Link
            href={`/work/${project.slug}`}
            className="flex items-center gap-3 md:gap-6 py-4 md:py-5 border-b border-dark-200 group"
            data-cursor-label="Open"
          >
            {inner}
          </Link>
        )}
      </motion.div>
    );
  }

  // ── Grid view ─────────────────────────────────────────────────────────────
  const gridInner = (
    <>
      <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden mb-4 img-zoom">
        {project.comingSoon ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${project.accentColor}18, ${project.accentColor}35)` }}
          >
            <span className="font-display font-bold text-4xl md:text-5xl text-white/20">
              {project.title.charAt(0)}
            </span>
          </div>
        ) : (
          <>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand flex items-center justify-center text-white text-lg shadow-lg">
                →
              </div>
            </div>
          </>
        )}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-1 md:px-2.5 rounded-full bg-dark/60 backdrop-blur-sm text-[10px] md:text-xs text-neutral-muted uppercase tracking-wider">
          {project.category}
        </div>
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-brand-light transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="text-neutral-muted text-xs md:text-sm mt-1">
            {project.client} · {project.year}
          </p>
        </div>
        <div
          className="w-2 h-2 rounded-full mt-2 shrink-0"
          style={{ backgroundColor: project.accentColor }}
        />
      </div>
    </>
  );

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {project.comingSoon ? (
        <div className="group block opacity-50 cursor-default">
          {gridInner}
        </div>
      ) : (
        <Link
          href={`/work/${project.slug}`}
          className="group block"
          data-cursor-label="Open"
        >
          {gridInner}
        </Link>
      )}
    </motion.div>
  );
}
