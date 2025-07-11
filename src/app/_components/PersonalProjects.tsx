"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  status: "completed" | "in-progress" | "planned";
}

export function PersonalProjects() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const projects: Project[] = [
    {
      title: "AI-Powered Task Manager",
      description: "Smart productivity app with AI-driven insights and automation",
      longDescription: "A comprehensive task management application that uses machine learning to predict task completion times, suggest optimal scheduling, and automate recurring workflows.",
      technologies: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "PostgreSQL", "Tailwind CSS"],
      features: [
        "AI-powered task prioritization",
        "Smart scheduling recommendations",
        "Automated workflow triggers",
        "Real-time collaboration",
        "Advanced analytics dashboard"
      ],
      githubUrl: "https://github.com/username/ai-task-manager",
      liveUrl: "https://ai-task-manager.vercel.app",
      status: "completed"
    },
    {
      title: "Crypto Portfolio Tracker",
      description: "Real-time cryptocurrency portfolio management with advanced analytics",
      longDescription: "A sophisticated crypto portfolio tracker that provides real-time price updates, profit/loss analysis, and market insights with beautiful data visualizations.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "WebSocket"],
      features: [
        "Real-time price tracking",
        "Portfolio performance analytics",
        "Price alerts and notifications",
        "Historical data visualization",
        "Multi-exchange support"
      ],
      githubUrl: "https://github.com/username/crypto-tracker",
      liveUrl: "https://crypto-tracker-demo.com",
      status: "completed"
    },
    {
      title: "Social Media Analytics Platform",
      description: "Comprehensive social media analytics with sentiment analysis",
      longDescription: "An enterprise-grade platform for analyzing social media performance across multiple platforms with AI-powered sentiment analysis and competitor tracking.",
      technologies: ["Vue.js", "Python", "FastAPI", "Redis", "PostgreSQL", "Docker"],
      features: [
        "Multi-platform integration",
        "Sentiment analysis",
        "Competitor tracking",
        "Custom reporting",
        "API rate limiting"
      ],
      githubUrl: "https://github.com/username/social-analytics",
      status: "in-progress"
    },
    {
      title: "Blockchain Voting System",
      description: "Secure and transparent voting system built on blockchain",
      longDescription: "A decentralized voting platform ensuring transparency, security, and immutability using blockchain technology with a user-friendly interface.",
      technologies: ["React", "Solidity", "Web3.js", "Ethereum", "IPFS", "MetaMask"],
      features: [
        "Blockchain-based security",
        "Anonymous voting",
        "Real-time results",
        "Audit trail",
        "Mobile-responsive design"
      ],
      githubUrl: "https://github.com/username/blockchain-voting",
      status: "planned"
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

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-yellow-500";
      case "planned": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      case "planned": return "Planned";
      default: return "Unknown";
    }
  };

  return (
    <motion.section
      id="projects"
      ref={ref}
      className="min-h-screen py-20 px-6 bg-white dark:bg-black"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-20" variants={projectVariants}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-black dark:text-white">
            Personal
            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Innovative projects showcasing creativity, technical skills, and problem-solving abilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={projectVariants}
            >
              <motion.div
                className="bg-gray-50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 h-full"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {getStatusText(project.status)}
                  </motion.div>
                  
                  <div className="flex gap-3">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-lg">📱</span>
                    </motion.a>
                    
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1, rotate: -360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-lg">🚀</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                  {project.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.longDescription}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-black dark:text-white mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="text-gray-700 dark:text-gray-300 flex items-start text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 * idx, duration: 0.3 }}
                      >
                        <span className="text-orange-500 dark:text-orange-400 mr-3 mt-1">•</span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-full text-xs text-gray-700 dark:text-gray-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <motion.button
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                  
                  {project.liveUrl && (
                    <motion.button
                      className="px-6 py-3 border border-gray-300 dark:border-white/30 text-black dark:text-white rounded-lg hover:border-gray-500 dark:hover:border-white/60 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          variants={projectVariants}
        >
          <motion.div
            className="inline-flex items-center gap-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-8 py-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-500 dark:text-purple-400 font-medium">
              More projects coming soon...
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 