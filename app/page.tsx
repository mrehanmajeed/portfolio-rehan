"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // The hero types itself in on load, so a restored scroll position would
    // drop the visitor mid-page against an unfinished animation.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    // lerp is how much of the remaining distance Lenis closes each frame.
    // Lower drifts and feels heavy; 0.12 tracks the wheel closely while still
    // easing. Smoothing is handed back to the browser under reduced motion.
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        smoothWheel: !prefersReducedMotion,
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-cream focus:text-ink focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>

      <Header />

      {/* The footer is fixed behind this panel; the bottom margin is what
          uncovers it as the page ends. */}
      <main
        id="main"
        className="relative z-10 w-full max-w-full overflow-x-clip mb-[50vh] md:mb-[60vh] shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-cream"
      >
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </ReactLenis>
  );
}
