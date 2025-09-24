"use client";

import { AnimatePresence, motion } from "motion/react";

const TransitionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionContainer;
