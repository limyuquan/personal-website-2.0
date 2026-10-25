"use client";

// Shared design vocabulary for the composed page. Every composed section and
// variant imports its tokens and primitives from here so the page reads as
// ONE design: dark zinc-950, single cyan accent, Glacier glass surfaces,
// original liquid-text headings.

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import {
  cancelFrame,
  frame,
  motion,
  transform,
  useScroll,
} from "framer-motion";
import { useReducedMotion } from "~/lib/use-reduced-motion";
import type { PongTheme } from "../shared/PongCanvas";

export const EASE = [0.22, 1, 0.36, 1] as const;

// Glacier liquid-glass material
export const GLASS =
  "border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl";
export const GLASS_PILL = `rounded-full ${GLASS}`;

// Brand pong treatment (cyan glow, faint grid) shared by hero variants
export const PONG_CYAN: PongTheme = {
  ballCore: "#ffffff",
  glowRGB: "103, 232, 249",
  paddleRGB: "165, 243, 252",
  gridRGB: "255, 255, 255",
  gridAlpha: 0.02,
  render: "glow",
};

export function scrollToSection(id: string) {
  if (id === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: "smooth" });
}

export function SectionHeading({
  lead,
  accent,
  sub,
  align = "left",
}: {
  lead?: string;
  accent: string;
  sub?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : undefined}>
      <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
        {lead ? `${lead} ` : null}
        <span className="liquid-text">{accent}</span>
      </h2>
      {sub ? (
        <p
          className={`mt-4 max-w-xl text-zinc-400 ${centered ? "mx-auto" : ""}`}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}

// Fade-up keyframes. A `transform` string (not framer's `y`) lets framer hand
// the slide to WAAPI, so it runs on the compositor like the opacity fade
// instead of re-painting the block every frame. Same translateY values and
// easing; `transitionEnd` restores `transform: none` exactly as `y: 0` did.
const REVEAL_HIDDEN = { opacity: 0, transform: "translateY(24px)" };
const REVEAL_SHOWN = {
  opacity: 1,
  transform: "translateY(0px)",
  transitionEnd: { transform: "none" },
};

/** Fade-up on first viewport entry. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : REVEAL_HIDDEN}
      whileInView={REVEAL_SHOWN}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const WORD_COLORS = ["#3f3f46", "#ffffff"];

/**
 * The Kinetic scroll-linked word reveal: words light from zinc-700 to white
 * as the paragraph moves through the viewport. Inherits font from `className`.
 *
 * `startOffset` / `endOffset` tune when the reveal begins and finishes, as a
 * fraction of the viewport. Larger `startOffset` = begins earlier (paragraph
 * still low on screen); smaller = begins later (paragraph higher up).
 */
export function WordReveal({
  text,
  className = "text-2xl leading-snug tracking-tight md:text-[2rem]",
  startOffset = 0.9,
  endOffset = 0.45,
}: {
  text: string;
  className?: string;
  startOffset?: number;
  endOffset?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startOffset}`, `end ${endOffset}`],
  });
  const words = useMemo(() => text.split(" "), [text]);
  // The exact interpolator useTransform(progress, range, WORD_COLORS) builds.
  const colorAt = useMemo(
    () =>
      words.map((_, i) =>
        transform([i / words.length, (i + 1) / words.length], WORD_COLORS),
      ),
    [words],
  );
  // Render-time colours, fixed so a re-render never overwrites live ones.
  const initial = useMemo(
    () => colorAt.map((colorOf) => colorOf(scrollYProgress.get())),
    [colorAt, scrollYProgress],
  );
  const spans = useRef<(HTMLSpanElement | null)[]>([]);

  // One subscription per paragraph; only words whose range was crossed recompute.
  useEffect(() => {
    if (reduce) return;
    let last: number | null = null;
    const shown: string[] = [];
    const update = () => {
      const p = scrollYProgress.get();
      const lo = last === null ? 0 : Math.min(p, last);
      const hi = last === null ? 1 : Math.max(p, last);
      last = p;
      for (let i = 0; i < words.length; i++) {
        if ((i + 1) / words.length < lo || i / words.length > hi) continue;
        const color = colorAt[i]!(p);
        const span = spans.current[i];
        if (span && color !== shown[i]) {
          shown[i] = color;
          span.style.color = color;
        }
      }
    };
    update();
    const unsubscribe = scrollYProgress.on("change", () =>
      frame.preRender(update, false, true),
    );
    return () => {
      unsubscribe();
      cancelFrame(update);
    };
  }, [reduce, scrollYProgress, colorAt, words]);

  if (reduce) {
    return (
      <p ref={ref} className={`relative ${className} text-white`}>
        {text}
      </p>
    );
  }

  return (
    // `relative` so framer's useScroll can compute the target's offset.
    <p ref={ref} className={`relative ${className}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          ref={(el) => {
            spans.current[i] = el;
          }}
          style={{ color: initial[i] }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </span>
      ))}
    </p>
  );
}
