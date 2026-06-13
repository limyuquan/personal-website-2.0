"use client";

import { useRef, useEffect, useCallback } from "react";

// Physics constants (identical to the original hero pong)
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
  particles: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
  }[];
  life: number;
}

export interface PongTheme {
  /** Solid core color of the ball, any CSS color */
  ballCore: string;
  /** "r, g, b" used for trail / glow / particles */
  glowRGB: string;
  /** "r, g, b" used for the paddle */
  paddleRGB: string;
  /** "r, g, b" for the background grid; omit to draw no grid */
  gridRGB?: string;
  /** Grid opacity, defaults to 0.02 */
  gridAlpha?: number;
  /** "flat" skips radial gradients and glows for a graphic, inky look */
  render?: "glow" | "flat";
  /** Draw a square ball instead of a circle (arcade style) */
  squareBall?: boolean;
}

interface PongCanvasProps {
  theme: PongTheme;
  className?: string;
  /** Called every time the player's paddle hits the ball */
  onPaddleHit?: () => void;
}

/**
 * Full-viewport ambient pong game. The paddle follows the pointer; the ball
 * bounces around the hero. Rendering style is driven by `theme` so each
 * design variant can restyle it without re-implementing the physics.
 */
export function PongCanvas({ theme, className, onPaddleHit }: PongCanvasProps) {
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
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const onPaddleHitRef = useRef(onPaddleHit);
  onPaddleHitRef.current = onPaddleHit;

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

  const createCollisionEffect = useCallback(
    (x: number, y: number, intensity: number) => {
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
      collisionEffectsRef.current.push({ particles, life: 1 });
    },
    [],
  );

  const updatePhysics = useCallback(
    (deltaTime: number) => {
      const ball = ballRef.current;
      const paddle = paddleRef.current;
      const { width, height } = dimensionsRef.current;

      if (!width || !height) return;

      const dt = Math.min(deltaTime / 16.67, 2);

      ball.position.x += ball.velocity.x * dt;
      ball.position.y += ball.velocity.y * dt;

      ball.velocity.x *= Math.pow(FRICTION, dt);
      ball.velocity.y *= Math.pow(FRICTION, dt);

      const speed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2);
      if (speed < MIN_SPEED && speed > 0) {
        const factor = MIN_SPEED / speed;
        ball.velocity.x *= factor;
        ball.velocity.y *= factor;
      }

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
        const nx = dx / distance;
        const ny = dy / distance;

        ball.position.x = paddle.position.x + nx * minDistance;
        ball.position.y = paddle.position.y + ny * minDistance;

        const relVelX = ball.velocity.x - paddle.velocity.x;
        const relVelY = ball.velocity.y - paddle.velocity.y;
        const relVelDotNormal = relVelX * nx + relVelY * ny;

        if (relVelDotNormal < 0) {
          ball.velocity.x -= 2 * relVelDotNormal * nx;
          ball.velocity.y -= 2 * relVelDotNormal * ny;

          const paddleSpeed = Math.sqrt(
            paddle.velocity.x ** 2 + paddle.velocity.y ** 2,
          );
          ball.velocity.x += paddle.velocity.x * MOMENTUM_TRANSFER;
          ball.velocity.y += paddle.velocity.y * MOMENTUM_TRANSFER;

          const newSpeed = Math.sqrt(
            ball.velocity.x ** 2 + ball.velocity.y ** 2,
          );
          if (newSpeed > MAX_SPEED) {
            const factor = MAX_SPEED / newSpeed;
            ball.velocity.x *= factor;
            ball.velocity.y *= factor;
          }

          hitGlowRef.current = 1;
          createCollisionEffect(
            ball.position.x,
            ball.position.y,
            Math.min(1, paddleSpeed / 15),
          );
          onPaddleHitRef.current?.();
        }
      }

      ball.trail.unshift({ ...ball.position });
      if (ball.trail.length > TRAIL_LENGTH) {
        ball.trail.pop();
      }

      if (hitGlowRef.current > 0) {
        hitGlowRef.current -= 0.05 * dt;
      }

      collisionEffectsRef.current = collisionEffectsRef.current.filter(
        (effect) => {
          effect.life -= 0.02 * dt;
          effect.particles.forEach((p) => {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vx *= 0.96;
            p.vy *= 0.96;
            p.life -= 0.03 * dt;
          });
          return effect.life > 0;
        },
      );
    },
    [createCollisionEffect],
  );

  const render = useCallback((ctx: CanvasRenderingContext2D) => {
    const t = themeRef.current;
    const ball = ballRef.current;
    const paddle = paddleRef.current;
    const { width, height } = dimensionsRef.current;
    const flat = t.render === "flat";

    ctx.clearRect(0, 0, width, height);

    // Grid
    if (t.gridRGB) {
      ctx.strokeStyle = `rgba(${t.gridRGB}, ${t.gridAlpha ?? 0.02})`;
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
    }

    // Trail
    ball.trail.forEach((pos, i) => {
      const alpha = (1 - i / TRAIL_LENGTH) * (flat ? 0.25 : 0.4);
      const radius = BALL_RADIUS * (1 - (i / TRAIL_LENGTH) * 0.5);

      if (flat) {
        ctx.beginPath();
        if (t.squareBall) {
          ctx.rect(pos.x - radius, pos.y - radius, radius * 2, radius * 2);
        } else {
          ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = `rgba(${t.glowRGB}, ${alpha})`;
        ctx.fill();
      } else {
        const gradient = ctx.createRadialGradient(
          pos.x,
          pos.y,
          0,
          pos.x,
          pos.y,
          radius * 2,
        );
        gradient.addColorStop(0, `rgba(${t.glowRGB}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${t.glowRGB}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${t.glowRGB}, 0)`);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    });

    // Ball
    if (flat) {
      ctx.beginPath();
      if (t.squareBall) {
        ctx.rect(
          ball.position.x - BALL_RADIUS,
          ball.position.y - BALL_RADIUS,
          BALL_RADIUS * 2,
          BALL_RADIUS * 2,
        );
      } else {
        ctx.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2);
      }
      ctx.fillStyle = t.ballCore;
      ctx.fill();
    } else {
      const ballGradient = ctx.createRadialGradient(
        ball.position.x - BALL_RADIUS * 0.3,
        ball.position.y - BALL_RADIUS * 0.3,
        0,
        ball.position.x,
        ball.position.y,
        BALL_RADIUS * 1.5,
      );
      ballGradient.addColorStop(0, t.ballCore);
      ballGradient.addColorStop(0.6, `rgba(${t.glowRGB}, 0.8)`);
      ballGradient.addColorStop(1, `rgba(${t.glowRGB}, 0)`);

      ctx.beginPath();
      ctx.arc(
        ball.position.x,
        ball.position.y,
        BALL_RADIUS * 1.5,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = ballGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = t.ballCore;
      ctx.fill();
    }

    // Paddle
    const paddleAlpha = 0.15 + hitGlowRef.current * 0.4;
    if (flat) {
      ctx.beginPath();
      ctx.arc(
        paddle.position.x,
        paddle.position.y,
        PADDLE_RADIUS,
        0,
        Math.PI * 2,
      );
      ctx.strokeStyle = `rgba(${t.paddleRGB}, ${0.4 + hitGlowRef.current * 0.6})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      const paddleGradient = ctx.createRadialGradient(
        paddle.position.x,
        paddle.position.y,
        0,
        paddle.position.x,
        paddle.position.y,
        PADDLE_RADIUS,
      );
      paddleGradient.addColorStop(0, `rgba(${t.paddleRGB}, ${paddleAlpha * 0.8})`);
      paddleGradient.addColorStop(
        0.5,
        `rgba(${t.paddleRGB}, ${paddleAlpha * 0.4})`,
      );
      paddleGradient.addColorStop(1, `rgba(${t.paddleRGB}, 0)`);

      ctx.beginPath();
      ctx.arc(
        paddle.position.x,
        paddle.position.y,
        PADDLE_RADIUS,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = paddleGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        paddle.position.x,
        paddle.position.y,
        PADDLE_RADIUS,
        0,
        Math.PI * 2,
      );
      ctx.strokeStyle = `rgba(${t.paddleRGB}, ${0.3 + hitGlowRef.current * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Collision particles
    collisionEffectsRef.current.forEach((effect) => {
      effect.particles.forEach((p) => {
        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${t.glowRGB}, ${p.life * 0.8})`;
          ctx.fill();
        }
      });
    });
  }, []);

  const gameLoop = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!ctx || !canvas) {
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const deltaTime = lastTimeRef.current
        ? timestamp - lastTimeRef.current
        : 16.67;
      lastTimeRef.current = timestamp;

      const paddle = paddleRef.current;
      paddle.velocity.x = (paddle.position.x - paddle.lastPosition.x) * 0.6;
      paddle.velocity.y = (paddle.position.y - paddle.lastPosition.y) * 0.6;
      paddle.lastPosition = { ...paddle.position };

      updatePhysics(deltaTime);
      render(ctx);

      animationRef.current = requestAnimationFrame(gameLoop);
    },
    [updatePhysics, render],
  );

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

        dimensionsRef.current = {
          width: window.innerWidth,
          height: window.innerHeight,
        };

        if (ballRef.current.position.x === 0 && ballRef.current.position.y === 0) {
          initializeBall();
        }

        if (
          paddleRef.current.position.x === 0 &&
          paddleRef.current.position.y === 0
        ) {
          paddleRef.current.position = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
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

  useEffect(() => {
    // Honor reduced motion: render a single static frame, no game loop.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) render(ctx);
      return;
    }

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop, render]);

  return (
    <canvas
      ref={canvasRef}
      className={
        className ?? "pointer-events-none absolute inset-0 h-full w-full"
      }
      style={{ background: "transparent" }}
    />
  );
}
