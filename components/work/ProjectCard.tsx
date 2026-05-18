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
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      >
        <Link
          href={`/work/${project.slug}`}
          className="flex items-center gap-6 py-5 border-b border-dark-200 group"
          data-cursor-label="Open"
        >
          <span className="text-neutral-mid text-sm font-mono w-6 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
            <Image
              src={project.coverImage}
              alt={project.title}
              width={64}
              height={64}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-light transition-colors truncate">
              {project.title}
            </h3>
            <p className="text-neutral-muted text-sm truncate">{project.client}</p>
          </div>
          <span
            className="hidden md:block px-3 py-1 text-xs rounded-full border border-dark-300 text-neutral-muted shrink-0"
          >
            {project.category}
          </span>
          <span className="text-neutral-muted text-sm shrink-0">{project.year}</span>
          <span className="text-neutral-muted group-hover:text-white group-hover:translate-x-1 transition-all">
            →
          </span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block"
        data-cursor-label="Open"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 img-zoom">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center text-white text-xl shadow-lg">
              →
            </div>
          </div>

          {/* Category tag */}
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-dark/60 backdrop-blur-sm text-xs text-neutral-muted uppercase tracking-wider">
            {project.category}
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-light transition-colors leading-tight">
              {project.title}
            </h3>
            <p className="text-neutral-muted text-sm mt-1">{project.client} · {project.year}</p>
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
