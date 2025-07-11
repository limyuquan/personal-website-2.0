"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LiquidCard } from "./LiquidCard";

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export function WorkExperience() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const experiences: ExperienceItem[] = [
    {
      company: "Tech Innovation Corp",
      position: "Senior Fullstack Engineer",
      duration: "2022 - Present",
      description: [
        "Led development of scalable web applications serving 100K+ users",
        "Architected microservices infrastructure reducing load times by 40%",
        "Mentored junior developers and established coding best practices",
        "Collaborated with cross-functional teams to deliver product features"
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"]
    },
    {
      company: "Digital Solutions LLC",
      position: "Fullstack Developer",
      duration: "2020 - 2022",
      description: [
        "Built responsive web applications with modern React and Vue.js",
        "Developed RESTful APIs and GraphQL endpoints",
        "Implemented automated testing and CI/CD pipelines",
        "Optimized database queries improving performance by 60%"
      ],
      technologies: ["Vue.js", "Express.js", "Python", "Docker", "MongoDB"]
    },
    {
      company: "StartupX",
      position: "Frontend Developer",
      duration: "2019 - 2020",
      description: [
        "Created intuitive user interfaces for mobile and web platforms",
        "Collaborated with designers to implement pixel-perfect designs",
        "Integrated third-party APIs and payment processing systems",
        "Contributed to open-source projects and company tech blog"
      ],
      technologies: ["React", "Redux", "SASS", "Jest", "Figma"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      id="experience"
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gray-50 dark:bg-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-black dark:text-white">
            Work
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building exceptional digital products with cutting-edge technologies
          </p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />
              
              {/* Timeline dot */}
              <motion.div
                className="absolute left-6 top-8 w-4 h-4 bg-black dark:bg-white rounded-full hidden md:block"
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />

              <LiquidCard className="md:ml-20">
                <div className="p-8 bg-white dark:bg-black/50 rounded-2xl border border-gray-200 dark:border-white/10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                        {exp.position}
                      </h3>
                      <h4 className="text-xl text-blue-500 dark:text-blue-400 mb-2">
                        {exp.company}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">{exp.duration}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="text-gray-700 dark:text-gray-300 flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 * idx, duration: 0.5 }}
                      >
                        <span className="text-blue-500 dark:text-blue-400 mr-3 mt-2">•</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </LiquidCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 