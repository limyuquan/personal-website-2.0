"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { type BlogPostMeta } from "~/lib/blog-types";
import { formatDate } from "~/lib/format";
import { ArrowLeftIcon, ClockIcon, TagIcon } from "@heroicons/react/24/outline";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 4a1 1 0 0 1 .707.293l3 3a1 1 0 0 1-.464 1.68l-1.717.43-2.768 2.767.349 3.14a1 1 0 0 1-1.69.79L12 14.682l-4.879 4.879a1 1 0 1 1-1.414-1.414L10.586 13l-1.418-1.417a1 1 0 0 1 .79-1.69l3.14.349 2.767-2.768.43-1.717A1 1 0 0 1 16 4Z" />
    </svg>
  );
}

interface BlogListProps {
  posts: BlogPostMeta[];
}

export function BlogList({ posts }: BlogListProps) {
  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [postsRef, postsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
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
          className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="pl-6 md:pl-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-12"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16 pl-6 md:pl-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="rotating-gradient-text">
              Blog
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
          >
            Thoughts and my personal experiences on software engineering, state of AI and occassional rambles about life.
          </motion.p>
        </motion.header>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <motion.div
            ref={postsRef}
            initial="hidden"
            animate={postsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid gap-6"
          >
            {posts.map((post) => (
              <motion.article key={post.slug} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <motion.div
                    className="blog-card-wrapper"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="blog-card-inner relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 transition-all duration-300 group-hover:bg-white/[0.08]">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3 flex items-center gap-2">
                            {post.pinned && (
                              <PinIcon className="w-7 h-7 text-purple-500 shrink-0 -scale-x-100" />
                            )}
                            {post.title}
                          </h2>

                          {/* Description */}
                          <p className="text-gray-400 leading-relaxed line-clamp-2 mb-4">
                            {post.description}
                          </p>

                          {/* Tags */}
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                                >
                                  <TagIcon className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Meta info */}
                        <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 text-sm text-gray-500 shrink-0">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {post.readingTime}
                          </span>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                        <svg
                          className="w-5 h-5 text-cyan-400"
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
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">No posts yet. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}

