"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrls?: string[];
  status: "completed" | "in-progress" | "planned" | "deprecated";
  gradient: string;
}

export function PersonalProjects() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const intervalRefs = useRef<Record<number, NodeJS.Timeout>>({});
  const [preloadedProjects, setPreloadedProjects] = useState<Set<number>>(new Set());

  // Function to preload images
  const preloadImages = (imageUrls: string[], projectIndex: number) => {
    if (preloadedProjects.has(projectIndex)) return;
    
    imageUrls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
    
    setPreloadedProjects(prev => new Set(prev).add(projectIndex));
  };

  const projects: Project[] = [
    {
      title: "Multitwitcher",
      description: "Multitwitcher is a platform that allows you to watch multiple Twitch streamers at once, or switch between them with a single click. This is the best way to view live-streamed events from multiple POVs",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Twitch API", "Vercel"],
      features: [
        "Watch multiple Twitch streamers at once",
        "Customisable stream windows",
        "Real time chat",
        "Custom group themes"
      ],
      githubUrl: "https://github.com/limyuquan/multitwitch",
      liveUrl: "https://multitwitcher.vercel.app/",
      imageUrls: ["/images/projects/multitwitcher1.png", "/images/projects/multitwitcher.png"],
      status: "completed",
      gradient: "from-purple-500 via-pink-500 to-red-500"
    },
    {
      title: "Reflective Minds Journaling",
      description: "ReflectiveMinds is designed to provide users with a simple and intuitive platform to record their daily thoughts and experiences.",
      technologies: ["React", "Flask", "Javascript", "Python", "MySQL", "Vercel", "Heroku"],
      features: [
        "AI-powered journal prompt generation",
        "Journal entry creation, editing, and deletion",
        "Journal entries search, sorting and filtering",
        "Emotion-labeling, tagging, and templating",
        "Emotion visualization",
        "Achievement system"
      ],
      githubUrl: "https://github.com/limyuquan/orbital-reflectiveminds",
      imageUrls: ["/images/projects/journal.png", "/images/projects/journal1.png", "/images/projects/journal2.png", "/images/projects/journal3.png", "/images/projects/journal4.png"],
      status: "completed",
      gradient: "from-green-400 via-blue-500 to-purple-600"
    }
  ];

  useEffect(() => {
    return () => {
      // cleanup any stray intervals on unmount
      Object.values(intervalRefs.current).forEach(clearInterval);
      intervalRefs.current = {} as Record<number, NodeJS.Timeout>;
    };
  }, []);

  // Preload all project images when section is in view
  useEffect(() => {
    if (inView) {
      projects.forEach((project, index) => {
        if (project.imageUrls && project.imageUrls.length > 0) {
          // Preload images with a slight delay to avoid blocking
          setTimeout(() => {
            preloadImages(project.imageUrls!, index);
          }, 100 * index);
        }
      });
    }
  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  } as const;

  const projectVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  } as const;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500";
      case "in-progress": return "bg-amber-500";
      case "planned": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string, liveUrl?: string) => {
    switch (status) {
      case "completed": return liveUrl ? "Live & Complete" : "Complete";
      case "in-progress": return "In Development";
      case "planned": return "Coming Soon";
      case "deprecated": return "Deprecated";
      default: return "Unknown";
    }
  };

  return (
    <motion.section
      id="projects"
      ref={ref}
      className="min-h-screen px-6 bg-black pb-20"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-24" variants={projectVariants}>
          <motion.h2 
            className="text-6xl md:text-8xl font-black mb-8 tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Featured
            <motion.span 
              className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Projects
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Innovative solutions crafted with passion and precision. Each project represents a unique challenge solved with cutting-edge technology and creative problem-solving.
          </motion.p>
        </motion.div>

        {/* Projects Showcase */}
        <div className="space-y-32 md:space-y-64">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                className="relative"
                variants={projectVariants}
                onHoverStart={() => {
                  setHoveredProject(index);
                  // Preload images on hover if not already preloaded
                  if (project.imageUrls && project.imageUrls.length > 0) {
                    preloadImages(project.imageUrls, index);
                  }
                  if (project.imageUrls && project.imageUrls.length > 1) {
                    const interval = setInterval(() => {
                      setCurrentImageIndex(prev => ({
                        ...prev,
                        [index]: ((prev[index] ?? 0) + 1) % project.imageUrls!.length
                      }));
                    }, 1500); // Change image every 1.5 seconds
                    
                    // Store interval in ref for cleanup
                    intervalRefs.current[index] = interval;
                  }
                }}
                onHoverEnd={() => {
                  setHoveredProject(null);
                  if (intervalRefs.current[index]) {
                    clearInterval(intervalRefs.current[index]);
                    delete intervalRefs.current[index];
                    // Reset to first image
                    setCurrentImageIndex(prev => ({
                      ...prev,
                      [index]: 0
                    }));
                  }
                }}
              >
                {/* Background Gradient Orb */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-10 blur-3xl rounded.full will-change-transform transform-gpu`}
                  animate={{
                    scale: hoveredProject === index ? 1.2 : 1,
                    opacity: hoveredProject === index ? 0.2 : 0.1,
                  }}
                  transition={{ duration: 0.6 }}
                />

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                  {/* Project Image */}
                  <motion.div
                    className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
                      {/* Status Badge */}
                      <motion.div
                        className={`absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-bold text-black z-10 ${getStatusColor(project.status)}`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {getStatusText(project.status, project.liveUrl)}
                      </motion.div>

                      {/* Project Image */}
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                        {project.imageUrls && project.imageUrls.length > 0 ? (
                          <motion.div
                            key={currentImageIndex[index] ?? 0}
                            className="w-full h-full relative"
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Image
                              src={project.imageUrls[currentImageIndex[index] ?? 0]!}
                              alt={`${project.title} screenshot ${(currentImageIndex[index] ?? 0) + 1}`}
                              fill
                              className="object-cover will-change-transform transform-gpu"
                              priority={index === 0 && (currentImageIndex[index] ?? 0) === 0}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              quality={90}
                            />
                          </motion.div>
                        ) : (
                          <>
                            <motion.div
                              className={`w-32 h-32 bg-gradient-to-r ${project.gradient} rounded-full opacity-30 will-change-transform transform-gpu`}
                              animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              whileInView={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                className="text-6xl opacity-40 will-change-transform transform-gpu"
                                animate={{
                                  rotateY: hoveredProject === index ? 360 : 0,
                                }}
                                transition={{ duration: 0.6 }}
                              >
                                🚀
                              </motion.div>
                            </div>
                          </>
                        )}
                        
                        {/* Overlay on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex gap-4">
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 bg.white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span>📱</span> View Code
                            </motion.a>
                            
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} rounded-full text-white font-medium transition-all`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span>🚀</span> Live Demo
                              </motion.a>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project Content */}
                  <motion.div
                    className={`space-y-8 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    {/* Project Title */}
                    <motion.h3 
                      className="text-4xl md:text-5xl font-bold text-white leading-tight"
                      whileHover={{ scale: 1.02 }}
                    >
                      {project.title}
                    </motion.h3>

                    {/* Project Description */}
                    <motion.p 
                      className="text-lg text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Key Features */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                    >
                      <h4 className="text-xl font-bold text-white mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3 group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.2 + idx * 0.1, duration: 0.5 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              className={`w-2 h-2 bg-gradient-to-r ${project.gradient} rounded-full mt-2 flex-shrink-0 will-change-transform transform-gpu`}
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
                    >
                      <h4 className="text-xl font-bold text-white">Tech Stack</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, idx) => (
                          <motion.span
                            key={idx}
                            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/20 hover:border-white/40 transition-colors will-change-transform transform-gpu"
                            whileHover={{ 
                              scale: 1.05, 
                              y: -2,
                              backgroundColor: "rgba(255, 255, 255, 0.15)"
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-32 text-center"
          variants={projectVariants}
        >
          <motion.div
            className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-8 py-6 border border-white/20"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(139, 92, 246, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full will-change-transform transform-gpu"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileInView={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            />
            <span className="text-lg font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              More innovative projects in development
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 