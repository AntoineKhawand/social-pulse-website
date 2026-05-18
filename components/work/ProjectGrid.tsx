"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

type ViewMode = "grid" | "list";

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const filters = ["All", ...categories];

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveCategory(f)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                activeCategory === f
                  ? "bg-brand text-white shadow-[0_0_15px_rgba(124,58,237,0.35)]"
                  : "border border-dark-300 text-neutral-muted hover:border-brand-light hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center border border-dark-300 rounded-full p-1 gap-1">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${
              view === "grid" ? "bg-dark-300 text-white" : "text-neutral-muted"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${
              view === "list" ? "bg-dark-300 text-white" : "text-neutral-muted"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-neutral-mid text-xs mb-8">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid / List */}
      <AnimatePresence mode="popLayout">
        {view === "grid" ? (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} view="grid" />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} view="list" />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
