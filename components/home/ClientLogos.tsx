"use client";

import { cn } from "@/lib/utils";

// All 18 real Social Pulse clients
const row1 = [
  "Dare Advisors",
  "Kataleya",
  "Medonations",
  "Gulf Central Company",
  "Platters",
  "eMagine UAE",
  "Metle Metlik",
  "The Breast Clinic",
  "D Does Business",
];

const row2 = [
  "Prairie Trading Service",
  "Stretch'In",
  "MEHE Lebanon",
  "Michelle Tueini",
  "Cirrus Shield",
  "Singureni Manor",
  "Lavender Project",
  "Healing Makers",
  "Gemz",
  "Dr. Chebl Azar",
  "Nicholas Tawil",
  "Tiffany Saade",
  "The Drop Lane",
  "HEG Construction",
  "Dr. Amany Sabbagh",
  "IT Signal",
];

interface TickerRowProps {
  items: string[];
  reverse?: boolean;
  speed?: number;
}

function TickerRow({ items, reverse = false, speed = 35 }: TickerRowProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3 md:py-4">
      <div
        className={cn(
          "flex whitespace-nowrap",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((name, i) => (
          <span key={i} className="inline-flex items-center gap-4 md:gap-6 px-4 md:px-6">
            <span className="text-xs md:text-sm font-medium text-neutral-mid tracking-wider uppercase hover:text-white transition-colors duration-200 cursor-default">
              {name}
            </span>
            <span className="w-1 h-1 rounded-full bg-dark-300 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="py-6 md:py-10 bg-dark border-y border-dark-200/60 overflow-hidden">
      <div className="mb-3 md:mb-4 text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-neutral-mid/60">
          Trusted by
        </p>
      </div>
      <TickerRow items={row1} reverse={false} speed={40} />
      <TickerRow items={row2} reverse={true} speed={35} />
    </section>
  );
}
