"use client";

// Shared design vocabulary for the composed page. Every composed section and
// variant imports its tokens and primitives from here so the page reads as
// ONE design: dark zinc-950, single cyan accent, Glacier glass surfaces,
// original liquid-text headings.

import { useMemo, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, ["#3f3f46", "#ffffff"]);
  return (
    <motion.span style={{ color }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

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

  if (reduce) {
    return <p className={`${className} text-white`}>{text}</p>;
  }

  return (
    // `relative` so framer's useScroll can compute the target's offset.
    <p ref={ref} className={`relative ${className}`}>
      {words.map((word, i) => (
        <RevealWord
          key={`${word}-${i}`}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        />
      ))}
    </p>
  );
}
