"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TextScramble } from "./TextScramble";
import { MorphingBlobs, FloatingParticles } from "./MorphingBlobs";
import { ElasticButton } from "./LiquidCard";

export function HeroSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative px-6 bg-white dark:bg-black"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Experimental background effects */}
      <MorphingBlobs />
      <FloatingParticles />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 text-black dark:text-white"
          variants={itemVariants}
        >
          <span className="block">
            <TextScramble trigger={inView} duration={1000} scrambleSpeed={80}>
              Fullstack
            </TextScramble>
          </span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
            <TextScramble trigger={inView} duration={1200} scrambleSpeed={80}>
              Engineer
            </TextScramble>
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          variants={itemVariants}
        >
          Crafting exceptional digital experiences with modern technologies,
          clean code, and innovative solutions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <ElasticButton className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            View My Work
          </ElasticButton>
          
          <ElasticButton className="px-8 py-4 border border-gray-300 dark:border-white/30 text-black dark:text-white rounded-full hover:border-gray-500 dark:hover:border-white/60 transition-colors">
            Download Resume
          </ElasticButton>
        </motion.div>

        <motion.div
          className="mt-20"
          variants={itemVariants}
        >
          <motion.div
            className="w-0.5 h-16 bg-gradient-to-b from-black dark:from-white to-transparent mx-auto"
            animate={{
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.p
            className="text-sm text-gray-500 dark:text-gray-400 mt-4"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
} 