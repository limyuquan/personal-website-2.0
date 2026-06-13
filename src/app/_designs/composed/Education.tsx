"use client";

// Journey: a GSAP-pinned, scroll-scrubbed walk through education. The viewport
// locks (like Projects) while the story moves from University (most recent,
// higher on the line) down to Junior College (earlier, lower on the line).
// Each stop is a Monument-style focus: a huge headline, the details, and a
// LARGE crest that is full-colour while its school is in focus and desaturates
// as you scroll away. A curved path at the base draws itself and a comet rides
// the curve's leading edge.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./ui";
import { education, type EducationItem } from "../shared/data";

// GSAP pin-spacers re-parent React-managed DOM. Cleanup must run in the
// mutation phase (layout effect), before React detaches the node, or unmount
// throws removeChild errors.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Curved journey path (viewBox 0 0 1200 200): a wave descending from the
// upper-left University node to the lower-right Junior College node.
const CURVE = "M 95 55 C 360 55 430 145 640 130 S 950 50 1105 140";
const START = { x: 95, y: 55 };
const END = { x: 1105, y: 140 };

interface StopMeta {
  item: EducationItem;
  stageLabel: string;
  headline: string;
  stat: string;
}

function Crest({
  item,
  filter,
  className,
}: {
  item: EducationItem;
  filter?: MotionValue<string>;
  className: string;
}) {
  return (
    <motion.div style={filter ? { filter } : undefined} className={className}>
      <Image
        src={item.logo}
        alt={`${item.institution} crest`}
        fill
        sizes="288px"
        className="object-contain"
      />
    </motion.div>
  );
}

function MonumentText({ meta }: { meta: StopMeta }) {
  const { item } = meta;
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.2em] text-cyan-300/80 uppercase">
        {meta.stageLabel} · {item.duration}
      </p>
      <h3 className="mt-4 text-5xl leading-[0.95] font-bold tracking-tight text-white md:text-7xl">
        {meta.headline}
      </h3>
      <p className="mt-5 text-lg text-zinc-300">
        {item.degree}
        {item.field ? `, ${item.field}` : ""}
      </p>
      <p className="mt-1 text-zinc-500">{item.institution}</p>
      <p className="mt-5 font-mono text-sm text-cyan-300">{meta.stat}</p>
      <ul className="mt-5 max-w-xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-cyan-400/60">
        {item.achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
}

