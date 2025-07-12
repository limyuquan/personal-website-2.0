"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSocialButtonProps {
  icon: ReactNode;
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}

const variantStyles = {
  primary: {
    background: "from-blue-600 to-blue-700",
    hoverBackground: "from-blue-400 to-blue-500",
    border: "",
  },
  secondary: {
    background: "from-gray-800 to-gray-900",
    hoverBackground: "from-gray-600 to-gray-700",
    border: "border border-gray-700",
  },
  accent: {
    background: "from-purple-600 to-purple-700",
    hoverBackground: "from-purple-400 to-purple-500",
    border: "",
  },
};

export function AnimatedSocialButton({
  icon,
  text,
  href,
  onClick,
  variant = "primary",
  className = "",
}: AnimatedSocialButtonProps) {
  const styles = variantStyles[variant];

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const backgroundVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { opacity: 1, scale: 1 },
  };

  const contentVariants = {
    initial: { x: 0 },
    hover: { x: 3 },
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { rotate: 30, scale: 1.05 },
  };

  const Component = href ? motion.a : motion.div;
  const componentProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <Component
        className={`flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r ${styles.background} text-white rounded-full cursor-pointer relative ${styles.border}`}
        variants={buttonVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
        {...componentProps}
      >
        {/* Hover background overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${styles.hoverBackground} rounded-full opacity-0`}
          variants={backgroundVariants}
          transition={{ duration: 0.4 }}
        />
        
        {/* Content container */}
        <motion.div
          className="relative z-10 flex items-center gap-3"
          variants={contentVariants}
          transition={{ duration: 0.3 }}
        >
          {/* Animated icon */}
          <motion.div
            variants={iconVariants}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
          
          {/* Text */}
          <motion.span
            className="font-semibold"
            variants={{
              initial: { opacity: 1 },
              hover: { opacity: 1 },
            }}
          >
            {text}
          </motion.span>
        </motion.div>
      </Component>
    </motion.div>
  );
} 