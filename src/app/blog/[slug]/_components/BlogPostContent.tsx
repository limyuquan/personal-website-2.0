"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { type BlogPost } from "~/lib/blog-types";
import { formatDate } from "~/lib/format";
import { ArrowLeftIcon, ClockIcon, TagIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { MDXContent } from "./MDXContent";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [contentRef, contentInView] = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-500/10 via-cyan-500/5 to-transparent rounded-full blur-[100px]"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <article className="relative z-10 max-w-4xl mx-auto px-6 py-32">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-12"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to blog</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-12"
        >
          {/* Meta info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6"
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              {post.readingTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {post.title}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6"
          >
            {post.description}
          </motion.p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  <TagIcon className="w-3.5 h-3.5" />
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="mt-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.header>

        {/* Content */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 40 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="prose-blog"
        >
          <MDXContent content={post.content} />
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-400">Thanks for reading!</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>More posts</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </motion.footer>
      </article>
    </motion.main>
  );
}

