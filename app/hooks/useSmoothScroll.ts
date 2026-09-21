"use client";

import { useCallback, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Returns an anchor click handler that scrolls to `#targetId` through Lenis,
 * falling back to the native API when Lenis has not mounted or the visitor
 * prefers reduced motion.
 */
export function useSmoothScroll(onNavigate?: () => void) {
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
      event.preventDefault();
      onNavigate?.();

      const target = document.getElementById(targetId);
      if (!target) return;

      if (lenis && !prefersReducedMotion) {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 0.9,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }

      // Keep the URL shareable without letting the browser jump the scroll.
      window.history.replaceState(null, "", `#${targetId}`);
    },
    [lenis, prefersReducedMotion, onNavigate],
  );
}
