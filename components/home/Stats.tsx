"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import RevealBlock from "@/components/ui/RevealBlock";

const stats = [
  { value: 50, suffix: "+", label: "Brands grown" },
  { value: 320, suffix: "%", label: "Avg. reach increase" },
  { value: 4, suffix: "M+", label: "Total views delivered" },
  { value: 12, suffix: "+", label: "Healthcare clients" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 md:py-24 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-dark-300">
          {stats.map((stat, i) => (
            <RevealBlock
              key={stat.label}
              delay={i * 0.1}
              className="flex flex-col items-start md:items-center md:text-center px-0 md:px-10"
            >
              <p className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-neutral-muted text-xs sm:text-sm">{stat.label}</p>
            </RevealBlock>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
    </section>
  );
}
