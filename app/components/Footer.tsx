"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile, socials } from "../data/profile";

const MARQUEE_TEXT = "Get in touch";

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  // Two identical halves scrolled by exactly -50% loop seamlessly at any width,
  // unlike a fixed pixel offset.
  const marqueeHalf = (
    <div className="flex shrink-0">
      {[0, 1, 2].map((i) => (
        <span key={i} className="pr-8 md:pr-12">
          {MARQUEE_TEXT}
        </span>
      ))}
    </div>
  );

  return (
    <footer className="fixed bottom-0 left-0 w-full h-[50vh] md:h-[60vh] bg-ink z-0 flex flex-col justify-between pt-12 md:pt-16 pb-6 overflow-hidden text-cream">
      <div className="flex flex-col md:flex-row justify-between items-start w-full px-6 md:px-12 gap-8 md:gap-0">
        <div className="max-w-md">
          <p className="font-cormorant text-2xl md:text-5xl leading-[1.1] md:leading-[0.9] font-light mb-3 md:mb-4">
            Let&apos;s build
            <br />
            <span className="italic text-cream/70">something dependable.</span>
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block uppercase tracking-widest text-[10px] md:text-xs font-semibold border-b border-cream/50 pb-1 hover:border-cream transition-colors"
          >
            {profile.email}
          </a>
          {/* The server renders in UTC; a visitor east of it can already be in
              the next year on 31 December. Harmless either way, so accept the
              server's value instead of reporting a mismatch. */}
          <p
            suppressHydrationWarning
            className="mt-6 text-[9px] uppercase tracking-widest text-cream/30"
          >
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>

        <div className="flex gap-12 md:gap-16 text-[9px] md:text-[10px] uppercase tracking-widest font-medium">
          <div className="flex flex-col gap-2 md:gap-3">
            <span className="text-cream/40 mb-1">Connect</span>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-cream/80 transition-colors w-fit"
              >
                {social.label}
              </a>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-cream/80 transition-colors w-fit"
            >
              Résumé
            </a>
          </div>
          <div className="flex flex-col gap-2 md:gap-3">
            <span className="text-cream/40 mb-1">Reach</span>
            <a
              href={`tel:${profile.phoneHref}`}
              className="link-underline hover:text-cream/80 transition-colors w-fit"
            >
              {profile.phone}
            </a>
            <span className="text-cream/70">{profile.location}</span>
          </div>
        </div>
      </div>

      {/* Keep this the footer's only trailing block: the panel has a fixed
          height, so anything below the marquee gets clipped on short viewports. */}
      <div className="w-full relative mt-auto pt-4 border-t border-cream/10">
        <a
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.name}`}
          className="block w-full overflow-hidden hover:opacity-70 transition-opacity"
        >
          <motion.div
            aria-hidden="true"
            className="flex w-max whitespace-nowrap text-[18vw] md:text-[13vw] font-bold tracking-tighter leading-none uppercase"
            animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
          >
            {marqueeHalf}
            {marqueeHalf}
          </motion.div>
        </a>
      </div>
    </footer>
  );
}
