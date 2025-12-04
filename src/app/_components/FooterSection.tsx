"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaFileAlt,
} from "react-icons/fa";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
}

export function FooterSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const quickLinks: FooterLink[] = [
    { label: "Home", href: "#" },
    { label: "About Me", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Technology Stack", href: "#tech-stack" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/limyuquan",
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/limyuquan",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      href: "mailto:limyuquan02@gmail.com",
      label: "Email",
      color: "hover:text-purple-400",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-t from-black via-gray-900 to-gray-800 border-t border-white/10"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.h3
              className="text-2xl font-bold mb-4"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                Yu Quan Lim
              </span>
            </motion.h3>
            <motion.p
              className="text-gray-400 leading-relaxed mb-6 max-w-md"
              variants={itemVariants}
            >
              Full-Stack Software Engineer passionate about creating beautiful,
              functional, and impactful digital experiences. Currently studying
              Computer Science at NUS.
            </motion.p>
            <motion.div
              className="flex items-center gap-2 text-gray-400"
              variants={itemVariants}
            >
              <FaMapMarkerAlt className="w-4 h-4 text-cyan-400" />
              <span>Singapore</span>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h4
              className="text-lg font-semibold text-white mb-6"
              variants={itemVariants}
            >
              Quick Links
            </motion.h4>
            <motion.ul className="space-y-3" variants={itemVariants}>
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants}>
            <motion.h4
              className="text-lg font-semibold text-white mb-6"
              variants={itemVariants}
            >
              Let&apos;s Connect
            </motion.h4>
            <motion.div className="space-y-4 mb-6" variants={itemVariants}>
              <motion.a
                href="mailto:limyuquan02@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-200 group"
                whileHover={{ x: 4 }}
              >
                <motion.div
                  className="p-2 bg-white/5 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaEnvelope className="w-4 h-4" />
                </motion.div>
                <span className="text-sm">Get in touch</span>
              </motion.a>
              <motion.a
                href="/files/limyuquan-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 group"
                whileHover={{ x: 4 }}
              >
                <motion.div
                  className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500/20 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaFileAlt className="w-4 h-4" />
                </motion.div>
                <span className="text-sm">Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-3"
              variants={itemVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/5 rounded-lg text-gray-400 ${social.color} transition-all duration-200 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-4 border-t border-white/10"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-gray-400 text-sm flex items-center gap-2"
              variants={itemVariants}
            >
              © {new Date().getFullYear()} Lim Yu Quan. Made in Singapore.
            </motion.p>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-cyan-400 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-white/20 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <span className="text-sm">Back to top</span>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowUp className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}