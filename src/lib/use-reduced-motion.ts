"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const clientSnapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;

// Match the server during hydration, then read the visitor's preference.
// Branching on Motion's immediate client value changes the rendered tree.
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}
