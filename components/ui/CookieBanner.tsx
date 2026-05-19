"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "sp_cookie_consent";

// ─── Replace with your GA4 Measurement ID ────────────────────────────────────
const GA_ID = "G-XXXXXXXXXX";
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function loadAnalytics() {
  if (typeof window === "undefined" || GA_ID === "G-XXXXXXXXXX") return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      loadAnalytics();
    } else if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    loadAnalytics();
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px] z-[200]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="bg-dark-100/95 border border-dark-300 rounded-2xl p-4 sm:p-5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base shrink-0">🍪</span>
              <p className="text-white text-sm font-semibold">Cookie preferences</p>
            </div>

            {/* Body */}
            <p className="text-neutral-muted text-xs leading-relaxed mb-4">
              We use analytics to understand how visitors use this site. No data is sold.
              Required for our EU and international clients under GDPR.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={accept}
                className="flex-1 min-h-[40px] px-4 py-2 rounded-xl bg-brand text-white text-xs font-medium hover:bg-brand-dark active:scale-95 transition-all duration-200"
              >
                Accept all
              </button>
              <button
                onClick={decline}
                className="flex-1 min-h-[40px] px-4 py-2 rounded-xl border border-dark-300 text-neutral-muted text-xs font-medium hover:border-neutral-mid hover:text-white active:scale-95 transition-all duration-200"
              >
                Decline
              </button>
              <Link
                href="/privacy"
                className="text-xs text-neutral-mid hover:text-white transition-colors shrink-0 px-1 min-h-[40px] flex items-center underline underline-offset-2"
              >
                Privacy
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
