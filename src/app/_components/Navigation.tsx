"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

type NavSize = "full" | "medium" | "collapsed";

export function Navigation() {
  const [navSize, setNavSize] = useState<NavSize>("full");
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const navItems = [
    { name: "Home", id: "#" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Stack", id: "tech-stack" },
    { name: "Education", id: "education" },
    { name: "Projects", id: "projects" },
  ];

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      // At top of page - full size
      if (currentScrollY <= 50) {
        setNavSize("full");
      } 
      // Scrolling up - medium size (with threshold to avoid jitter)
      else if (scrollDelta < -5) {
        setNavSize("medium");
      } 
      // Scrolling down - collapsed (with threshold to avoid jitter)
      else if (scrollDelta > 5) {
        setNavSize("collapsed");
      }
      
      lastScrollY.current = currentScrollY;
      
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id).filter(id => id !== "#");
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Helper to get size-based classes
  const getSizeClasses = () => {
    switch (navSize) {
      case "full":
        return {
          nav: "glass-nav border border-white/5 px-4 py-3 md:px-8 md:py-4",
          gap: "gap-4 md:gap-12",
          navGap: "gap-4 md:gap-8",
          logoScale: 1,
          logoSize: "1.5rem",
          hoverScale: 1.05,
          bubblePadding: "-inset-x-3 -inset-y-1",
        };
      case "medium":
        return {
          nav: "glass-nav border border-white/5 px-4 py-2.5 md:px-6 md:py-3",
          gap: "gap-3 md:gap-9",
          navGap: "gap-2 md:gap-7",
          logoScale: 0.95,
          logoSize: "1.375rem",
          hoverScale: 1,
          bubblePadding: "-inset-x-2.5 -inset-y-0.5",
        };
      case "collapsed":
        return {
          nav: "glass-nav-scrolled border border-white/10 px-4 py-2",
          gap: "gap-2 md:gap-6",
          navGap: "gap-1 md:gap-6",
          logoScale: 0.9,
          logoSize: "1.25rem",
          hoverScale: 0.95,
          bubblePadding: "-inset-x-2 inset-y-0",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const scrollToSection = (id: string) => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
    
    if (id === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for the fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-start md:justify-center pointer-events-none px-4 overflow-hidden">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 25,
          }}
          className={`pointer-events-auto transition-all duration-300 rounded-full max-w-[min(100%,1200px)] ${sizeClasses.nav}`}
        >
          <div className={`flex items-center transition-all duration-300 ${sizeClasses.gap}`}>
            {/* Hamburger Menu Button (Mobile) - Now on left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 bg-white rounded-full block"
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  scaleX: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 bg-white rounded-full block"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 bg-white rounded-full block"
              />
            </button>

            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-bold tracking-tight hover:text-gray-300 transition-colors cursor-pointer flex-shrink-0"
              animate={{ 
                scale: sizeClasses.logoScale,
                fontSize: sizeClasses.logoSize
              }}
              whileHover={{ scale: sizeClasses.hoverScale }}
              whileTap={{ scale: 0.9 }}
            >
              YQ
            </motion.button>

            {/* Desktop Nav Items */}
            <div className={`hidden md:flex items-center ml-auto transition-all duration-300 ${sizeClasses.navGap}`}>
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors relative cursor-pointer whitespace-nowrap px-2 py-1 rounded-full ${
                    activeSection === item.id || (item.id === "#" && activeSection === "")
                      ? "text-white" 
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    color: "rgba(255, 255, 255, 1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {(activeSection === item.id || (item.id === "#" && activeSection === "")) && (
                    <motion.div
                      layoutId="activeSection"
                      className={`absolute ${sizeClasses.bubblePadding} bg-gradient-to-r from-violet-500/30 via-sky-400/40 to-cyan-400/30 border border-sky-300/25 rounded-full -z-10 shadow-[0_0_12px_rgba(56,189,248,0.2)]`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-24 left-4 right-4 z-50 glass-nav-scrolled rounded-2xl border border-white/10 p-6 md:hidden"
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left text-lg font-medium py-3 px-4 rounded-xl transition-colors ${
                      activeSection === item.id || (item.id === "#" && activeSection === "")
                        ? "text-white bg-gradient-to-r from-violet-500/15 via-sky-400/20 to-cyan-400/15 border border-sky-300/15 shadow-[0_0_8px_rgba(56,189,248,0.1)]" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