// `first` is shown at the scroll start (University, upper node); `second` is
// shown at the end (Junior College, lower node).
function EducationPinned({
  first,
  second,
}: {
  first: StopMeta;
  second: StopMeta;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);
  const cometX = useMotionValue(START.x);
  const cometY = useMotionValue(START.y);
  // One mapping drives BOTH the line draw and the comet position, so the dot
  // stays pinned to the leading edge of the colored line (in sync).
  const draw = useTransform(progress, [0.05, 0.92], [0, 1]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: () => "+=" + window.innerHeight * 1.7,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => progress.set(self.progress),
      });
    }, stageRef);

    return () => ctx.revert();
  }, [progress]);

  // Comet rides the leading edge of the drawn line (same `draw` value).
  useMotionValueEvent(draw, "change", (fraction) => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(len * Math.max(0, Math.min(1, fraction)));
    cometX.set(pt.x);
    cometY.set(pt.y);
  });

  // Monument crossfade (brief blank handoff around the midpoint).
  const firstOpacity = useTransform(progress, [0, 0.4, 0.47], [1, 1, 0]);
  const firstY = useTransform(progress, [0, 0.47], [0, -40]);
  const secondOpacity = useTransform(progress, [0.53, 0.62, 1], [0, 1, 1]);
  const secondY = useTransform(progress, [0.53, 1], [40, 0]);

  // Crest colour: vivid while its school is focused, desaturated + dimmed as
  // you scroll away.
  const firstGray = useTransform(progress, [0, 0.45], [0, 1]);
  const firstBright = useTransform(progress, [0, 0.45], [1, 0.45]);
  const firstFilter = useMotionTemplate`grayscale(${firstGray}) brightness(${firstBright})`;
  const secondGray = useTransform(progress, [0.55, 1], [1, 0]);
  const secondBright = useTransform(progress, [0.55, 1], [0.45, 1]);
  const secondFilter = useMotionTemplate`grayscale(${secondGray}) brightness(${secondBright})`;

  const firstActive = useTransform(progress, [0.45, 0.55], [1, 0.35]);
  const secondActive = useTransform(progress, [0.45, 0.55], [0.35, 1]);

  return (
    <section id="education" className="relative scroll-mt-24">
      <div
        ref={stageRef}
        className="relative flex h-screen flex-col justify-center gap-10 overflow-hidden md:gap-12"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <SectionHeading accent="Education" />
        </div>

        <div className="relative mx-auto mt-6 h-[20rem] w-full max-w-6xl px-6 md:mt-10">
          <motion.div
            style={{ opacity: firstOpacity, y: firstY }}
            className="absolute inset-x-6 top-1/2 -translate-y-1/2"
          >
            <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
              <MonumentText meta={first} />
              <Crest
                item={first.item}
                filter={firstFilter}
                className="relative hidden h-56 w-56 justify-self-center md:block lg:h-64 lg:w-64"
              />
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: secondOpacity, y: secondY }}
            className="absolute inset-x-6 top-1/2 -translate-y-1/2"
          >
            <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
              <MonumentText meta={second} />
              <Crest
                item={second.item}
                filter={secondFilter}
                className="relative hidden h-56 w-56 justify-self-center md:block lg:h-64 lg:w-64"
              />
            </div>
          </motion.div>
        </div>

        {/* Curved journey */}
        <div className="mx-auto w-full max-w-5xl px-6">
          <svg viewBox="0 0 1200 200" className="h-auto w-full" fill="none">
            <defs>
              <linearGradient id="edu-journey" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            <path d={CURVE} stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
            <motion.path
              ref={pathRef}
              d={CURVE}
              stroke="url(#edu-journey)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength: draw }}
            />

            <motion.g style={{ opacity: firstActive }}>
              <circle cx={START.x} cy={START.y} r="7" fill="#67e8f9" />
              <text
                x={START.x - 14}
                y={START.y - 22}
                fill="#d4d4d8"
                fontSize="13"
                letterSpacing="2"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {first.stageLabel.toUpperCase()}
              </text>
            </motion.g>

            <motion.g style={{ opacity: secondActive }}>
              <circle cx={END.x} cy={END.y} r="7" fill="#67e8f9" />
              <text
                x={END.x + 14}
                y={END.y + 30}
                fill="#d4d4d8"
                fontSize="13"
                letterSpacing="2"
                fontFamily="var(--font-geist-mono), monospace"
                textAnchor="end"
              >
                {second.stageLabel.toUpperCase()}
              </text>
            </motion.g>

            <motion.circle
              cx={cometX}
              cy={cometY}
              r="12"
              fill="#67e8f9"
              opacity={0.25}
            />
            <motion.circle cx={cometX} cy={cometY} r="5.5" fill="#cffafe" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function StaticStop({ meta }: { meta: StopMeta }) {
  return (
    <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto]">
      <MonumentText meta={meta} />
      <Crest
        item={meta.item}
        className="relative hidden h-40 w-40 self-start justify-self-center sm:block"
      />
    </div>
  );
}

function EducationStatic({
  first,
  second,
}: {
  first: StopMeta;
  second: StopMeta;
}) {
  return (
    <section id="education" className="scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading accent="Education" />
        <div className="mt-14 space-y-16 border-l border-white/10 pl-6 md:space-y-20 md:pl-8">
          <StaticStop meta={first} />
          <StaticStop meta={second} />
        </div>
      </div>
    </section>
  );
}

export function Education() {
  const reduce = useReducedMotion() ?? false;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const nus = education[0];
  const acjc = education[1];
  if (!nus || !acjc) return null;

  // University first (most recent), then Junior College.
  const universityMeta: StopMeta = {
    item: nus,
    stageLabel: "University",
    headline: "Computer Science",
    stat: `${nus.gpaLabel} ${nus.gpa}`,
  };
  const juniorCollegeMeta: StopMeta = {
    item: acjc,
    stageLabel: "Junior College",
    headline: "A-Levels",
    stat: "87.5 Rank Points",
  };

  if (isDesktop && !reduce) {
    return (
      <EducationPinned first={universityMeta} second={juniorCollegeMeta} />
    );
  }
  return <EducationStatic first={universityMeta} second={juniorCollegeMeta} />;
}
