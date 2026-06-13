"use client";

// Paper's stack layout on the dark theme: four typographic columns, no cards.
// Hovering a tool slides its name aside and fades in the brand-colored icon.

import { techGroups } from "../shared/data";
import { Reveal, SectionHeading } from "./ui";

export function StackSection() {
  return (
    <section
      id="tech-stack"
      className="scroll-mt-24 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <SectionHeading
          lead="Tech"
          accent="Stack"
          sub="The tools I reach for, from quick prototypes to production systems."
        />

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-14 md:mt-20 md:grid-cols-4 md:gap-x-10">
          {techGroups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 0.06}>
              <h3 className="font-mono text-xs tracking-[0.18em] text-zinc-500 uppercase">
                {group.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {group.items.map(({ name, Icon, color }) => (
                  <li
                    key={name}
                    className="group relative flex items-center text-base font-medium text-zinc-300 transition-colors hover:text-white md:text-lg"
                  >
                    <Icon
                      aria-hidden
                      className="absolute left-0 h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ color }}
                    />
                    <span className="transition-transform duration-300 group-hover:translate-x-8">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
