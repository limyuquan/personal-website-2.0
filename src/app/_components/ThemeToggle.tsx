"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full p-1 transition-colors duration-300 bg-[rgb(var(--bg-card))] border border-[rgb(var(--border-primary))] hover:border-[rgb(var(--border-secondary))]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{
        backgroundColor: theme === "dark" ? "rgb(55 65 81)" : "rgb(229 231 235)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Toggle circle */}
      <motion.div
        className="w-5 h-5 rounded-full bg-[rgb(var(--text-primary))] shadow-lg flex items-center justify-center"
        animate={{
          x: theme === "dark" ? 0 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon */}
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="text-xs"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </motion.div>
      </motion.div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <motion.span
          className="text-xs opacity-60"
          animate={{
            opacity: theme === "dark" ? 0.6 : 0.3,
            scale: theme === "dark" ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          🌙
        </motion.span>
        <motion.span
          className="text-xs opacity-60"
          animate={{
            opacity: theme === "light" ? 0.6 : 0.3,
            scale: theme === "light" ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          ☀️
        </motion.span>
      </div>
    </motion.button>
  );
} 