"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import Image from "next/image";

// Custom hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile, { passive: true });
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}

// Animated dot grid background
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

// Animated floating accent shapes with blue/purple colors
function FloatingAccents({ isMobile }: { isMobile: boolean }) {
  if (isMobile) return null;

  const shapes = [
    { size: 120, color: "#60A5FA", x: "10%", y: "20%", delay: 0 }, // blue-400
    { size: 80, color: "#A78BFA", x: "85%", y: "15%", delay: 1.5 }, // purple-400
    { size: 60, color: "#F472B6", x: "75%", y: "70%", delay: 0.8 }, // pink-400
    { size: 40, color: "#22D3EE", x: "5%", y: "75%", delay: 2.2 }, // cyan-400
    { size: 100, color: "#A78BFA", x: "60%", y: "85%", delay: 1.2 }, // purple-400
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full will-change-transform transform-gpu"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `radial-gradient(circle at 30% 30%, ${shape.color}40, ${shape.color}10)`,
            border: `1px solid ${shape.color}30`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated line decorations with blue/purple colors
function DecorativeLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Vertical line */}
      <motion.div
        className="absolute left-[15%] top-0 w-px h-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.3), transparent)" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      {/* Horizontal line */}
      <motion.div
        className="absolute left-0 top-[30%] w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(34, 211, 238, 0.2), transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
      />
    </div>
  );
}

// 3D Flip Card Profile Picture
function ProfilePicture({ isMobile }: { isMobile: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ perspective: "1000px" }}
    >
      {/* Outer ring decoration */}
      <motion.div
        className="absolute -inset-4 rounded-full border-2 border-dashed will-change-transform transform-gpu"
        style={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Second ring */}
      <motion.div
        className="absolute -inset-8 rounded-full border will-change-transform transform-gpu"
        style={{ borderColor: "rgba(34, 211, 238, 0.2)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* 3D Flip Card Container */}
      <motion.div
        className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer"
        onMouseEnter={() => !isMobile && setIsFlipped(true)}
        onMouseLeave={() => !isMobile && setIsFlipped(false)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Inner - this rotates */}
        <motion.div
          className="relative w-full h-full will-change-transform transform-gpu"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Gradient border */}
            <div
              className="absolute inset-0 rounded-full p-[3px]"
              style={{
                background: "conic-gradient(from 0deg, #22D3EE, #8B5CF6, #EC4899, #22D3EE)",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                <Image
                  src="/images/photos/limyuquan.jpg"
                  alt="Yu Quan Lim - Front"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: "0 0 60px rgba(139, 92, 246, 0.3), 0 0 120px rgba(34, 211, 238, 0.2)",
              }}
            />
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Gradient border - different angle for back */}
            <div
              className="absolute inset-0 rounded-full p-[3px]"
              style={{
                background: "conic-gradient(from 180deg, #EC4899, #8B5CF6, #22D3EE, #EC4899)",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                <Image
                  src="/images/photos/limyuquan.jpg"
                  alt="Yu Quan Lim - Back"
                  fill
                  className="object-cover"
                  style={{ transform: "scaleX(-1)" }} // Mirror the image for visual difference
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Glow effect - different colors for back */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: "0 0 60px rgba(236, 72, 153, 0.3), 0 0 120px rgba(139, 92, 246, 0.2)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating accent dots */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-purple-500"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 -right-8 w-3 h-3 rounded-full bg-pink-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </>
      )}
    </motion.div>
  );
}

// Simple social link button without magnetic effect
function SocialButton({
  href,
  icon,
  label,
  accentColor,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  accentColor: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative flex items-center gap-3 px-6 py-4 rounded-full border transition-all duration-300"
      style={{
        borderColor: isHovered ? accentColor : "rgba(255,255,255,0.15)",
        backgroundColor: isHovered ? `${accentColor}15` : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Icon */}
      <motion.span
        className="text-xl transition-colors duration-300"
        style={{ color: isHovered ? accentColor : "white" }}
        animate={isHovered ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
        transition={{ duration: 0.4 }}
      >
        {icon}
      </motion.span>

      {/* Label */}
      <span
        className="font-medium transition-colors duration-300"
        style={{ color: isHovered ? accentColor : "white" }}
      >
        {label}
      </span>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-3 left-6 right-6 h-px origin-left"
        style={{ backgroundColor: accentColor }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

// Animated text reveal
function AnimatedText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

export function AboutMe() {
  const isMobile = useIsMobile();
  const [ref] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const socialLinks = [
    {
      href: "https://linkedin.com/in/limyuquan",
      icon: <FaLinkedin />,
      label: "LinkedIn",
      color: "#60A5FA", // blue-400
    },
    {
      href: "https://github.com/limyuquan",
      icon: <FaGithub />,
      label: "GitHub",
      color: "#A78BFA", // purple-400
    },
    {
      href: "/files/limyuquan-resume.pdf",
      icon: <FaFileAlt />,
      label: "Resume",
      color: "#F472B6", // pink-400
    },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen py-24 md:py-32 px-6 relative overflow-hidden bg-black"
    >
      {/* Background elements */}
      <DotGrid />
      <FloatingAccents isMobile={isMobile} />
      <DecorativeLines />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <AnimatedText delay={0.1}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              About{" "}
              <motion.span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #22D3EE, #8B5CF6, #EC4899)",
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Me
              </motion.span>
            </h2>
          </AnimatedText>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Profile picture */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            <ProfilePicture isMobile={isMobile} />
          </div>

          {/* Right side - Content */}
          <div className="space-y-8 order-2 lg:order-2">
            <AnimatedText delay={0.2}>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Hello, I&apos;m{" "}
                <span className="text-cyan-400">Yu Quan</span>
              </h3>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                A{" "}
                <span className="text-white font-medium">
                  Full-Stack Software Engineer
                </span>{" "}
                based in Singapore. I build digital experiences that are both
                beautiful and functional.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                Currently pursuing{" "}
                <span className="text-white font-medium">Computer Science</span>{" "}
                at the National University of Singapore, with a passion for
                crafting elegant solutions to complex problems.
              </p>
            </AnimatedText>

            {/* Social links */}
            <AnimatedText delay={0.5}>
              <div className="flex flex-wrap gap-4 pt-6">
                {socialLinks.map((link) => (
                  <SocialButton
                    key={link.label}
                    href={link.href}
                    icon={link.icon}
                    label={link.label}
                    accentColor={link.color}
                  />
                ))}
              </div>
            </AnimatedText>
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="mt-24 md:mt-32 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#22D3EE", "#8B5CF6", "#EC4899"][i],
                }}
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
