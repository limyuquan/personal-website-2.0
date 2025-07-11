"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LiquidCard } from "./LiquidCard";

interface TechCategory {
  title: string;
  technologies: Technology[];
}

interface Technology {
  name: string;
  level: number; // 1-5 proficiency level
  icon: string;
}

export function TechnologyStack() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const techStack: TechCategory[] = [
    {
      title: "Frontend",
      technologies: [
        { name: "React", level: 5, icon: "⚛️" },
        { name: "Next.js", level: 5, icon: "▲" },
        { name: "TypeScript", level: 5, icon: "🔷" },
        { name: "Tailwind CSS", level: 5, icon: "🎨" },
        { name: "Vue.js", level: 4, icon: "💚" },
        { name: "Framer Motion", level: 4, icon: "🎭" },
      ]
    },
    {
      title: "Backend",
      technologies: [
        { name: "Node.js", level: 5, icon: "🟢" },
        { name: "Python", level: 4, icon: "🐍" },
        { name: "Express.js", level: 5, icon: "🚂" },
        { name: "tRPC", level: 4, icon: "🔗" },
        { name: "GraphQL", level: 4, icon: "🔺" },
        { name: "REST APIs", level: 5, icon: "🌐" },
      ]
    },
    {
      title: "Database & Cloud",
      technologies: [
        { name: "PostgreSQL", level: 4, icon: "🐘" },
        { name: "MongoDB", level: 4, icon: "🍃" },
        { name: "Redis", level: 3, icon: "🔴" },
        { name: "AWS", level: 4, icon: "☁️" },
        { name: "Docker", level: 4, icon: "🐳" },
        { name: "Vercel", level: 5, icon: "⚡" },
      ]
    },
    {
      title: "Tools & Others",
      technologies: [
        { name: "Git", level: 5, icon: "📝" },
        { name: "Webpack", level: 4, icon: "📦" },
        { name: "Jest", level: 4, icon: "🧪" },
        { name: "Figma", level: 4, icon: "🎭" },
        { name: "Linux", level: 4, icon: "🐧" },
        { name: "CI/CD", level: 4, icon: "🔄" },
      ]
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
  };

  const categoryVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const techVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const renderProficiencyDots = (level: number) => {
    return (
      <div className="flex gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < level ? "bg-blue-500 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"
            }`}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.section
      id="tech-stack"
      ref={ref}
      className="min-h-screen py-20 px-6 bg-white dark:bg-black"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" variants={categoryVariants}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-black dark:text-white">
            Tech
            <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modern technologies and tools I use to build exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {techStack.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="space-y-6"
              variants={categoryVariants}
            >
              <h3 className="text-3xl font-bold text-black dark:text-white mb-8">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    variants={techVariants}
                  >
                    <LiquidCard>
                      <div className="p-6 text-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
                        <div className="text-3xl mb-3">{tech.icon}</div>
                        <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
                          {tech.name}
                        </h4>
                        {renderProficiencyDots(tech.level)}
                      </div>
                    </LiquidCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          variants={categoryVariants}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Always learning and exploring new technologies
          </p>
          <motion.div
            className="inline-flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 font-medium">
              Currently learning: AI/ML, Web3, Rust
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 