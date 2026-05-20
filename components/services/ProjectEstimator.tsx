"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, ArrowRight, RotateCcw, Send, Calendar, Sparkles, LayoutGrid } from "lucide-react";

type Step = "estimate" | "contact" | "success";

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  icon: React.ReactNode;
}

const SERVICES: ServiceOption[] = [
  {
    id: "branding",
    name: "Branding & Identity",
    basePrice: 1500,
    description: "Logo, full guidelines, typography, & brand assets.",
    icon: <Sparkles className="w-5 h-5 text-violet-400" />,
  },
  {
    id: "social",
    name: "Social Media Management",
    basePrice: 1200,
    description: "Strategy, content creation, & analytics.",
    icon: <Calendar className="w-5 h-5 text-violet-400" />,
  },
  {
    id: "video",
    name: "Video & Motion Graphics",
    basePrice: 1000,
    description: "Brand films, short-form reels, & motion graphics.",
    icon: <Send className="w-5 h-5 text-violet-400" />,
  },
  {
    id: "web",
    name: "Web Design & Dev",
    basePrice: 2500,
    description: "Custom Next.js design, copy, SEO, & CMS.",
    icon: <LayoutGrid className="w-5 h-5 text-violet-400" />,
  },
  {
    id: "photography",
    name: "Photography",
    basePrice: 800,
    description: "Product, lifestyle, & campaign photography.",
    icon: <Check className="w-5 h-5 text-violet-400" />,
  },
];

