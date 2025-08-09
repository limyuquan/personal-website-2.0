"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LiquidCard } from "./LiquidCard";
import { CalendarIcon, BuildingOfficeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  highlights?: string[];
  logo?: string;
  projectUrl?: string;
  projectName?: string;
}

export function WorkExperience() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const experiences: ExperienceItem[] = [
    {
      company: "Razer",
      position: "Software Engineer (Cloud) Intern",
      duration: "Jan 2025 – Jun 2025",
      description: [
        "Enhanced internal Customer Service Dashboard with new features and backend optimizations using Django, streamlining support agent workflows",
        "Designed and implemented a greenfield Go scheduled job to automate gift-with-purchase processing, including warranty registration validation and automated license code delivery",
        "Developed internal systems for exporting and uploading product serial numbers to Amazon Transparency using Go, ensuring secure and efficient data transfers",
        "Upgraded internal Jira Syncing tool with Python, enabling seamless ticket synchronization and improving cross-team collaboration"
      ],
      highlights: ["Django Admin Dashboard", "Go Automation", "Backend Optimisations"],
      technologies: ["Python", "Go", "Django", "MySQL", "AWS S3"],
      logo: "/images/logos/razer.webp"
    },
    {
      company: "GovTech Singapore",
      position: "Software Engineer Intern",
      duration: "Jan 2024 – Nov 2024",
      description: [
        "Developed Career Kaki, a Ministry of Manpower initiative integrating LLMs to enhance Singaporean employability using agile methodologies",
        "Built responsive front-end interfaces with Svelte, TypeScript, and Tailwind CSS while developing scalable back-end APIs using Python and FastAPI",
        "Created end-to-end data pipeline with TypeScript for career-site scraping and Python for embedding generation and vector store indexing for RAG retrieval",
        "Developed GitLab CI/CD pipelines with automated testing, security (SAST & DAST) scans, and multi-environment deployments, enforcing code quality and reliability",
        "Integrated Google Analytics and built custom dashboards for user interaction metrics, enabling data-informed insights"
      ],
      highlights: ["Fullstack LLM Implementation", "RAG Pipeline", "CI/CD Pipeline"],
      technologies: ["Python", "FastAPI", "Svelte", "TypeScript", "JavaScript", "Tailwind CSS", "AWS Lambda", "AWS S3", "GitLab CI/CD", "Google Analytics"],
      logo: "/images/logos/govtech.gif",
      projectUrl: "https://careerkaki.gov.sg/",
      projectName: "Career Kaki"
    },
    {
      company: "Learna Systems Pte Ltd",
      position: "Software Engineer Intern",
      duration: "Feb 2023 – Jan 2024",
      description: [
        "Developed and maintained Ruiche, an educational social media platform for parents and educators",
        "Led design and implementation of paid subscription service, spearheading app monetisation strategy with exclusive content delivery",
        "Enhanced platform UI/UX resulting in increased user engagement and satisfaction",
        "Built scalable backend systems to support growing user base and feature expansion"
      ],
      highlights: ["EdTech Platform", "Monetization Strategy", "UX Enhancement"],
      technologies: ["React", "JavaScript", "PHP", "Laravel", "SQL"],
      logo: "/images/logos/ruiche.png"
    }
  ];

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
      className="min-h-screen py-32 px-6 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-blue-900/20" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-24" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <BuildingOfficeIcon className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Professional Journey</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Work
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences and leading innovative solutions 
            across diverse technology stacks and dynamic environments
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden lg:block" />
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={cardVariants}
              >
                {/* Timeline Node */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 top-12 hidden lg:block z-20"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 shadow-lg will-change-transform transform-gpu">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20" />
                  </div>
                </motion.div>

                {/* Experience Card */}
                <div className={`lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12`}>
                  {/* Card Content */}
                  <div className="lg:w-1/2 lg:px-8">
                    <motion.div
                      className="group"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LiquidCard className="relative overflow-hidden">
                        {/* Card Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative p-8 lg:p-10">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-8">
                            <div className="flex-1">
                              <motion.h3 
                                className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 will-change-transform transform-gpu"
                                layoutId={`position-${index}`}
                              >
                                {exp.position}
                              </motion.h3>
                              <div className="flex items-center gap-3 text-blue-400 text-lg font-semibold mb-2">
                                <BuildingOfficeIcon className="w-5 h-5" />
                                {exp.company}
                              </div>
                              <div className="flex items-center gap-2 text-gray-400">
                                <CalendarIcon className="w-4 h-4" />
                                {exp.duration}
                              </div>
                            </div>
                            
                            {/* Company Logo */}
                            {exp.logo && (
                              <motion.div
                                className="flex-shrink-0 ml-6"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                              >
                                <div className="relative w-16 h-16 lg:w-22 lg:h-22">
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300" />
                                  <div className="relative w-full h-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300">
                                    <img
                                      src={exp.logo}
                                      alt={`${exp.company} logo`}
                                      className="w-full h-full object-contain rounded-lg"
                                      onError={(e) => {
                                        // Fallback to company initial if logo fails to load
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLDivElement;
                                        if (fallback) fallback.style.display = 'flex';
                                      }}
                                    />
                                    <div className="absolute inset-0 hidden items-center justify-center text-2xl lg:text-3xl font-bold text.white bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                                      {exp.company.charAt(0)}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Highlights */}
                          {exp.highlights && (
                            <div className="mb-8">
                              <h4 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wider">
                                Key Achievements
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.highlights.map((highlight, idx) => (
                                  <motion.span
                                    key={idx}
                                    className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300 font-medium"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.1 * idx + 0.5, duration: 0.3 }}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {highlight}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Description */}
                          <div className="mb-8">
                            <ul className="space-y-4">
                              {exp.description.map((item, idx) => (
                                <motion.li
                                  key={idx}
                                  className="text-gray-300 flex items-start leading-relaxed"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={inView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ delay: 0.1 * idx + 0.7, duration: 0.5 }}
                                >
                                  <ChevronRightIcon className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="group-hover:text-white transition-colors duration-300">
                                    {item}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, idx) => (
                                <motion.span
                                  key={idx}
                                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 will-change-transform transform-gpu"
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  transition={{ duration: 0.2 }}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={inView ? { opacity: 1, y: 0 } : {}}
                                  style={{ transitionDelay: `${0.1 * idx + 0.9}s` }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Project Link */}
                          {exp.projectUrl && exp.projectName && (
                            <motion.div
                              className="mt-8 pt-6 border-t border-white/10"
                              initial={{ opacity: 0, y: 20 }}
                              animate={inView ? { opacity: 1, y: 0 } : {}}
                              transition={{ delay: 1.2, duration: 0.5 }}
                            >
                              <motion.a
                                href={exp.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span>Check out {exp.projectName}</span>
                                <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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