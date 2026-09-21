"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Options = {
  /** Cycle through every phrase, deleting between them. Default: false (type once, stop). */
  loop?: boolean;
  typeMs?: number;
  deleteMs?: number;
  /** Pause once a phrase is fully typed, before deleting. */
  holdMs?: number;
};

/**
 * Types `phrases` out one character at a time.
 *
 * Every phase schedules exactly one timer and clears it on cleanup, so a phrase
 * change or unmount can never leave a timer running against stale state.
 * Returns the full first phrase immediately when the visitor prefers reduced
 * motion — the text is content, so it must never be withheld.
 */
export function useTypewriter(
  phrases: readonly string[],
  { loop = false, typeMs = 100, deleteMs = 50, holdMs = 1500 }: Options = {},
) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const phrase = phrases[index] ?? "";

  useEffect(() => {
    if (prefersReducedMotion) return;

    let delay = isDeleting ? deleteMs : typeMs;
    let step: () => void;

    if (!isDeleting && text === phrase) {
      if (!loop) return; // Finished a one-shot run: schedule nothing.
      delay = holdMs;
      step = () => setIsDeleting(true);
    } else if (isDeleting && text === "") {
      delay = holdMs / 3;
      step = () => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      };
    } else {
      const length = isDeleting ? text.length - 1 : text.length + 1;
      step = () => setText(phrase.slice(0, length));
    }

    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    phrase,
    phrases.length,
    loop,
    typeMs,
    deleteMs,
    holdMs,
    prefersReducedMotion,
  ]);

  return prefersReducedMotion ? phrase : text;
}
