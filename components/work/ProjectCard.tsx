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

  if (view === "list") {
    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href={`/work/${project.slug}`}
          className="flex items-center gap-3 md:gap-6 py-4 md:py-5 border-b border-dark-200 group"
          data-cursor-label="Open"
        >
          {/* Index number — hidden on smallest screens */}
          <span className="hidden sm:block text-neutral-mid text-sm font-mono w-6 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Thumbnail */}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden shrink-0">
            <Image
              src={project.coverImage}
              alt={project.title}
              width={64}
              height={64}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Title + client */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-base md:text-lg text-white group-hover:text-brand-light transition-colors truncate">
              {project.title}
            </h3>
            <p className="text-neutral-muted text-xs md:text-sm truncate">{project.client}</p>
          </div>

          {/* Category — hidden on mobile */}
          <span className="hidden md:block px-3 py-1 text-xs rounded-full border border-dark-300 text-neutral-muted shrink-0">
            {project.category}
          </span>

          {/* Year — hidden on mobile */}
          <span className="hidden sm:block text-neutral-muted text-sm shrink-0">
            {project.year}
          </span>

          {/* Arrow */}
          <span className="text-neutral-muted group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 text-sm">
            →
          </span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block"
        data-cursor-label="Open"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden mb-4 img-zoom">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

          {/* Hover overlay button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand flex items-center justify-center text-white text-lg shadow-lg">
              →
            </div>
          </div>

          {/* Category tag */}
          <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-1 md:px-2.5 rounded-full bg-dark/60 backdrop-blur-sm text-[10px] md:text-xs text-neutral-muted uppercase tracking-wider">
            {project.category}
          </div>
        </div>

        {/* Meta */}
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
      </Link>
    </motion.div>
  );
}
