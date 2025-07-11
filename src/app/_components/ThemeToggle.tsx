"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(actualTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex h-10 w-20 items-center justify-between rounded-full bg-gray-200 p-1 dark:bg-gray-800 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <motion.div
        className="flex h-8 w-8 items-center justify-center text-yellow-500"
        animate={{
          opacity: actualTheme === "light" ? 1 : 0.3,
          scale: actualTheme === "light" ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
        </svg>
      </motion.div>

      {/* Moon Icon */}
      <motion.div
        className="flex h-8 w-8 items-center justify-center text-blue-300"
        animate={{
          opacity: actualTheme === "dark" ? 1 : 0.3,
          scale: actualTheme === "dark" ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </motion.div>

      {/* Sliding indicator */}
      <motion.div
        className="absolute h-8 w-8 rounded-full bg-white shadow-lg dark:bg-gray-700"
        animate={{
          x: actualTheme === "light" ? 0 : 44,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </motion.button>
  );
} 