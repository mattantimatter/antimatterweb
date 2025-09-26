"use client";

import React from "react";
import { motion } from "motion/react";

type Props = {
  text: string;
  /** px up/down movement */
  amplitude?: number;
  /** seconds per full wave cycle of a single character */
  duration?: number;
  /** seconds between characters (controls wave travel speed) */
  stagger?: number;
  /** optional className for styling (Tailwind, etc.) */
  className?: string;
  /** slight letter spacing helps readability on bigger amplitudes */
  letterSpacingClass?: string;
};

export default function SplitTextWavy({
  text,
  amplitude = 10,
  duration = 1.6,
  stagger = 0.06,
  className = "",
  letterSpacingClass = "tracking-wide",
}: Props) {
  const chars = Array.from(text);
  const totalTravel = Math.max(0, (chars.length - 1) * stagger);

  return (
    <span aria-label={text} className={`inline-flex flex-wrap ${className}`} style={{ lineHeight: 1.1 }}>
      {chars.map((ch, i) => {
        const displayChar = ch === " " ? "\u00A0" : ch;
        const yFrames = [0, -amplitude, 0, amplitude, 0];
        return (
          <motion.span
            key={i}
            className={`inline-block ${letterSpacingClass}`}
            initial={{ y: 0 }}
            animate={{ y: yFrames }}
            transition={{ duration, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: i * stagger, repeatDelay: totalTravel }}
          >
            {displayChar}
          </motion.span>
        );
      })}
    </span>
  );
}


