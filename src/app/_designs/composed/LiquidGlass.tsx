"use client";

// LiquidGlassSurface — a genuinely translucent "liquid glass" layer.
//
// Unlike a WebGL surface that refracts a *static* texture (and therefore reads
// as an opaque plate over a dark theme), this transmits the LIVE page behind it:
//   1. a frosted base — backdrop-filter blur + saturate — see-through on every
//      browser including iOS Safari;
//   2. a refraction warp — an SVG feTurbulence + feDisplacementMap applied via
//      backdrop-filter, so the real content bends like thick glass. Safari
//      ignores url() backdrop filters, so it simply keeps the frosted base
//      (still translucent, just without the warp);
//   3. specular sheen, an inner rim, and a faint cyan tint — the highlights
//      that read as glass.
//
// Mount it as an absolutely-positioned, pointer-events-none layer inside the
// (translucent) bar, behind the content.

import { useId } from "react";

export interface LiquidGlassSurfaceProps {
  className?: string;
  /** Displacement strength of the refraction warp, in px. 0 disables it. */
  refraction?: number;
  /** Backdrop blur radius, in px. */
  blur?: number;
  /** Backdrop saturation multiplier. */
  saturate?: number;
  /** Strength of the cyan accent tint, 0–1. */
  tint?: number;
}

export function LiquidGlassSurface({
  className,
  refraction = 26,
  blur = 7,
  saturate = 1.7,
  tint = 0.1,
}: LiquidGlassSurfaceProps) {
  // Unique, valid filter id per instance (React's useId can contain ":").
  const filterId = `liquid-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div className={className} aria-hidden>
      {/* SVG refraction filter. SourceGraphic here is the backdrop, so the
          turbulence displaces the live content behind the bar. */}
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <filter
          id={filterId}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.013"
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.3" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale={refraction}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Frosted translucency — transmits the live page everywhere incl. iOS. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backdropFilter: `blur(${blur}px) saturate(${saturate})`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(${saturate})`,
        }}
      />

      {/* Refraction warp — bends the live backdrop. Skipped on Safari (url()
          backdrop filters are unsupported there), leaving the frosted base. */}
      {refraction > 0 ? (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backdropFilter: `url(#${filterId})`,
            WebkitBackdropFilter: `url(#${filterId})`,
          }}
        />
      ) : null}

      {/* Specular sheen (top), inner rim, and a soft lower shade — the cues that
          read as a curved glass surface. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 16%, rgba(255,255,255,0) 44%, rgba(255,255,255,0) 100%)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.28), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 -10px 18px -12px rgba(0,0,0,0.45)",
        }}
      />

      {/* Faint cyan tint tying the material to the site accent. */}
      {tint > 0 ? (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(130% 220% at 50% -60%, rgba(103,232,249,${tint}), rgba(103,232,249,0) 60%)`,
          }}
        />
      ) : null}
    </div>
  );
}
