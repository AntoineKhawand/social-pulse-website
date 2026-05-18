"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
          scrolled
            ? "bg-dark/80 backdrop-blur-xl border-b border-dark-200/60"
            : "bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="Social Pulse">
            <div className="relative w-7 h-7 md:w-8 md:h-8 shrink-0">
              <div className="absolute inset-0 rounded-full bg-brand opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[2px] md:inset-[3px] rounded-full bg-dark" />
              <div className="absolute inset-[5px] md:inset-[6px] rounded-full bg-brand-light" />
            </div>
            <span className="font-display font-bold text-xs md:text-sm tracking-wider uppercase text-white">
              Social Pulse
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-muted hover:text-white transition-colors duration-300 tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-4 lg:px-5 py-2.5 text-sm font-medium rounded-full bg-brand hover:bg-brand-dark text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] whitespace-nowrap"
            >
              Start a project
            </Link>
          </nav>

          {/* Mobile Burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-[101] shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-6 h-px bg-white origin-center"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-white"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-white origin-center"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-dark flex flex-col justify-center px-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-5 mt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-5xl sm:text-6xl font-bold text-white hover:text-brand-light transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ delay: 0.38, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/contact"
                  className="inline-block mt-4 px-7 py-3.5 rounded-full bg-brand text-white font-medium text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  Start a project
                </Link>
              </motion.div>
            </nav>

            <div className="mt-auto pb-12">
              <p className="text-neutral-muted text-sm">hello@socialpulselb.com</p>
              <a
                href="https://www.instagram.com/socialpulse.lb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-muted text-sm mt-1 block hover:text-white transition-colors"
              >
                @socialpulse.lb
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
