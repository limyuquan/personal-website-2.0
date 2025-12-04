"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useMemo } from "react";
import { MorphingBlobs, FloatingParticles } from "./MorphingBlobs";
import { ElasticButton } from "./LiquidCard";

// Advanced title animation component
function AnimatedTitle({ text, isActive }: { text: string; isActive: boolean }) {
  const words = useMemo(() => text.split(' '), [text]);

  const springConfig = {
    type: "spring" as const,
    damping: 25,
    stiffness: 200,
    mass: 0.8,
  };

  return (
    <div className="flex flex-wrap justify-center items-center leading-none gap-x-4 lg:gap-x-6">
      {words.map((word, wordIndex) => (
        <div key={`${text}-word-${wordIndex}`} className="flex">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${text}-${wordIndex}-${charIndex}`}
              className="inline-block font-bold tracking-tight bg-white bg-clip-text text-transparent text-7xl lg:text-9xl lg:h-34 will-change-transform transform-gpu"
              initial={{ 
                opacity: 0,
                y: 100,
                rotateX: -90,
                scale: 0.3,
                filter: "blur(20px)"
              }}
              animate={isActive ? { 
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                filter: "blur(0px)"
              } : {
                opacity: 0,
                y: -100,
                rotateX: 90,
                scale: 0.3,
                filter: "blur(20px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                rotateX: 90,
                scale: 0.3,
                filter: "blur(20px)"
              }}
              transition={{
                ...springConfig,
                delay: (wordIndex * word.length + charIndex) * 0.03, // Stagger across words and characters
                opacity: { duration: 0.4 },
                filter: { duration: 0.3 }
              }}
              style={{
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
                perspective: "1000px",
                willChange: "transform, opacity, filter",
              }}
              whileHover={{
                scale: 1.1,
                rotateY: 15,
                transition: { duration: 0.3 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Enhanced title switcher with smooth transitions
function TitleSwitcher({ titles }: { titles: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      
      // Wait for exit animation to complete
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % titles.length);
        setIsChanging(false);
      }, 500); // Delay for smooth transition
      
    }, 2500); // Change every 2.5 seconds for quicker transitions

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="relative h-42 lg:h-70 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isChanging && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedTitle 
                text={titles[currentIndex] ?? "Fullstack Engineer"} 
                isActive={!isChanging}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Subtle background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r  rounded-full "
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileInView={{ opacity: [0.3, 0.6, 0.3] }}
      />
    </div>
  );
}

export function HeroSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const titles = [
    "Software Engineer",
    "Fullstack Engineer",
    "Student",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  } as const;

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative px-6 pt-18 md:pt-0"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Experimental background effects */}
      <MorphingBlobs />
      <FloatingParticles />

      <div className="max-w-6xl md:max-w-none mx-auto text-center relative z-10 px-4">
        {/* Greeting text */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-4 font-light md:text-left md:mt-16"
          variants={itemVariants}
        >
          Hello! I am Yu Quan, a
        </motion.p>

        <TitleSwitcher titles={titles} />

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed mt-10 md:mt-0 md:text-left"
          variants={itemVariants}
        >
          Crafting exceptional digital experiences with modern technologies,
          clean code, and innovative solutions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <a href="#projects">
            <ElasticButton className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
              View My Work
            </ElasticButton>
          </a>
          
          <a href="/files/limyuquan-resume.pdf" target="_blank" rel="noopener noreferrer">
            <ElasticButton className="px-8 py-4 border border-white/30 rounded-full hover:border-white/60 transition-colors">
              Download Resume
            </ElasticButton>
          </a>
        </motion.div>

        <motion.div
          className="mt-20"
          variants={itemVariants}
        >
          <motion.div
            className="w-0.5 h-16 bg-gradient-to-b from-white to-transparent mx-auto"
            animate={{
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileInView={{ scaleY: [0, 1, 0] }}
          />
          <motion.p
            className="text-sm text-gray-400 mt-4"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileInView={{ opacity: [0.5, 1, 0.5] }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
} 