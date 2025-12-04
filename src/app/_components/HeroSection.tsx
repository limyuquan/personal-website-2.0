"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { ElasticButton } from "./LiquidCard";

// Physics constants
const BALL_RADIUS = 12;
const PADDLE_RADIUS = 60;
const FRICTION = 0.9985;
const WALL_BOUNCE = 0.92;
const MAX_SPEED = 18;
const MIN_SPEED = 3;
const TRAIL_LENGTH = 12;
const MOMENTUM_TRANSFER = 0.4;

interface Vector2D {
  x: number;
  y: number;
}

interface Ball {
  position: Vector2D;
  velocity: Vector2D;
  trail: Vector2D[];
}

interface Paddle {
  position: Vector2D;
  velocity: Vector2D;
  lastPosition: Vector2D;
}

interface CollisionEffect {
  x: number;
  y: number;
  particles: { x: number; y: number; vx: number; vy: number; life: number; size: number }[];
  life: number;
}

// Pong Game Canvas Component
function PongCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const ballRef = useRef<Ball>({
    position: { x: 0, y: 0 },
    velocity: { x: 5, y: 4 },
    trail: [],
  });
  const paddleRef = useRef<Paddle>({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    lastPosition: { x: 0, y: 0 },
  });
  const collisionEffectsRef = useRef<CollisionEffect[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const lastTimeRef = useRef<number>(0);
  const hitGlowRef = useRef<number>(0);

  // Initialize ball position
  const initializeBall = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    if (width && height) {
      const angle = Math.random() * Math.PI * 2;
      const speed = MIN_SPEED + Math.random() * 3;
      ballRef.current = {
        position: { x: width / 2, y: height / 2 },
        velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
        trail: [],
      };
    }
  }, []);

  // Create collision particles
  const createCollisionEffect = useCallback((x: number, y: number, intensity: number) => {
    const particles = [];
    const particleCount = Math.floor(8 + intensity * 12);
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const speed = 2 + Math.random() * intensity * 4;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: 2 + Math.random() * 3,
      });
    }
    collisionEffectsRef.current.push({ x, y, particles, life: 1 });
  }, []);

  // Physics update
  const updatePhysics = useCallback((deltaTime: number) => {
    const ball = ballRef.current;
    const paddle = paddleRef.current;
    const { width, height } = dimensionsRef.current;

    if (!width || !height) return;

    // Normalize delta time (target 60fps)
    const dt = Math.min(deltaTime / 16.67, 2);

    // Update ball position
    ball.position.x += ball.velocity.x * dt;
    ball.position.y += ball.velocity.y * dt;

    // Apply friction
    ball.velocity.x *= Math.pow(FRICTION, dt);
    ball.velocity.y *= Math.pow(FRICTION, dt);

    // Ensure minimum speed
    const speed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2);
    if (speed < MIN_SPEED && speed > 0) {
      const factor = MIN_SPEED / speed;
      ball.velocity.x *= factor;
      ball.velocity.y *= factor;
    }

    // Wall collisions
    if (ball.position.x - BALL_RADIUS <= 0) {
      ball.position.x = BALL_RADIUS;
      ball.velocity.x = Math.abs(ball.velocity.x) * WALL_BOUNCE;
      createCollisionEffect(ball.position.x, ball.position.y, 0.3);
    }
    if (ball.position.x + BALL_RADIUS >= width) {
      ball.position.x = width - BALL_RADIUS;
      ball.velocity.x = -Math.abs(ball.velocity.x) * WALL_BOUNCE;
      createCollisionEffect(ball.position.x, ball.position.y, 0.3);
    }
    if (ball.position.y - BALL_RADIUS <= 0) {
      ball.position.y = BALL_RADIUS;
      ball.velocity.y = Math.abs(ball.velocity.y) * WALL_BOUNCE;
      createCollisionEffect(ball.position.x, ball.position.y, 0.3);
    }
    if (ball.position.y + BALL_RADIUS >= height) {
      ball.position.y = height - BALL_RADIUS;
      ball.velocity.y = -Math.abs(ball.velocity.y) * WALL_BOUNCE;
      createCollisionEffect(ball.position.x, ball.position.y, 0.3);
    }

    // Paddle collision (circle-circle)
    const dx = ball.position.x - paddle.position.x;
    const dy = ball.position.y - paddle.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = BALL_RADIUS + PADDLE_RADIUS;

    if (distance < minDistance && distance > 0) {
      // Normalize collision normal
      const nx = dx / distance;
      const ny = dy / distance;

      // Push ball outside paddle
      ball.position.x = paddle.position.x + nx * minDistance;
      ball.position.y = paddle.position.y + ny * minDistance;

      // Calculate relative velocity
      const relVelX = ball.velocity.x - paddle.velocity.x;
      const relVelY = ball.velocity.y - paddle.velocity.y;
      const relVelDotNormal = relVelX * nx + relVelY * ny;

      // Only resolve if moving towards paddle
      if (relVelDotNormal < 0) {
        // Reflect velocity
        ball.velocity.x -= 2 * relVelDotNormal * nx;
        ball.velocity.y -= 2 * relVelDotNormal * ny;

        // Add momentum transfer from paddle
        const paddleSpeed = Math.sqrt(paddle.velocity.x ** 2 + paddle.velocity.y ** 2);
        ball.velocity.x += paddle.velocity.x * MOMENTUM_TRANSFER;
        ball.velocity.y += paddle.velocity.y * MOMENTUM_TRANSFER;

        // Clamp speed
        const newSpeed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2);
        if (newSpeed > MAX_SPEED) {
          const factor = MAX_SPEED / newSpeed;
          ball.velocity.x *= factor;
          ball.velocity.y *= factor;
        }

        // Visual feedback
        hitGlowRef.current = 1;
        createCollisionEffect(
          ball.position.x,
          ball.position.y,
          Math.min(1, paddleSpeed / 15)
        );
      }
    }

    // Update trail
    ball.trail.unshift({ ...ball.position });
    if (ball.trail.length > TRAIL_LENGTH) {
      ball.trail.pop();
    }

    // Decay hit glow
    if (hitGlowRef.current > 0) {
      hitGlowRef.current -= 0.05 * dt;
    }

    // Update collision effects
    collisionEffectsRef.current = collisionEffectsRef.current.filter((effect) => {
      effect.life -= 0.02 * dt;
      effect.particles.forEach((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 0.03 * dt;
      });
      return effect.life > 0;
    });
  }, [createCollisionEffect]);

  // Render function
  const render = useCallback((ctx: CanvasRenderingContext2D) => {
    const ball = ballRef.current;
    const paddle = paddleRef.current;
    const { width, height } = dimensionsRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw subtle grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw ball trail
    ball.trail.forEach((pos, i) => {
      const alpha = (1 - i / TRAIL_LENGTH) * 0.4;
      const radius = BALL_RADIUS * (1 - i / TRAIL_LENGTH * 0.5);
      
      const gradient = ctx.createRadialGradient(
        pos.x, pos.y, 0,
        pos.x, pos.y, radius * 2
      );
      gradient.addColorStop(0, `rgba(147, 197, 253, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(96, 165, 250, ${alpha * 0.5})`);
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
      
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });

    // Draw ball
    const ballGradient = ctx.createRadialGradient(
      ball.position.x - BALL_RADIUS * 0.3,
      ball.position.y - BALL_RADIUS * 0.3,
      0,
      ball.position.x,
      ball.position.y,
      BALL_RADIUS * 1.5
    );
    ballGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    ballGradient.addColorStop(0.3, "rgba(191, 219, 254, 1)");
    ballGradient.addColorStop(0.7, "rgba(96, 165, 250, 0.8)");
    ballGradient.addColorStop(1, "rgba(59, 130, 246, 0)");

    ctx.beginPath();
    ctx.arc(ball.position.x, ball.position.y, BALL_RADIUS * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = ballGradient;
    ctx.fill();

    // Ball core
    ctx.beginPath();
    ctx.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fill();

    // Ball outer glow
    ctx.shadowColor = "rgba(147, 197, 253, 0.8)";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "transparent";
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw paddle
    const paddleAlpha = 0.15 + hitGlowRef.current * 0.4;
    const paddleGradient = ctx.createRadialGradient(
      paddle.position.x,
      paddle.position.y,
      0,
      paddle.position.x,
      paddle.position.y,
      PADDLE_RADIUS
    );
    paddleGradient.addColorStop(0, `rgba(255, 255, 255, ${paddleAlpha * 0.8})`);
    paddleGradient.addColorStop(0.5, `rgba(147, 197, 253, ${paddleAlpha * 0.4})`);
    paddleGradient.addColorStop(0.8, `rgba(96, 165, 250, ${paddleAlpha * 0.2})`);
    paddleGradient.addColorStop(1, "rgba(59, 130, 246, 0)");

    ctx.beginPath();
    ctx.arc(paddle.position.x, paddle.position.y, PADDLE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = paddleGradient;
    ctx.fill();

    // Paddle border
    ctx.beginPath();
    ctx.arc(paddle.position.x, paddle.position.y, PADDLE_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(147, 197, 253, ${0.3 + hitGlowRef.current * 0.5})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw collision effects
    collisionEffectsRef.current.forEach((effect) => {
      effect.particles.forEach((p) => {
        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${p.life * 0.8})`;
          ctx.fill();
        }
      });
    });
  }, []);

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!ctx || !canvas) {
      animationRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    const deltaTime = lastTimeRef.current ? timestamp - lastTimeRef.current : 16.67;
    lastTimeRef.current = timestamp;

    // Update paddle velocity
    const paddle = paddleRef.current;
    paddle.velocity.x = (paddle.position.x - paddle.lastPosition.x) * 0.6;
    paddle.velocity.y = (paddle.position.y - paddle.lastPosition.y) * 0.6;
    paddle.lastPosition = { ...paddle.position };

    updatePhysics(deltaTime);
    render(ctx);

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [updatePhysics, render]);

  // Handle mouse/touch movement
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      paddleRef.current.position = { x: clientX, y: clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
        
        dimensionsRef.current = { width: window.innerWidth, height: window.innerHeight };
        
        // Initialize ball if not already
        if (ballRef.current.position.x === 0 && ballRef.current.position.y === 0) {
          initializeBall();
        }
        
        // Initialize paddle position to center
        if (paddleRef.current.position.x === 0 && paddleRef.current.position.y === 0) {
          paddleRef.current.position = { 
            x: window.innerWidth / 2, 
            y: window.innerHeight / 2 
          };
          paddleRef.current.lastPosition = { ...paddleRef.current.position };
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initializeBall]);

  // Start game loop
  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}

// Advanced title animation component
function AnimatedTitle({ text, isActive }: { text: string; isActive: boolean }) {
  const words = useMemo(() => text.split(" "), [text]);

  const springConfig = {
    type: "spring" as const,
    damping: 25,
    stiffness: 200,
    mass: 0.8,
  };

  return (
    <div className="flex flex-wrap justify-center items-center leading-none gap-x-4 lg:gap-x-6">
      {words.map((word, wordIndex) => (
        <div key={`${text}-word-${wordIndex}`} className="flex">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${text}-${wordIndex}-${charIndex}`}
              className="inline-block font-bold tracking-tight bg-white bg-clip-text text-transparent text-7xl lg:text-9xl lg:h-34 will-change-transform transform-gpu"
              initial={{
                opacity: 0,
                y: 100,
                rotateX: -90,
                scale: 0.3,
                filter: "blur(20px)",
              }}
              animate={
                isActive
                  ? {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }
                  : {
                      opacity: 0,
                      y: -100,
                      rotateX: 90,
                      scale: 0.3,
                      filter: "blur(20px)",
                    }
              }
              exit={{
                opacity: 0,
                y: -100,
                rotateX: 90,
                scale: 0.3,
                filter: "blur(20px)",
              }}
              transition={{
                ...springConfig,
                delay: (wordIndex * word.length + charIndex) * 0.03,
                opacity: { duration: 0.4 },
                filter: { duration: 0.3 },
              }}
              style={{
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
                perspective: "1000px",
                willChange: "transform, opacity, filter",
              }}
              whileHover={{
                scale: 1.1,
                rotateY: 15,
                transition: { duration: 0.3 },
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Enhanced title switcher with smooth transitions
function TitleSwitcher({ titles }: { titles: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % titles.length);
        setIsChanging(false);
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="relative h-42 lg:h-70 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isChanging && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedTitle
                text={titles[currentIndex] ?? "Fullstack Engineer"}
                isActive={!isChanging}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r rounded-full"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileInView={{ opacity: [0.3, 0.6, 0.3] }}
      />
    </div>
  );
}

export function HeroSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const titles = ["Software Engineer", "Fullstack Engineer", "Student"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  } as const;

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative px-6 pt-18 md:pt-0 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Pong Game Background */}
      <PongCanvas />

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none" />

      <div className="max-w-6xl md:max-w-none mx-auto text-center relative z-10 px-4">
        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-4 font-light md:text-left md:mt-16"
          variants={itemVariants}
        >
          Hello! I am Yu Quan, a
        </motion.p>

        <TitleSwitcher titles={titles} />

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed mt-10 md:mt-0 md:text-left"
          variants={itemVariants}
        >
          Crafting exceptional digital experiences with modern technologies,
          clean code, and innovative solutions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <a href="#projects">
            <ElasticButton className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
              View My Work
            </ElasticButton>
          </a>

          <a
            href="/files/limyuquan-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ElasticButton className="px-8 py-4 border border-white/30 rounded-full hover:border-white/60 transition-colors">
              Download Resume
            </ElasticButton>
          </a>
        </motion.div>

        <motion.div className="mt-20" variants={itemVariants}>
          <motion.div
            className="w-0.5 h-16 bg-gradient-to-b from-white to-transparent mx-auto"
            animate={{
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileInView={{ scaleY: [0, 1, 0] }}
          />
          <motion.p
            className="text-sm text-gray-400 mt-4"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileInView={{ opacity: [0.5, 1, 0.5] }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
