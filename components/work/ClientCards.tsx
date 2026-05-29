"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ClientEntry {
  name: string;
  service: string;
  location: string;
}

const clients: ClientEntry[] = [
  { name: "OBJETI",                           service: "Social Media", location: "Lebanon"        },
  { name: "SkyBond Travel",                   service: "Social Media", location: "Lebanon"        },
  { name: "Curaloop",                         service: "Social Media", location: "Global"         },
  { name: "International Maritime Academy",   service: "Social Media", location: "Lebanon"        },
  { name: "Overseas Travel",                  service: "Social Media", location: "Lebanon"        },
  { name: "Dr. Joseph Ghanimeh",              service: "Social Media", location: "Lebanon"        },
  { name: "Céline",                           service: "Social Media", location: "Lebanon"        },
  { name: "Dr. Rita Sammour",                 service: "Social Media", location: "Lebanon"        },
];

function ClientCard({ client, index }: { client: ClientEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.07 }}
      className="group relative flex flex-col gap-4 p-6 rounded-xl border border-dark-200 bg-dark-100/40 hover:border-dark-300 hover:bg-dark-100/70 transition-all duration-300"
    >
      {/* Service badge */}
      <span className="self-start px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border border-dark-300 text-neutral-muted">
        {client.service}
      </span>

      {/* Name */}
      <h3 className="font-display font-bold text-lg md:text-xl text-white leading-tight">
        {client.name}
      </h3>

      {/* Location */}
      <p className="text-neutral-muted text-xs mt-auto">{client.location}</p>

      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-px h-full bg-brand/40" />
        <div className="absolute top-0 right-0 w-full h-px bg-brand/40" />
      </div>
    </motion.div>
  );
}

export default function ClientCards() {
  return (
    <section className="py-16 md:py-24 bg-dark border-t border-dark-200/60">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-3">Also worked with</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
            More Clients
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clients.map((c, i) => (
            <ClientCard key={c.name} client={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
