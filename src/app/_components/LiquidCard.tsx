"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";

interface LiquidCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
}

export function LiquidCard({ 
  children, 
  className = "", 
  tiltStrength = 5 
}: LiquidCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltStrength, -tiltStrength]), {
    stiffness: 150,
    damping: 20
  });
  
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltStrength, tiltStrength]), {
    stiffness: 150,
    damping: 20
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (event.clientX - centerX) / rect.width;
    const y = (event.clientY - centerY) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="relative w-full h-full transform-gpu"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subtle background effect */}
        <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10" />
        
        {/* Subtle animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/20"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Content container */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Elastic button component
export function ElasticButton({ 
  children, 
  onClick,
  className = "",
  ...props 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
} & React.ComponentProps<typeof motion.button>) {
  return (
    <motion.button
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      {...props}
    >
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        whileTap={{
          scale: 4,
          opacity: 0,
          transition: { duration: 0.6 }
        }}
      />
      
      {/* Button content */}
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
} 