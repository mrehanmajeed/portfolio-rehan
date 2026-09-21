"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollLock } from "../hooks/useScrollLock";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { featuredProjects, navLinks, profile } from "../data/profile";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const scrollTo = useSmoothScroll(closeMenu);
  useScrollLock(isMenuOpen);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-6 md:px-8 py-6 z-90 mix-blend-difference flex justify-between items-center text-[10px] md:text-[11px] uppercase tracking-widest font-medium text-cream pointer-events-none">
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "home")}
          className="pointer-events-auto link-underline"
        >
          {profile.name}
        </a>

        <nav
          aria-label="Primary"
          className="hidden md:flex gap-10 pointer-events-auto items-center"
        >
          {navLinks.map(({ label, target }) =>
            target === "work" ? (
              <div key={target} className="relative group py-4 -my-4">
                <a
                  href="#work"
                  onClick={(e) => scrollTo(e, "work")}
                  className="link-underline"
                >
                  {label}
                </a>
                <div className="absolute top-full left-0 pt-2 flex flex-col gap-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-500 ease-out">
                  {featuredProjects.map((project) => (
                    <a
                      key={project.slug}
                      href={`#project-${project.slug}`}
                      onClick={(e) => scrollTo(e, `project-${project.slug}`)}
                      className="text-[9px] whitespace-nowrap hover:opacity-50 transition-opacity"
                    >
                      {project.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={target}
                href={`#${target}`}
                onClick={(e) => scrollTo(e, target)}
                className="link-underline"
              >
                {label}
              </a>
            ),
          )}
        </nav>

        <div className="pointer-events-auto flex items-center gap-6">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block border border-cream/30 px-4 py-2 hover:bg-cream hover:text-ink transition-colors rounded-sm"
          >
            Download CV
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="md:hidden min-h-11 min-w-11 px-3 flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-navigation"
            id="mobile-navigation"
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-80 bg-ink flex flex-col items-center justify-center md:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex flex-col items-center gap-8 text-cream"
            >
              {navLinks.map(({ label, target }) => (
                <a
                  key={target}
                  href={`#${target}`}
                  onClick={(e) => scrollTo(e, target)}
                  className="font-cormorant text-4xl tracking-tight"
                >
                  {label}
                </a>
              ))}
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-widest border border-cream/30 px-6 py-3 mt-4"
              >
                Download CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
