"use client";
import React from "react";
import { motion } from "motion/react";

type Props = { children: React.ReactNode } & React.ComponentProps<"div">;

const Title = ({ children, ...props }: Props) => {
  return (
    <div className="flex">
      <h2 className="relative text-3xl sm:text-title/tight">
        <div {...props}>
          {children}
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent from-30% to-background pointer-events-none"
            initial={{ width: "100%" }}
            whileInView={{ width: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          ></motion.div>
        </div>
      </h2>
    </div>
  );
};

export default Title;
