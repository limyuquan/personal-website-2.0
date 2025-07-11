"use client";

import { useEffect, useState, useRef } from "react";

interface TextScrambleProps {
  children: string;
  trigger?: boolean;
  duration?: number;
  scrambleSpeed?: number;
  className?: string;
}

export function TextScramble({ 
  children, 
  trigger = true, 
  duration = 2000,
  scrambleSpeed = 50,
  className = "" 
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const scrambleText = () => {
    if (!trigger) return;
    
    setIsScrambling(true);
    const originalText = children;
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, scrambleSpeed);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(originalText);
      setIsScrambling(false);
    }, duration);
  };

  useEffect(() => {
    if (trigger) {
      scrambleText();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [trigger, children]);

  return (
    <span 
      className={`${className} ${isScrambling ? 'animate-pulse' : ''}`}
      style={{ fontFamily: 'monospace' }}
    >
      {displayText}
    </span>
  );
}

// Hook for scroll-triggered text scramble
export function useTextScramble() {
  const [trigger, setTrigger] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setTrigger(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, trigger };
} 