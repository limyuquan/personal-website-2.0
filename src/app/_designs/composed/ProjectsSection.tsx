"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView as useIntersectionInView } from "react-intersection-observer";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import { projects, type ProjectItem } from "../shared/data";
import { SectionHeading } from "./ui";

// GSAP pin-spacers re-parent React-managed DOM. Cleanup must run in the
// mutation phase (layout effect), before React detaches the node, or unmount
// throws removeChild errors. useEffect cleanup is too late for deletions.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function ProjectLinks({ project }: { project: ProjectItem }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
      >
        <FaGithub className="size-3.5" />
        Code
      </a>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-100 transition-colors hover:bg-cyan-400/20"
        >
          Live site
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      )}
    </div>
  );
}

function ProjectBody({ project }: { project: ProjectItem }) {
  return (
    <div>
      <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl xl:text-5xl">
        {project.title}
      </h3>
      <p className="mt-4 text-zinc-400">{project.description}</p>
      <ul className="mt-5 list-disc space-y-1.5 pl-5 text-sm text-zinc-500 marker:text-cyan-400/50">
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-zinc-500">
        {project.technologies.join(" / ")}
      </p>
      <div className="mt-7">
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}

function ProjectCover({ project }: { project: ProjectItem }) {
  const cover = project.imageUrls[0];
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
      {cover && (
        <Image
          src={cover}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 38rem, 100vw"
          className="object-cover"
        />
      )}
    </div>
  );
}

function ProjectsHorizontal() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              projects.length - 1,
              Math.round(self.progress * (projects.length - 1)),
            );
            setActive((prev) => (prev === index ? prev : index));
          },
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={wrapRef}
      className="relative h-[100dvh] overflow-hidden"
    >
      {projects.map((project, i) => (
        <motion.div
          key={project.title}
          aria-hidden
          initial={false}
          animate={{ opacity: active === i ? 1 : 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, rgba(${project.accentRGB}, 0.16), transparent 70%)`,
          }}
        />
      ))}
      <div className="absolute top-28 left-1/2 z-10 w-full max-w-6xl -translate-x-1/2 px-6">
        <SectionHeading lead="Featured" accent="Projects" />
      </div>
      <div ref={trackRef} className="flex h-[100dvh] items-center">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex w-screen shrink-0 items-center justify-center px-10 xl:px-16"
          >
            <div className="grid w-full max-w-6xl -translate-y-3.5 items-center gap-12 lg:grid-cols-[6fr_5fr] xl:gap-16">
              <ProjectCover project={project} />
              <ProjectBody project={project} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectStackItem({ project }: { project: ProjectItem }) {
  const { ref, inView } = useIntersectionInView({
    threshold: 0.5,
    triggerOnce: false,
  });
  return (
    <div ref={ref} className="relative">
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10"
        style={{
          background: `radial-gradient(ellipse at center, rgba(${project.accentRGB}, 0.16), transparent 70%)`,
        }}
      />
      <ProjectCover project={project} />
      <div className="mt-8">
        <ProjectBody project={project} />
      </div>
    </div>
  );
}

function ProjectsStack() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
    >
      <SectionHeading lead="Featured" accent="Projects" />
      <div className="mt-14 flex flex-col gap-24 md:mt-20">
        {projects.map((project) => (
          <ProjectStackItem key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (isDesktop && !reduced) return <ProjectsHorizontal />;
  return <ProjectsStack />;
}
