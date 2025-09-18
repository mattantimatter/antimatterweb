import type { Variants } from "motion";

export const translate: Variants = {
  initial: {
    y: "0",
  },
  enter: {
    y: "-100%",

    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },

    transitionEnd: {
      y: "100%",
    },
  },
  exit: {
    y: "0",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};
export const translate2: Variants = {
  initial: {
    y: "0",
  },
  enter: {
    y: "500px",
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    y: "0",
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
  },
};
