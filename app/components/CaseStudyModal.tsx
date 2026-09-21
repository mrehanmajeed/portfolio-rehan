"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollLock } from "../hooks/useScrollLock";
import type { Project } from "../data/profile";

const SECTIONS = [
  { number: "01", label: "The Problem", key: "problem" },
  { number: "02", label: "The Solution", key: "solution" },
  { number: "03", label: "The Impact", key: "impact" },
] as const;

/**
 * Case study overlay. Rendered only while a project is selected, so the
 * mount/unmount lifecycle drives both the scroll lock and focus handling:
 * focus moves to the close button on open and returns to the triggering card
 * on close.
 */
export function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useScrollLock(true);

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-100 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-32px)] md:max-h-[85vh] overflow-y-auto overscroll-contain bg-cream text-ink p-5 sm:p-6 md:p-12 shadow-2xl rounded-sm"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute top-4 right-4 md:top-6 md:right-6 min-h-10 px-2 text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-ink transition-colors"
        >
          Close [X]
        </button>

        <h2
          id="case-study-title"
          className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold leading-[0.95] mb-2 pr-16 break-words"
        >
          {project.title}
        </h2>
        <p className="text-[9px] uppercase tracking-widest text-black/50 mb-7 md:mb-10 pr-16">
          {project.stack}
        </p>

        <div className="flex flex-col gap-7 md:gap-9">
          {SECTIONS.map(({ number, label, key }) => (
            <div key={key}>
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 md:mb-3">
                {number}. {label}
              </h3>
              <p className="text-xs sm:text-sm font-light leading-relaxed text-black/80">
                {project.caseStudy[key]}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
