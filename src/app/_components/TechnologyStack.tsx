"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useMemo, useEffect } from "react";
import { 
  SiPython, 
  SiGo, 
  SiOpenjdk, 
  SiPhp, 
  SiFastapi, 
  SiDjango, 
  SiFlask, 
  SiLaravel,
  SiReact, 
  SiNextdotjs, 
  SiSvelte, 
  SiTypescript, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiTailwindcss,
  SiPostgresql, 
  SiMysql, 
  SiAwslambda, 
  SiAmazons3, 
  SiDocker,
  SiGit, 
  SiGitlab, 
  SiJira, 
  SiConfluence, 
  SiPytest, 
  SiJest
} from "react-icons/si";

interface TechCategory {
  title: string;
  technologies: Technology[];
  gradient: string;
}

interface Technology {
  name: string;
  icon: React.ReactElement;
  description: string;
}

// TechCard component to handle individual card hover state
function TechCard({ tech, category, techIndex, inView }: { 
  tech: Technology; 
  category: TechCategory; 
  techIndex: number; 
  inView: boolean; 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const techVariants = {
    hidden: { scale: 0, rotateY: 180, opacity: 0 },
    visible: {
      scale: 1,
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const iconVariants = {
    rest: { 
      rotate: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      variants={techVariants}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        z: 50
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 h-32 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
        }}
        whileHover={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 100%)`,
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          initial={false}
        />
        
        {/* Glowing border effect */}
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
          initial={false}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <motion.div 
            className="mb-2 flex items-center justify-center w-12 h-12"
            variants={iconVariants}
            animate={isHovered ? "hover" : "rest"}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {tech.icon}
            </div>
          </motion.div>
          <motion.h4 
            className="text-sm font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300"
            whileHover={{ scale: 1.05 }}
          >
            {tech.name}
          </motion.h4>
          <motion.p 
            className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            {tech.description}
          </motion.p>
        </div>

        {/* Corner accent */}
        <motion.div
          className={`absolute top-0 right-0 w-4 h-4 bg-gradient-to-br ${category.gradient} rounded-bl-lg opacity-60`}
          initial={{ scale: 0, rotate: 180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.1 * techIndex, duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function TechnologyStack() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const techStack: TechCategory[] = [
    {
      title: "Backend",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      technologies: [
        { name: "Python", icon: <SiPython className="w-full h-full text-[#3776AB]" />, description: "Versatile programming language" },
        { name: "Go", icon: <SiGo className="w-full h-full text-[#00ADD8]" />, description: "Fast and efficient language" },
        { name: "Java", icon: <SiOpenjdk className="w-full h-full text-[#ED8B00]" />, description: "Enterprise programming language" },
        { name: "PHP", icon: <SiPhp className="w-full h-full text-[#777BB4]" />, description: "Server-side scripting language" },
        { name: "FastAPI", icon: <SiFastapi className="w-full h-full text-[#009688]" />, description: "Modern Python web framework" },
        { name: "Django", icon: <SiDjango className="w-full h-full text-[#092E20]" />, description: "High-level Python framework" },
        { name: "Flask", icon: <SiFlask className="w-full h-full text-[#000000]" />, description: "Lightweight Python framework" },
        { name: "Laravel", icon: <SiLaravel className="w-full h-full text-[#FF2D20]" />, description: "Elegant PHP framework" },
      ]
    },
    {
      title: "Frontend",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      technologies: [
        { name: "React", icon: <SiReact className="w-full h-full text-[#61DAFB]" />, description: "Component-based UI library" },
        { name: "Next.js", icon: <SiNextdotjs className="w-full h-full text-white" />, description: "Full-stack React framework" },
        { name: "Svelte", icon: <SiSvelte className="w-full h-full text-[#FF3E00]" />, description: "Compile-time framework" },
        { name: "TypeScript", icon: <SiTypescript className="w-full h-full text-[#3178C6]" />, description: "Type-safe JavaScript" },
        { name: "JavaScript", icon: <SiJavascript className="w-full h-full text-[#F7DF1E]" />, description: "Dynamic programming language" },
        { name: "HTML", icon: <SiHtml5 className="w-full h-full text-[#E34F26]" />, description: "Markup language for web" },
        { name: "CSS", icon: <SiCss3 className="w-full h-full text-[#1572B6]" />, description: "Styling language for web" },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-full h-full text-[#06B6D4]" />, description: "Utility-first CSS framework" },
      ]
    },
    
    {
      title: "Database & Cloud",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      technologies: [
        { name: "PostgreSQL", icon: <SiPostgresql className="w-full h-full text-[#4169E1]" />, description: "Advanced relational database" },
        { name: "MySQL", icon: <SiMysql className="w-full h-full text-[#4479A1]" />, description: "Popular relational database" },
        { name: "AWS Lambda", icon: <SiAwslambda className="w-full h-full text-[#FF9900]" />, description: "Serverless compute service" },
        { name: "AWS S3", icon: <SiAmazons3 className="w-full h-full text-[#569A31]" />, description: "Object storage service" },
        { name: "Docker", icon: <SiDocker className="w-full h-full text-[#2496ED]" />, description: "Containerization platform" },
      ]
    },
    {
      title: "Tools & Others",
      gradient: "from-purple-500 via-indigo-500 to-blue-500",
      technologies: [
        { name: "Git", icon: <SiGit className="w-full h-full text-[#F05032]" />, description: "Version control system" },
        { name: "GitLab CI", icon: <SiGitlab className="w-full h-full text-[#FC6D26]" />, description: "Continuous integration" },
        { name: "Jira", icon: <SiJira className="w-full h-full text-[#0052CC]" />, description: "Project management tool" },
        { name: "Confluence", icon: <SiConfluence className="w-full h-full text-white" />, description: "Team collaboration wiki" },
        { name: "Pytest", icon: <SiPytest className="w-full h-full text-[#0A9EDC]" />, description: "Python testing framework" },
        { name: "Jest", icon: <SiJest className="w-full h-full text-[#C21325]" />, description: "JavaScript testing framework" },
      ]
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

  const categoryVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const FloatingParticles = () => {
    const [isClient, setIsClient] = useState(false);
    
    const particles = useMemo(() => 
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    , []);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return null;
    }

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.section
      id="tech-stack"
      ref={ref}
      className="min-h-screen py-20 px-6 relative"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="text-center mb-20" variants={categoryVariants}>
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6"
            transition={{ type: "spring", stiffness: 300 }}
          >
            Technology
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Stack
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Cutting-edge tools and technologies that power exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {techStack.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="relative"
              variants={categoryVariants}
            >
              {/* Category Header */}
              <motion.div 
                className="text-center mb-8"
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3 
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-3 inline-block`}
                  whileHover={{ 
                    backgroundSize: "200% 200%",
                    backgroundPosition: "right center"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {category.title}
                </motion.h3>
                <motion.div 
                  className={`h-1 w-16 mx-auto bg-gradient-to-r ${category.gradient} rounded-full`}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.2 + categoryIndex * 0.1, duration: 0.6 }}
                />
              </motion.div>

              {/* Technologies Grid */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                variants={categoryVariants}
              >
                {category.technologies.map((tech, techIndex) => (
                  <TechCard
                    key={techIndex}
                    tech={tech}
                    category={category}
                    techIndex={techIndex}
                    inView={inView}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          className="mt-20 text-center"
          variants={categoryVariants}
        >
          <motion.div
            className="inline-flex items-center gap-6 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-full px-8 py-4"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-white font-medium text-lg">
              Always learning and exploring new technologies
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-2xl"
            >
              🚀
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 