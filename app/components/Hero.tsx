"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { profile } from "../data/profile";

export function Hero() {
  const typedName = useTypewriter([profile.name], { typeMs: 110 });
  const scrollTo = useSmoothScroll();

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-ink text-cream overflow-hidden flex flex-col justify-center px-6 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl mx-auto text-center"
      >
        <p className="text-[9px] md:text-[11px] uppercase tracking-[0.35em] text-cream/50 mb-6 md:mb-10">
          {profile.location}
        </p>

        <h1 className="font-cormorant text-[13vw] sm:text-[9vw] md:text-[6.2vw] leading-[0.85] tracking-tighter">
          {/* The animated copy is decorative; the full name stays in the
              accessibility tree and in the crawled HTML. */}
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true" className="grid">
            {/* Invisible twin reserves the final height so the typing
                animation cannot shift the layout. */}
            <span className="col-start-1 row-start-1 invisible">
              {profile.name}
            </span>
            <span className="col-start-1 row-start-1">
              {typedName}
              <span className="blinking-cursor" />
            </span>
          </span>
        </h1>

        <p className="mt-8 md:mt-12 max-w-2xl mx-auto text-xs md:text-sm font-light leading-relaxed text-cream/70">
          {profile.summary}
        </p>
      </motion.div>

      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12">
        <h2 className="text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold mb-1 md:mb-2">
          {profile.role}
        </h2>
        <p className="text-[8px] md:text-[10px] font-light tracking-[0.2em] text-cream/70">
          {profile.discipline}
        </p>

        <div className="flex flex-wrap gap-4 mt-5 md:mt-6">
          <a
            href="#work"
            onClick={(e) => scrollTo(e, "work")}
            className="px-5 py-2.5 bg-cream text-ink text-[9px] md:text-[10px] uppercase tracking-widest font-semibold hover:bg-cream/80 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "contact")}
            className="px-5 py-2.5 border border-cream/20 text-[9px] md:text-[10px] uppercase tracking-widest font-semibold hover:bg-cream/10 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 text-right hidden md:block">
        <p className="text-[9px] uppercase tracking-[0.2em] font-light text-cream/70 mb-1">
          Scroll to Explore
        </p>
        <div className="w-px h-12 bg-cream/50 ml-auto mr-4" />
      </div>
    </section>
  );
}
