"use client";

// Glacier's liquid-glass material + Paper's morphing layout. Three width
// states: full (top / fast scroll-up), medium (slow scroll-up: a partial
// "peek" rather than snapping all the way open), and compact (scrolling
// down). Brand is the first name only.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { navSections, profile } from "../shared/data";
import { EASE, GLASS, scrollToSection } from "./ui";

type NavSize = "full" | "medium" | "compact";

const SIZE_STYLES: Record<NavSize, Record<string, string | number>> = {
  full: {
    maxWidth: "80rem",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "rgba(9, 9, 11, 0.22)",
  },
  medium: {
    maxWidth: "58rem",
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "rgba(9, 9, 11, 0.35)",
  },
  compact: {
    maxWidth: "44rem",
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "rgba(9, 9, 11, 0.45)",
  },
};

export function Navbar() {
  const reduce = useReducedMotion();
  const [size, setSize] = useState<NavSize>("full");
  const [activeId, setActiveId] = useState("#");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // The full-width bar belongs to the hero only. Measure where the hero ends
  // (the top of the About section) so we know when we have left it.
  const heroBottomRef = useRef(0);
  useEffect(() => {
    const measure = () => {
      const about = document.getElementById("about");
      heroBottomRef.current = about ? about.offsetTop : window.innerHeight;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    const inHero = latest < heroBottomRef.current - 100;

    if (latest < 80) {
      // At the very top of the hero: full width.
      setSize("full");
    } else if (inHero) {
      // Scrolled within the hero: settle at the medium "peek" width.
      setSize("medium");
    } else if (latest > previous) {
      // Past the hero, scrolling down: collapse to compact.
      setSize("compact");
      setMenuOpen(false);
    } else if (latest < previous) {
      // Past the hero, scrolling up: medium "peek" width.
      setSize("medium");
    }

    if (latest < 320) setActiveId("#");
  });

  // Active section: keep a thin activation band just under the navbar so that
  // even short sections (e.g. About) register when scrolled to. Among the
  // sections currently crossing the band, the topmost in document order wins.
  const visibilityRef = useRef<Record<string, boolean>>({});
  useEffect(() => {
    const ids = navSections
      .filter((s) => !s.isExternal && s.id !== "#")
      .map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibilityRef.current[entry.target.id] = entry.isIntersecting;
        }
        const topmost = ids.find((id) => visibilityRef.current[id]);
        if (topmost) {
          setActiveId((prev) => (prev === topmost ? prev : topmost));
        }
      },
      { rootMargin: "-88px 0px -65% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((id: string) => {
    setMenuOpen(false);
    // Set active immediately so the highlight lands on the clicked item even
    // before the smooth scroll settles.
    setActiveId(id);
    scrollToSection(id);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
      <motion.nav
        // Start from the full-size styles so the server-rendered markup matches
        // the first client render (size is always "full" initially); avoids a
        // hydration mismatch from applying inline styles only on the client.
        initial={SIZE_STYLES.full}
        animate={SIZE_STYLES[size]}
        transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className={`pointer-events-auto relative w-full rounded-full ${GLASS} px-5 md:px-6`}
        aria-label="Primary"
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavigate("#")}
            className="text-sm font-semibold tracking-tight whitespace-nowrap text-white transition-colors hover:text-cyan-300 md:text-base"
          >
            {profile.firstName}
            <span className="text-cyan-400">.</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center md:flex">
            {navSections.map((section) => {
              const isActive = !section.isExternal && activeId === section.id;
              return (
                <li key={section.name} className="relative">
                  {section.isExternal ? (
                    <Link
                      href={section.id}
                      className="relative z-10 block rounded-full px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:text-white"
                    >
                      {section.name}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleNavigate(section.id)}
                      className={`relative z-10 block rounded-full px-3 py-1.5 text-sm transition-colors ${
                        isActive ? "text-white" : "text-zinc-300 hover:text-white"
                      }`}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="composed-nav-active"
                          className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-gradient-to-r from-white/15 via-white/20 to-cyan-200/15 shadow-[0_0_14px_rgba(165,243,252,0.15)]"
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { type: "spring", bounce: 0.2, duration: 0.6 }
                          }
                        />
                      ) : null}
                      {section.name}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-zinc-200 md:hidden"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4">
              {menuOpen ? (
                <path
                  d="m5 5 10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6.5h14M3 13.5h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE }}
              className={`absolute inset-x-0 top-full mt-2 rounded-2xl ${GLASS} bg-zinc-950/85 p-2 md:hidden`}
            >
              <ul className="flex flex-col">
                {navSections.map((section) => (
                  <li key={section.name}>
                    {section.isExternal ? (
                      <Link
                        href={section.id}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm text-zinc-200 transition-colors hover:bg-white/[0.06]"
                      >
                        {section.name}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleNavigate(section.id)}
                        className="block w-full rounded-xl px-4 py-3 text-left text-sm text-zinc-200 transition-colors hover:bg-white/[0.06]"
                      >
                        {section.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
