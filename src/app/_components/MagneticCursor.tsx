"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { damping: 40, stiffness: 200 }),
    y: useSpring(mouse.y, { damping: 40, stiffness: 200 })
  };

  useEffect(() => {
    let rafId: number | null = null;
    let lastEvent: MouseEvent | null = null;

    const updateFromEvent = () => {
      if (lastEvent) {
        mouse.x.set(lastEvent.clientX);
        mouse.y.set(lastEvent.clientY);
      }
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastEvent = e;
      rafId ??= requestAnimationFrame(updateFromEvent);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
        document.body.classList.add("custom-cursor-active");
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
        document.body.classList.remove("custom-cursor-active");
      }
    };

    // Initialize cursor visibility
    document.body.classList.add("custom-cursor-active");

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mouse.x, mouse.y]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: smoothMouse.x,
          y: smoothMouse.y,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Inner dot with backdrop */}
        <motion.div 
          className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: "transform, opacity" }}
        />
        
        {/* Outer ring */}
        <motion.div 
          className="w-10 h-10 border border-white/80 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 0.4, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{ willChange: "transform, opacity" }}
        />
      </motion.div>
    </>
  );
}

// Hook for magnetic elements
export function useMagnetic(strength = 0.1) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let rafId: number | null = null;
    let lastEvent: MouseEvent | null = null;

    const applyTransform = () => {
      if (!element || !lastEvent) {
        rafId = null;
        return;
      }
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (lastEvent.clientX - centerX) * strength;
      const deltaY = (lastEvent.clientY - centerY) * strength;
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastEvent = e;
      rafId ??= requestAnimationFrame(applyTransform);
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0px, 0px)";
    };

    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
} 