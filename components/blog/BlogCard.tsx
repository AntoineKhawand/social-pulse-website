"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { BlogPost } from "@/lib/posts";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}

export default function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href={`/blog/${post.slug}`}
          className="group block rounded-3xl overflow-hidden border border-dark-300 hover:border-brand/50 transition-all duration-500 bg-dark hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-1"
        >
          <div className="grid md:grid-cols-2 gap-0 h-full">
            <div className="relative h-64 md:h-auto min-h-[320px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent md:bg-gradient-to-r md:from-dark md:via-transparent md:to-transparent opacity-80 md:opacity-100" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border border-brand/30 text-brand-light bg-brand/10 backdrop-blur-md">
                  {post.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-dark-300" />
                <span className="text-[11px] uppercase tracking-[0.1em] text-neutral-400">
                  {post.readTime}
                </span>
              </div>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white group-hover:text-brand-light transition-colors duration-300 mb-4 leading-tight">
                {post.title}
              </h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-8 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="mt-auto pt-6 border-t border-dark-200 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-400">
                  <span className="text-white font-medium">{post.author}</span>
                  <span className="w-1 h-1 rounded-full bg-dark-300" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-200 group-hover:bg-brand text-white transition-colors duration-300">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block h-full rounded-3xl overflow-hidden border border-dark-300 hover:border-brand/40 transition-all duration-500 bg-dark hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-1 flex flex-col"
      >
        <div className="relative h-56 overflow-hidden shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-90" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium border backdrop-blur-md"
              style={{ borderColor: "rgba(167,139,250,0.3)", color: "#A78BFA", background: "rgba(167,139,250,0.15)" }}
            >
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-[11px] text-neutral-500 uppercase tracking-widest mb-4">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-dark-300" />
            <span>{post.readTime}</span>
          </div>
          <h3 className="font-display font-bold text-xl md:text-2xl text-white group-hover:text-brand-light transition-colors duration-300 mb-3 leading-snug line-clamp-2">
            {post.title}
          </h3>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-2 text-sm text-brand-light font-medium group-hover:gap-3 transition-all duration-300">
            Read article <span>→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
