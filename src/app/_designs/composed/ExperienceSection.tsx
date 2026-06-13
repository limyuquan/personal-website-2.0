"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";
import { LiquidCard } from "../../_components/LiquidCard";
import {
  CalendarIcon,
  BuildingOfficeIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { experiences } from "../shared/data";

export function ExperienceSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [failedLogos, setFailedLogos] = useState<Set<number>>(new Set());
  const prefersReducedMotion = useReducedMotion();

  // Scroll-drawn timeline line: draws itself as the timeline scrolls through view
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.5"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });
  // Position of the glowing "comet" head at the leading edge of the drawn line.
  const headTop = useTransform(scaleY, (v) => `${v * 100}%`);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  } as const;

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  } as const;

  return (
    <motion.section
      id="experience"
      ref={ref}
      className="relative min-h-screen scroll-mt-24 overflow-hidden px-6 py-24"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-1/4 -right-48 h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-3xl" />
      <div className="absolute bottom-1/4 -left-48 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div className="mb-24 text-center" variants={itemVariants}>
          <h2 className="text-6xl leading-tight font-bold text-white md:text-8xl">
            Work
            <span className="block liquid-text">Experience</span>
          </h2>
        </motion.div>

        {/* Experience Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central Timeline Line (base track) */}
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-[2px] -translate-x-1/2 transform bg-white/10 lg:block" />
          {/* Drawn layer: a thick, glowing cyan line that grows with scroll */}
          <motion.div
            className="absolute top-0 left-1/2 hidden h-full w-[3px] origin-top rounded-full bg-gradient-to-b from-cyan-200 via-cyan-400 to-cyan-500 shadow-[0_0_18px_rgba(34,211,238,0.6)] lg:block"
            style={{ x: "-50%", scaleY: prefersReducedMotion ? 1 : scaleY }}
          />
          {/* Comet head riding the leading edge of the drawn line */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden
              className="absolute left-1/2 z-30 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_22px_7px_rgba(34,211,238,0.55)] lg:block"
              style={{ top: headTop }}
            />
          )}
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={cardVariants}
              >
                {/* Timeline Node */}
                <motion.div
                  className="absolute top-12 left-1/2 z-20 hidden -translate-x-1/2 transform lg:block"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                >
                  <div className="h-6 w-6 transform-gpu rounded-full border-4 border-slate-900 bg-cyan-400 shadow-lg shadow-cyan-400/30 will-change-transform">
                    <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-30" />
                  </div>
                </motion.div>

                {/* Experience Card */}
                <div
                  className={`lg:flex lg:items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12`}
                >
                  {/* Card Content */}
                  <div className="lg:w-1/2 lg:px-8">
                    <motion.div
                      className="group"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LiquidCard className="relative overflow-visible">
                        {/* Card sheen: subtle cool refraction on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-white/[0.02] to-cyan-200/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative p-8 lg:p-10">
                          {/* Header */}
                          <div className="mb-8 flex items-start justify-between">
                            <div className="flex-1">
                              <motion.h3
                                className="mb-3 transform-gpu text-2xl font-bold text-white transition-colors duration-300 will-change-transform group-hover:text-cyan-400 lg:text-3xl"
                                layoutId={`position-${index}`}
                              >
                                {exp.position}
                              </motion.h3>
                              <div className="mb-2 flex items-center gap-3 text-lg font-semibold text-cyan-400/90">
                                <BuildingOfficeIcon className="h-5 w-5" />
                                {exp.company}
                              </div>
                              <div className="flex items-center gap-2 text-gray-400">
                                <CalendarIcon className="h-4 w-4" />
                                {exp.duration}
                              </div>
                            </div>

                            {/* Company Logo */}
                            {exp.logo && (
                              <motion.div
                                className="ml-6 flex-shrink-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{
                                  delay: 0.3 + index * 0.1,
                                  duration: 0.5,
                                }}
                                whileHover={{ scale: 1.1 }}
                              >
                                <div className="relative h-16 w-16 lg:h-22 lg:w-22">
                                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl transition-all duration-300 group-hover:bg-cyan-400/20" />
                                  <div className="relative h-full w-full rounded-2xl border border-white/15 bg-white/5 p-2 backdrop-blur-sm transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10">
                                    {failedLogos.has(index) ? (
                                      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/10 text-2xl font-bold text-white lg:text-3xl">
                                        {exp.company.charAt(0)}
                                      </div>
                                    ) : (
                                      <div className="relative h-full w-full">
                                        <Image
                                          src={exp.logo}
                                          alt={`${exp.company} logo`}
                                          fill
                                          sizes="88px"
                                          className="rounded-lg object-contain"
                                          onError={() => {
                                            setFailedLogos((prev) =>
                                              new Set(prev).add(index),
                                            );
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Description */}
                          <div className="mb-8">
                            <ul className="space-y-4">
                              {exp.description.map((item, idx) => (
                                <motion.li
                                  key={idx}
                                  className="flex items-start leading-relaxed text-gray-300"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={inView ? { opacity: 1, x: 0 } : {}}
                                  transition={{
                                    delay: 0.1 * idx + 0.7,
                                    duration: 0.5,
                                  }}
                                >
                                  <ChevronRightIcon className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-cyan-400/80" />
                                  <span className="transition-colors duration-300 group-hover:text-white">
                                    {item}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, idx) => (
                                <motion.span
                                  key={idx}
                                  className="transform-gpu rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 will-change-transform hover:border-white/20 hover:bg-white/10 hover:text-white"
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  transition={{ duration: 0.2 }}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={inView ? { opacity: 1, y: 0 } : {}}
                                  style={{
                                    transitionDelay: `${0.1 * idx + 0.9}s`,
                                  }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Project Link */}
                          {exp.projectUrl && exp.projectName && (
                            <motion.div
                              className="mt-8 border-t border-white/10 pt-6"
                              initial={{ opacity: 0, y: 20 }}
                              animate={inView ? { opacity: 1, y: 0 } : {}}
                              transition={{ delay: 1.2, duration: 0.5 }}
                            >
                              <motion.a
                                href={exp.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-300"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span>Check out {exp.projectName}</span>
                                <ChevronRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </motion.a>
                            </motion.div>
                          )}
                        </div>
                      </LiquidCard>
                    </motion.div>
                  </div>

                  {/* Spacer for timeline */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
