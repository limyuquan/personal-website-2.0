"use client";

// Poster hero: the name is set at viewport scale as stroked outlines and stays
// outlined (that emptiness is the identity). A one-time cyan fill sweeps
// through the characters on entrance; hovering a character floods it cyan. The
// eyebrow rolls through a set of titles, and the ambient pong plays over a
// faint grid.

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE, GLASS_PILL, PONG_CYAN, scrollToSection } from "./ui";
import { profile } from "../shared/data";
import { PongCanvas, type PongTheme } from "../shared/PongCanvas";

const POSTER_PONG: PongTheme = { ...PONG_CYAN, gridAlpha: 0.045 };

// Titles the eyebrow rolls through. Each word flips up and out, the next
// flips in from below (a vertical "rotating" roll).
const ROLES = [
  "Full-Stack Software Engineer",
  "Backend Engineer",
  "Computer Science, NUS",
  "Based in Singapore",
];

const ROLE_INTERVAL = 2800;

function RoleRotator({ reduce }: { reduce: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % ROLES.length),
      ROLE_INTERVAL,
    );
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) {
    return <span>{ROLES[0]}</span>;
  }

  const role = ROLES[index] ?? ROLES[0]!;
  const words = role.split(" ");

  return (
    <span
      className="relative inline-flex overflow-hidden py-1 align-middle"
      style={{ perspective: 600 }}
    >
      {/* Re-mounting the keyed inner span replays the roll on each cycle. No
          AnimatePresence (its exit DOM ops race with React 19 strict mode). */}
      <span key={index} className="inline-flex gap-[0.32em] whitespace-nowrap">
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            initial={{ rotateX: -90, y: "0.5em", opacity: 0 }}
            animate={{ rotateX: 0, y: 0, opacity: 1 }}
            transition={{
              duration: 0.45,
              delay: wordIndex * 0.05,
              ease: EASE,
            }}
            className="inline-block"
            style={{
              transformOrigin: "center bottom",
              transformStyle: "preserve-3d",
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

const LINES = [
  profile.firstName,
  profile.name.startsWith(profile.firstName)
    ? profile.name.slice(profile.firstName.length).trim()
    : profile.name,
];

// Stagger lives on the parent so a character returning from hover animates
// back immediately instead of waiting out its entrance delay.
const nameContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

// Entrance: rise into place while a cyan fill flashes through and drains
// out, leaving the resting outline.
const charVariants: Variants = {
  hidden: { opacity: 0, y: 24, color: "rgba(103, 232, 249, 0)" },
  show: {
    opacity: 1,
    y: 0,
    color: [
      "rgba(103, 232, 249, 0)",
      "rgba(103, 232, 249, 1)",
      "rgba(103, 232, 249, 0)",
    ],
    transition: {
      duration: 0.9,
      ease: EASE,
      color: { duration: 0.9, times: [0, 0.4, 1] },
    },
  },
};

const periodVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45, ease: EASE } },
};

function OutlineChar({ char, reduce }: { char: string; reduce: boolean }) {
  return (
    <motion.span
      aria-hidden
      variants={charVariants}
      whileHover={
        reduce
          ? undefined
          : { color: "rgba(103, 232, 249, 1)", transition: { duration: 0.12 } }
      }
      className="inline-block whitespace-pre text-transparent"
      style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.55)" }}
    >
      {char}
    </motion.span>
  );
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <PongCanvas theme={POSTER_PONG} />

      <div className="relative z-10 w-full px-6 pt-24 pb-16 md:px-10">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          className="font-mono text-sm tracking-[0.2em] text-zinc-400 uppercase"
        >
          <RoleRotator reduce={reduce} />
        </motion.p>

        <motion.h1
          aria-label={profile.name}
          variants={nameContainer}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="mt-6 text-[16vw] leading-[0.95] font-bold tracking-tight md:text-[13vw]"
        >
          {LINES.map((line, lineIndex) => (
            <span key={line} className="block whitespace-nowrap">
              {line.split("").map((char, charIndex) => (
                <OutlineChar
                  key={`${char}-${charIndex}`}
                  char={char}
                  reduce={reduce}
                />
              ))}
              {lineIndex === LINES.length - 1 ? (
                <motion.span
                  aria-hidden
                  variants={periodVariants}
                  className="inline-block text-cyan-400"
                >
                  .
                </motion.span>
              ) : null}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.7, delay: 0.9, ease: EASE }
          }
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="rounded-full bg-white px-8 py-3.5 font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
          >
            View projects
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${GLASS_PILL} px-8 py-3.5 text-white transition hover:border-white/25 active:scale-[0.98]`}
          >
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
