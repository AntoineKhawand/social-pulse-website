"use client";

import { useEffect, useState } from "react";

interface Heading { id: string; text: string; level: 2 | 3 }

function parseHeadings(content: string): Heading[] {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## ") || l.startsWith("### "))
    .map((l) => {
      const level = l.startsWith("### ") ? 3 : 2;
      const text = l.replace(/^#{2,3} /, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { id, text, level };
    });
}

interface Props { content: string }

export default function TableOfContents({ content }: Props) {
  const headings = parseHeadings(content);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "0px 0px -60% 0px" }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-mid mb-4">Contents</p>
      <nav className="flex flex-col gap-0.5">
        {headings.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              setActive(id);
            }}
            className={`text-xs leading-snug py-1.5 transition-all duration-200 border-l-2 ${level === 3 ? "pl-4" : "pl-3"} ${
              active === id
                ? "border-brand text-brand-light font-medium"
                : "border-dark-300 text-neutral-mid hover:text-white hover:border-white/30"
            }`}
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  );
}
