"use client";

// The final composed landing page: the user's dark identity with the chosen
// section treatments (Poster hero, Manifesto about, the original work
// experience, Paper-style stack, the pinned Journey education, the Kinetic
// projects scroll-hijack, and the Outro footer).

import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { ExperienceSection } from "./ExperienceSection";
import { StackSection } from "./StackSection";
import { Education } from "./Education";
import { ProjectsSection } from "./ProjectsSection";
import { Footer } from "./Footer";

export function ComposedPage() {
  return (
    <div className="bg-zinc-950 text-white">
      <Navbar />
      <Hero />
      <About />
      <ExperienceSection />
      <StackSection />
      <Education />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
