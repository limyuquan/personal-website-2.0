"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function MorphingBlobs() {
  const pathRef = useRef<SVGPathElement>(null);

  const morphPaths = [
    "M60,-58.3C75.4,-45.2,84.4,-22.6,82.1,-1.3C79.8,20,66.2,40,46.6,56.4C27,72.8,1.4,85.6,-23.8,83.7C-49,81.8,-73.8,65.2,-84.4,41.4C-95,17.6,-91.4,-13.4,-79.9,-37.6C-68.4,-61.8,-49,-79.2,-26.5,-82.3C-4,-85.4,21.6,-74.2,42.8,-61.5C64,-48.8,80.8,-34.6,60,-58.3Z",
    "M54.7,-60.8C69.3,-50.7,78.6,-31.4,80.5,-12.1C82.4,7.2,77,26.5,66.2,42.1C55.4,57.7,39.2,69.6,20.7,74.8C2.2,80,-18.6,78.5,-35.8,71.2C-53,63.9,-66.6,50.8,-75.4,34.4C-84.2,18,-88.2,-1.7,-83.6,-20.1C-79,-38.5,-65.8,-55.6,-49.4,-64.9C-33,-74.2,-13.4,-75.7,4.8,-81.2C23,-86.7,46,-95.2,54.7,-60.8Z",
    "M49.2,-52.1C63.8,-39.4,75.4,-19.7,76.1,0.5C76.8,20.7,66.6,41.4,52,56.7C37.4,72,18.4,82,0.1,81.9C-18.2,81.8,-36.4,71.6,-50.8,56.4C-65.2,41.2,-75.8,21,-78.7,-1.8C-81.6,-24.6,-76.8,-49.2,-62.4,-61.9C-48,-74.6,-24,-75.4,-2.4,-73C19.2,-70.6,38.4,-65,49.2,-52.1Z",
    "M42.3,-47.8C54.2,-35.6,62.5,-17.8,63.8,1.2C65.1,20.2,59.4,40.4,47.5,54.8C35.6,69.2,17.5,77.8,-2.9,80.7C-23.3,83.6,-46.6,80.8,-61.7,66.4C-76.8,52,-83.7,26,-81.1,1.5C-78.5,-23,-66.4,-46,-51.3,-58.2C-36.2,-70.4,-18.1,-71.8,0.9,-72.7C19.9,-73.6,39.8,-74,42.3,-47.8Z"
  ];

  useEffect(() => {
    let currentPath = 0;
    
    const morphInterval = setInterval(() => {
      if (pathRef.current) {
        currentPath = (currentPath + 1) % morphPaths.length;
        const nextPath = morphPaths[currentPath];
        if (nextPath) {
          pathRef.current.setAttribute("d", nextPath);
        }
      }
    }, 3000);

    return () => clearInterval(morphInterval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      {/* Blob 1 */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full will-change-transform transform-gpu"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        whileInView={{ x: [0, 100, 0], y: [0, 50, 0], rotate: [0, 180, 360] }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="50%" stopColor="#4ECDC4" />
              <stop offset="100%" stopColor="#45B7D1" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={morphPaths[0]}
            fill="url(#gradient1)"
            transform="translate(100 100)"
            style={{ willChange: "d" as any }}
          />
        </svg>
      </motion.div>

      {/* Blob 2 */}
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-3/4 h-3/4 will-change-transform transform-gpu"
        animate={{
          x: [0, -150, 0],
          y: [0, -100, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
        whileInView={{ x: [0, -150, 0], y: [0, -100, 0], rotate: [360, 180, 0] }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f093fb" />
            </linearGradient>
          </defs>
          <path
            d={morphPaths[1]}
            fill="url(#gradient2)"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Blob 3 */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-1/2 h-1/2 will-change-transform transform-gpu"
        animate={{
          x: [0, 200, 0],
          y: [0, -100, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        whileInView={{ x: [0, 200, 0], y: [0, -100, 0], scale: [1, 1.5, 1] }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffecd2" />
              <stop offset="100%" stopColor="#fcb69f" />
            </radialGradient>
          </defs>
          <path
            d={morphPaths[2]}
            fill="url(#gradient3)"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// Floating particles component
export function FloatingParticles() {
  const particleCount = 15;
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    initialX: number;
    initialY: number;
    animateX: [number, number, number];
    animateY: [number, number, number];
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Generate particles with random values only on the client
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      initialX: Math.random() * 1200,
      initialY: Math.random() * 800,
      animateX: [
        Math.random() * 1200,
        Math.random() * 1200,
        Math.random() * 1200,
      ] as [number, number, number],
      animateY: [
        Math.random() * 800,
        Math.random() * 800,
        Math.random() * 800,
      ] as [number, number, number],
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    
    setParticles(newParticles);
  }, []);

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20 will-change-transform transform-gpu"
          initial={{
            x: particle.initialX,
            y: particle.initialY,
          }}
          animate={{
            x: particle.animateX,
            y: particle.animateY,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
          whileInView={{ x: particle.animateX, y: particle.animateY }}
        />
      ))}
    </div>
  );
} 