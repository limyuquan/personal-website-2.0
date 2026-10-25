"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ComposedPage } from "./_designs/composed/ComposedPage";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });

    // One clock for scroll and GSAP: Lenis writes the scroll position and
    // ScrollTrigger pins/scrubs from it in the same frame, instead of a
    // separate rAF loop leaving pins and scrubs a frame behind.
    const tick = (time: number) => lenis.raf(time * 1000);
    const syncScrollTrigger = () => ScrollTrigger.update();
    // Pin spacers change the page height on refresh; update Lenis's scroll
    // limit now rather than after its debounced resize observer.
    const syncLimit = () => lenis.resize();

    lenis.on("scroll", syncScrollTrigger);
    ScrollTrigger.addEventListener("refresh", syncLimit);
    // Prioritised so the new scroll position lands before GSAP renders
    // this frame's scrub tweens.
    gsap.ticker.add(tick, false, true);
    // Lenis needs real elapsed time; lag smoothing would stall it after a
    // long frame and make scroll and scrubbed sections drift apart.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.removeEventListener("refresh", syncLimit);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      <ComposedPage />
    </main>
  );
}
