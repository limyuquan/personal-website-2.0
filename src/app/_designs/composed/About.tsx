"use client";

// Manifesto: no heading, no panels. A large portrait sits inside one oversized
// word-lit statement, with a quiet row of underline links closing it out.

import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { profile } from "../shared/data";
import { Reveal, WordReveal } from "./ui";

const links: { label: string; href: string; external: boolean }[] = [
  { label: "GitHub", href: profile.github, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, external: false },
  { label: "Resume", href: profile.resumeUrl, external: true },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          {/* Large portrait floated into the statement; the text wraps around
              its top, then runs full width below. */}
          <span className="float-left mr-7 mb-3 block aspect-[4/5] w-44 overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/15 sm:w-56 md:w-80">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={320}
              height={400}
              className="h-full w-full object-cover"
            />
          </span>
          <WordReveal
            text={`${profile.blurb} ${profile.currently}`}
            className="text-3xl leading-tight font-semibold tracking-tight md:text-5xl"
            startOffset={0.57}
            endOffset={0.2}
          />
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3 clear-both"
        >
          {links.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group relative inline-flex items-center gap-1.5 pb-1 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {label}
              <ArrowUpRightIcon aria-hidden className="size-3.5 text-cyan-300" />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-300/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
