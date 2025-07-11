"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { HeroSection } from "./_components/HeroSection";
import { WorkExperience } from "./_components/WorkExperience";
import { TechnologyStack } from "./_components/TechnologyStack";
import { Education } from "./_components/Education";
import { PersonalProjects } from "./_components/PersonalProjects";
import { Navigation } from "./_components/Navigation";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white dark:bg-black text-black dark:text-white overflow-x-hidden"
    >
      <Navigation />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="experience">
        <WorkExperience />
      </div>
      <div id="skills">
        <TechnologyStack />
      </div>
      <div id="education">
        <Education />
      </div>
      <div id="projects">
        <PersonalProjects />
      </div>
    </motion.main>
  );
}
