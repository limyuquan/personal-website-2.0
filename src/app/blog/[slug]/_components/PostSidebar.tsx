"use client";

import { useEffect, useMemo, useState } from "react";
import { slugify } from "~/lib/format";

interface Heading {
  id: string;
  label: string;
}

// Reads the `## ` headings from the raw post, skipping code blocks.
// The label is the text before a colon, so "June 2026: the master thread" shows as "June 2026".
function getHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  let inCodeBlock = false;
  for (const line of content.split("\n")) {
    if (line.startsWith("```")) inCodeBlock = !inCodeBlock;
    if (inCodeBlock || !line.startsWith("## ")) continue;
    const text = line.slice(3).trim();
    headings.push({ id: slugify(text), label: text.split(":")[0]! });
  }
  return headings;
}

export function PostSidebar({ content }: { content: string }) {
  const headings = useMemo(() => getHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    // The active section is the last heading that has scrolled into the top third of the screen.
    function onScroll() {
      let current: string | undefined;
      for (const { id } of headings) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top < window.innerHeight / 3) current = id;
      }
      setActiveId(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden min-[1400px]:block absolute right-full top-0 h-full w-52 mr-4">
      <nav className="sticky top-32">
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">On this page</p>
        <ul className="border-l border-white/10">
          {headings.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block -ml-px border-l py-1.5 pl-4 text-sm transition-colors ${
                  id === activeId
                    ? "border-cyan-400 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
