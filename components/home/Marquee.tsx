"use client";

import { cn } from "@/lib/utils";

const items = [
  "Branding",
  "Social Media",
  "Video Production",
  "Web Design",
  "Photography",
  "Motion Graphics",
  "Strategy",
  "Content Creation",
  "Paid Advertising",
  "Reels",
];

interface MarqueeProps {
  reverse?: boolean;
  speed?: number;
  className?: string;
  accent?: boolean;
}

export default function Marquee({ reverse = false, speed = 30, className, accent = false }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden py-4 border-y border-dark-200", className)}>
      <div
        className={cn(
          "flex whitespace-nowrap gap-0",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6">
            <span
              className={cn(
                "text-sm font-medium uppercase tracking-widest",
                accent ? "text-brand-light" : "text-neutral-muted"
              )}
            >
              {item}
            </span>
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                accent ? "bg-brand" : "bg-dark-400"
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
