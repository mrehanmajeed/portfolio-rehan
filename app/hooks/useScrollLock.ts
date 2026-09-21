"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Freezes both native scrolling and Lenis' smooth-scroll loop while an overlay
 * is open. Restores the previous inline overflow value rather than assuming the
 * page started at `unset`, so two overlays closing out of order cannot leave the
 * body permanently locked.
 */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [locked, lenis]);
}
