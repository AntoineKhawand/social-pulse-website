"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

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
              className="relative px-4 py-2 rounded-full text-sm transition-all duration-300 min-h-[38px] flex items-center justify-center select-none"
            >
              <span className={cn(
                "relative z-10 transition-colors duration-300",
                activeCategory === f ? "text-white font-medium" : "text-neutral-muted hover:text-white"
              )}>
                {f}
              </span>
              {activeCategory === f && (
                <motion.span
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-brand rounded-full shadow-[0_0_15px_rgba(124,58,237,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="relative flex items-center border border-dark-300 rounded-full p-1 gap-1 w-fit">
          <button
            onClick={() => setView("grid")}
            className="relative px-4 py-1.5 rounded-full text-xs transition-all select-none min-h-[28px] flex items-center justify-center"
          >
            <span className={cn(
              "relative z-10 transition-colors duration-300", 
              view === "grid" ? "text-white font-medium" : "text-neutral-muted hover:text-white"
            )}>
              Grid
            </span>
            {view === "grid" && (
              <motion.span
                layoutId="activeViewPill"
                className="absolute inset-0 bg-dark-300 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setView("list")}
            className="relative px-4 py-1.5 rounded-full text-xs transition-all select-none min-h-[28px] flex items-center justify-center"
          >
            <span className={cn(
              "relative z-10 transition-colors duration-300", 
              view === "list" ? "text-white font-medium" : "text-neutral-muted hover:text-white"
            )}>
              List
            </span>
            {view === "list" && (
              <motion.span
                layoutId="activeViewPill"
                className="absolute inset-0 bg-dark-300 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-neutral-mid text-xs mb-8">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid / List */}
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          {view === "grid" ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {filtered.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} view="grid" />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {filtered.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} view="list" />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
