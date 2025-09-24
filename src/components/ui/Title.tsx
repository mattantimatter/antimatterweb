"use client";
import React from "react";
import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  /**
   * Where the shadow reveal should start from the left edge of the title.
   * Accepts any valid CSS length (e.g., "10ch", "120px", "35%")
   */
  revealStart?: string;
} & React.ComponentProps<"div">;

const Title = ({ children, revealStart = "0px", ...props }: Props) => {
  return (
    <div className="flex">
      <h2 className="relative text-3xl sm:text-title/tight">
        <div {...props}>
          {children}
          <motion.div
            className="absolute top-0 bottom-0 right-0 h-full pointer-events-none z-10 bg-gradient-to-r from-background from-40% to-transparent"
            style={{ left: revealStart, transformOrigin: "left" }}
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          ></motion.div>
        </div>
      </h2>
    </div>
  );
};

export default Title;