export default function ProjectEstimator() {
  const [step, setStep] = useState<Step>("estimate");
  const [selectedServices, setSelectedServices] = useState<string[]>(["branding"]);

  // Sliders state
  const [socialPosts, setSocialPosts] = useState<number>(12); // min 8, max 30
  const [videoReels, setVideoReels] = useState<number>(4); // min 2, max 12
  const [webPages, setWebPages] = useState<number>(5); // min 3, max 15

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Calculations
  const calculations = useMemo(() => {
    let details: { name: string; price: number; desc: string }[] = [];
    let total = 0;

    selectedServices.forEach((id) => {
      if (id === "branding") {
        details.push({
          name: "Branding & Identity",
          price: 1500,
          desc: "Full brand visual system",
        });
        total += 1500;
      }
      if (id === "social") {
        const extraPosts = Math.max(0, socialPosts - 8);
        const price = 1200 + extraPosts * 50;
        details.push({
          name: `Social Media (${socialPosts} posts/mo)`,
          price,
          desc: `Base 8 posts + ${extraPosts} extra posts`,
        });
        total += price;
      }
      if (id === "video") {
        const extraReels = Math.max(0, videoReels - 2);
        const price = 1000 + extraReels * 200;
        details.push({
          name: `Video & Reels (${videoReels} videos)`,
          price,
          desc: `Base 2 reels + ${extraReels} extra video shoots`,
        });
        total += price;
      }
      if (id === "web") {
        const extraPages = Math.max(0, webPages - 3);
        const price = 2500 + extraPages * 150;
        details.push({
          name: `Next.js Website (${webPages} pages)`,
          price,
          desc: `Base 3 pages + ${extraPages} extra pages`,
        });
        total += price;
      }
      if (id === "photography") {
        details.push({
          name: "Photography",
          price: 800,
          desc: "Full shoot + retouching",
        });
        total += 800;
      }
    });

    return { details, total };
  }, [selectedServices, socialPosts, videoReels, webPages]);

  const handleReset = () => {
    setSelectedServices(["branding"]);
    setSocialPosts(12);
    setVideoReels(4);
    setWebPages(5);
    setStep("estimate");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setErrorMessage("");

    // Build lead details
    const selectedServiceNames = SERVICES.filter((s) => selectedServices.includes(s.id))
      .map((s) => s.name)
      .join(", ");

    const budgetString = `$${calculations.total.toLocaleString()} Estimated`;

    // Construct detailed message body containing itemized estimate
    const detailedMessage = `
--- Dynamic Estimate Breakdown ---
${calculations.details.map((d) => `- ${d.name}: $${d.price.toLocaleString()}`).join("\n")}
Total Estimated: $${calculations.total.toLocaleString()}

--- Client Message ---
${message}
    `;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          services: selectedServiceNames,
          budget: budgetString,
          message: detailedMessage,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit project inquiry.");
      }

      setStep("success");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong. Please check your connection and try again.");
      setSubmitStatus("error");
    }
  };

  return (
    <section className="py-20 md:py-32 bg-dark border-t border-dark-200" id="project-estimator">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-4">Interactive Tool</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-none">
            Project Estimator
          </h2>
          <p className="text-neutral-muted text-base mt-4 max-w-xl">
            Choose your services and customize the scope to calculate an instant cost estimate. Get transparent pricing tailored to your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          
          {/* Main Wizard */}
          <div className="bg-dark-100/50 border border-dark-200/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 min-h-[480px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {step === "estimate" && (
                <motion.div
                  key="step-estimate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display font-semibold text-xl text-white mb-6">
                    Step 1: Choose & Customize Services
                  </h3>
                  
                  {/* Grid Checkbox List */}
                  <div className="flex flex-col gap-3.5 mb-8">
                    {SERVICES.map((opt) => {
                      const active = selectedServices.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleService(opt.id)}
                          className={cn(
                            "w-full text-left p-4 rounded-xl md:rounded-2xl border transition-all duration-300 flex items-center justify-between group",
                            active
                              ? "bg-brand/10 border-brand/50 shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                              : "bg-dark border-dark-300 hover:border-brand-light/30"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                              active ? "bg-brand/20 text-white" : "bg-dark-200 text-neutral-muted group-hover:text-white"
                            )}>
                              {opt.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-white text-sm md:text-base">{opt.name}</h4>
                              <p className="text-neutral-muted text-xs md:text-sm mt-0.5">{opt.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs md:text-sm text-neutral-muted font-mono">
                              from ${opt.basePrice.toLocaleString()}
                            </span>
                            <div className={cn(
                              "w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0",
                              active ? "border-brand bg-brand text-white" : "border-dark-300"
                            )}>
                              {active && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sliders Container (Conditional on active selection) */}
                  <div className="flex flex-col gap-6 border-t border-dark-200/50 pt-8 mt-6">
                    {selectedServices.includes("social") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <label className="text-white font-medium">Monthly Social Media Posts</label>
                          <span className="text-brand-light font-mono font-semibold">{socialPosts} Posts</span>
                        </div>
                        <input
                          type="range"
                          min="8"
                          max="30"
                          value={socialPosts}
                          onChange={(e) => setSocialPosts(parseInt(e.target.value))}
                          className="w-full h-1 bg-dark rounded-lg appearance-none cursor-pointer accent-brand"
                        />
                        <span className="text-[10px] text-neutral-mid">Includes base 8 posts. Additional posts are priced at $50/post.</span>
                      </motion.div>
                    )}

                    {selectedServices.includes("video") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <label className="text-white font-medium">Reel / Video shoots count</label>
                          <span className="text-brand-light font-mono font-semibold">{videoReels} Videos</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="12"
                          value={videoReels}
                          onChange={(e) => setVideoReels(parseInt(e.target.value))}
                          className="w-full h-1 bg-dark rounded-lg appearance-none cursor-pointer accent-brand"
                        />
                        <span className="text-[10px] text-neutral-mid">Includes base 2 cinematic videos. Additional videos are priced at $200/video.</span>
                      </motion.div>
                    )}

                    {selectedServices.includes("web") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <label className="text-white font-medium">Website Pages Count</label>
                          <span className="text-brand-light font-mono font-semibold">{webPages} Pages</span>
                        </div>
                        <input
                          type="range"
                          min="3"
                          max="15"
                          value={webPages}
                          onChange={(e) => setWebPages(parseInt(e.target.value))}
                          className="w-full h-1 bg-dark rounded-lg appearance-none cursor-pointer accent-brand"
                        />
                        <span className="text-[10px] text-neutral-mid">Includes base 3 pages. Custom landing pages are priced at $150/page.</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === "contact" && (
                <motion.div
                  key="step-contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-semibold text-xl text-white">
                      Step 2: Start Your Project
                    </h3>
                    <button
                      type="button"
                      onClick={() => setStep("estimate")}
                      className="text-neutral-muted hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                    >
                      ← Back to edit
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="est-name">
                          Name *
                        </label>
                        <input
                          id="est-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-dark border border-dark-300 focus:border-brand rounded-xl px-4 py-3 text-white placeholder:text-neutral-mid text-sm outline-none transition-colors min-h-[46px]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="est-email">
                          Email *
                        </label>
                        <input
                          id="est-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-dark border border-dark-300 focus:border-brand rounded-xl px-4 py-3 text-white placeholder:text-neutral-mid text-sm outline-none transition-colors min-h-[46px]"
                          inputMode="email"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="est-company">
                        Company / Brand
                      </label>
                      <input
                        id="est-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company name"
                        className="w-full bg-dark border border-dark-300 focus:border-brand rounded-xl px-4 py-3 text-white placeholder:text-neutral-mid text-sm outline-none transition-colors min-h-[46px]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="est-message">
                        Additional details (Optional)
                      </label>
                      <textarea
                        id="est-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us more about your target audience, launch deadlines, or specific visual styles you like."
                        className="w-full bg-dark border border-dark-300 focus:border-brand rounded-xl px-4 py-3 text-white placeholder:text-neutral-mid text-sm outline-none transition-colors min-h-[100px] resize-none"
                      />
                    </div>

                    {submitStatus === "error" && (
                      <div className="text-red-400 text-xs bg-red-950/40 border border-red-900/60 rounded-xl px-4 py-3 mt-2">
                        ⚠️ {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="w-full mt-4 px-6 py-4 rounded-xl bg-brand text-white font-medium text-sm hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-60 disabled:cursor-not-allowed min-h-[50px]"
                    >
                      {submitStatus === "loading" ? "Submitting Inquiry…" : "Submit Estimate Request →"}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="step-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-2xl text-white mb-6 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                    ✓
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-4">
                    Estimate Request Sent!
                  </h3>
                  <p className="text-neutral-muted text-sm max-w-sm leading-relaxed mb-8">
                    We have received your custom scope details. Our lead creative strategist will review the estimate and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 text-brand-light hover:text-white transition-colors text-xs font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Start new estimate
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Receipt Card */}
          <div className="border border-dark-300 bg-dark-100 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-between sticky top-28 min-h-[480px]">
            <div>
              <h3 className="font-display font-semibold text-lg text-white mb-6 pb-4 border-b border-dark-200/50">
                Estimate Summary
              </h3>

              {selectedServices.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-neutral-muted text-sm">No services selected.</p>
                  <p className="text-neutral-mid text-xs mt-1">Select one or more services above.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {calculations.details.map((d, i) => (
                    <motion.div
                      key={d.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="font-medium text-sm text-white">{d.name}</h4>
                        <p className="text-neutral-muted text-xs mt-0.5">{d.desc}</p>
                      </div>
                      <span className="font-mono text-sm text-white shrink-0 font-medium">
                        ${d.price.toLocaleString()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-dark-200/50 pt-6 mt-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-muted">Estimated Total</p>
                  <p className="text-[10px] text-brand-light mt-0.5">Flexible billing options</p>
                </div>
                <motion.span
                  key={calculations.total}
                  initial={{ opacity: 0.7, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-display font-bold text-3xl md:text-4xl text-white font-mono tracking-tight"
                >
                  ${calculations.total.toLocaleString()}
                </motion.span>
              </div>

              {step === "estimate" && (
                <button
                  type="button"
                  disabled={selectedServices.length === 0}
                  onClick={() => setStep("contact")}
                  className="w-full px-6 py-4 rounded-xl bg-brand text-white font-medium text-sm hover:bg-brand-dark flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[50px]"
                >
                  Lock in Estimate <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === "contact" && (
                <div className="text-center">
                  <p className="text-[11px] text-neutral-muted leading-tight">
                    Submit the form to request a formal proposal.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
