"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaMapMarkerAlt, 
  FaGraduationCap,
  FaCode,
  FaHeart,
  FaRocket,
  FaFileAlt
} from "react-icons/fa";
import { AnimatedSocialButton } from "./AnimatedSocialButton";

// Custom hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = (_e?: UIEvent) => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile, { passive: true });
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

interface AboutStat {
  number: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface AboutHighlight {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

export function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth scroll animations - disabled on mobile for performance
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  
  // Spring animations for smoother feel - disabled on mobile
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });

  const [isHovering, setIsHovering] = useState(false);

  const stats: AboutStat[] = [
    {
      number: "10+",
      label: "Projects Built",
      icon: <FaCode className="w-6 h-6" />,
      color: "from-blue-400 to-cyan-500"
    },
    {
      number: "5+",
      label: "Years Coding",
      icon: <FaRocket className="w-6 h-6" />,
      color: "from-purple-400 to-pink-500"
    },
    {
      number: "2+",
      label: "Years of Experience",
      icon: <FaGraduationCap className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500"
    },
    {
      number: "∞",
      label: "Passion for Engineering",
      icon: <FaHeart className="w-6 h-6" />,
      color: "from-red-400 to-orange-500"
    }
  ];

  const highlights: AboutHighlight[] = [
    {
      title: "Full-Stack Development",
      description: "Experienced in building end-to-end solutions with modern web technologies, from responsive frontends to scalable backends.",
      icon: <FaCode className="w-8 h-8" />,
      gradient: "from-blue-500 via-purple-500 to-pink-500"
    },
    {
      title: "Problem Solver",
      description: "Passionate about tackling complex challenges and creating innovative solutions that make a real impact to end users.",
      icon: <FaRocket className="w-8 h-8" />,
      gradient: "from-green-500 via-teal-500 to-cyan-500"
    },
    {
      title: "Continuous Experimenter",
      description: "Always exploring new technologies and methodologies to stay at the forefront of software engineering in the age of AI.",
      icon: <FaGraduationCap className="w-8 h-8" />,
      gradient: "from-orange-500 via-red-500 to-pink-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.1 : 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: isMobile ? 20 : 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: isMobile ? 200 : 100,
        damping: isMobile ? 30 : 20,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { scale: isMobile ? 0.95 : 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: isMobile ? 200 : 150,
        damping: isMobile ? 30 : 20,
      },
    },
  } as const;

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="min-h-screen py-24 md:pt-32 pb-36 px-6 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div ref={ref} className="absolute inset-0" />
      
      {/* Animated Background Elements - disabled on mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl will-change-transform transform-gpu"
            style={{ y: springY, opacity }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            whileInView={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl will-change-transform transform-gpu"
            style={{ y: springY, opacity }}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            whileInView={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          />
        </>
      )}

      {/* Floating Orbs - disabled on mobile */}
      {(
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 will-change-transform transform-gpu"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
              whileInView={{ x: [0, 100, 0], y: [0, -100, 0], opacity: [0.2, 0.8, 0.2] }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8"
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            transition={{ duration: 0.2 }}
          >
            <FaMapMarkerAlt className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-medium">Singapore</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            About{" "}
            <motion.span 
              className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent"
              animate={!isMobile ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
              whileInView={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            >
              Me
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Photo Section */}
          <motion.div
            className="relative flex justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              onMouseEnter={!isMobile ? () => setIsHovering(true) : undefined}
              onMouseLeave={!isMobile ? () => setIsHovering(false) : undefined}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background Ring - disabled on mobile */}
              {(
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 opacity-20 blur-xl will-change-transform transform-gpu"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileInView={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                />
              )}
              
              {/* Profile Photo Container */}
              <motion.div
                className="relative w-96 h-96 md:w-[32rem] md:h-[32rem] rounded-full overflow-hidden border-4 border-white/20 bg-gradient-to-br from-gray-800 to-gray-900 will-change-transform transform-gpu"
                style={!isMobile ? { scale: springScale } : {}}
                whileHover={!isMobile ? {
                  borderColor: "rgba(255,255,255,0.4)",
                } : {}}
                transition={{ duration: 0.3 }}
              >
                {/* Profile photo */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-400/20 flex items-center justify-center">
                  <motion.img
                    src="/images/photos/limyuquan.jpg"
                    alt="Yu Quan Lim - Profile Photo"
                    className="w-full h-full object-cover rounded-full will-change-transform transform-gpu"
                    animate={!isMobile && isHovering ? { rotateY: 180, scale: 1.1 } : { rotateY: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                    loading="lazy"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px"
                    }}
                  />
                </div>
                
                {/* Overlay Effect - disabled on mobile */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    animate={{
                      opacity: isHovering ? 0.8 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* About Text Section */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div
              className="space-y-6"
              variants={itemVariants}
            >
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                variants={itemVariants}
              >
                Hello, I&apos;m Yu Quan!
              </motion.h3>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                I&apos;m a passionate <span className="text-cyan-400 font-semibold">Full-Stack Software Engineer</span> and 
                <span className="text-purple-400 font-semibold"> Computer Science student</span> at the National University of Singapore.
              </motion.p>
              
              <motion.p 
                className="md:mt-10 text-lg md:text-xl text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                I love crafting digital experiences that blend beautiful design with robust functionality. 
                From responsive and beautiful web applications to scalable and performant backend systems, I&apos;m always excited to tackle new challenges 
                and learn emerging technologies.
              </motion.p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-8"
              variants={itemVariants}
            >
              <AnimatedSocialButton
                icon={<FaLinkedin className="w-5 h-5" />}
                text="LinkedIn Profile"
                variant="primary"
                href="https://linkedin.com/in/limyuquan"
              />
              
              <AnimatedSocialButton
                icon={<FaGithub className="w-5 h-5" />}
                text="GitHub Profile"
                variant="secondary"
                href="https://github.com/limyuquan"
              />
              
              <AnimatedSocialButton
                icon={<FaFileAlt className="w-5 h-5" />}
                text="Resume"
                variant="accent"
                href="/files/limyuquan-resume.pdf"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={cardVariants}
              whileHover={!isMobile ? { y: -10 } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center overflow-hidden"
                whileHover={!isMobile ? {
                  borderColor: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.1)",
                } : {}}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                <motion.div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} mb-4 will-change-transform transform-gpu`}
                  whileHover={!isMobile ? { scale: 1.1, rotate: 360 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white">{stat.icon}</span>
                </motion.div>
                
                <motion.h4
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {stat.number}
                </motion.h4>
                
                <motion.p
                  className="text-gray-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={cardVariants}
              whileHover={!isMobile ? { y: -5 } : {}}
            >
              <motion.div
                className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 h-full overflow-hidden"
                whileHover={!isMobile ? {
                  borderColor: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.1)",
                } : {}}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${highlight.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${highlight.gradient} mb-6 text-white will-change-transform transform-gpu`}
                  whileHover={!isMobile ? { scale: 1.1, rotate: 360 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  {highlight.icon}
                </motion.div>
                
                <motion.h4
                  className="text-xl font-bold text-white mb-4"
                  variants={itemVariants}
                >
                  {highlight.title}
                </motion.h4>
                
                <motion.p
                  className="text-gray-400 leading-relaxed"
                  variants={itemVariants}
                >
                  {highlight.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
} 