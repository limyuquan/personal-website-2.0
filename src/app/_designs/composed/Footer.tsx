"use client";

// Outro: a quiet centered sign-off whose signature is the name rendered as a
// huge outlined watermark, half clipped by the bottom edge of the page. The
// watermark rises slightly into place the first time it scrolls into view.

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { FaFileAlt, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { navSections, profile } from "../shared/data";
import { EASE, Reveal, scrollToSection } from "./ui";

function backToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] pt-24 pb-0">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Resume"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <FaFileAlt className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-zinc-300 transition-colors hover:text-cyan-300"
            >
              {profile.email}
            </a>
          </div>

          <nav
            aria-label="Footer sections"
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {navSections.map((section) =>
              section.isExternal ? (
                <Link
                  key={section.name}
                  href={section.id}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {section.name}
                </Link>
              ) : (
                <button
                  key={section.name}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {section.name}
                </button>
              ),
            )}
          </nav>

          <button
            type="button"
            onClick={backToTop}
            className="group mt-10 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUpIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>

          <p className="mt-6 mb-16 text-xs text-zinc-600">
            © {new Date().getFullYear()} Lim Yu Quan. Made in Singapore.
          </p>
        </Reveal>
      </div>

      <motion.div
        initial={reduce ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={{ hidden: { y: 80 }, visible: { y: 0 } }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div
            aria-hidden
            className="pointer-events-none translate-y-[35%] text-center text-[15vw] leading-none font-bold tracking-tight whitespace-nowrap text-transparent select-none"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
          >
            LIM YU QUAN
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
