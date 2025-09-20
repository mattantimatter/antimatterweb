"use client";
import Link from "next/link";
import HamButton from "./HamButton";
import NavButton from "./NavButton";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useState } from "react";

interface NavData {
  href: string;
  text: string;
}

interface Props {
  navData: NavData[];
}

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const HamMenu = ({ navData }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <HamButton active={active} onClick={() => setActive(!active)} />
      <AnimatePresence>
        {active && (
          <div className="fixed z-50 right-0 top-0 h-screen w-screen md:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black/70 absolute top-0 left-0 size-full"
              onClick={() => setActive(!active)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-screen max-w-[320px] w-full bg-zinc-950 p-5 sm:px-8 relative z-10"
            >
              <div className="relative flex items-center h-full">
                <div className="absolute top-0 right-0">
                  <HamButton
                    active={active}
                    onClick={() => setActive(!active)}
                  />
                </div>
                <div className="relative w-full">
                  <nav>
                    <motion.ul
                      className="flex flex-col gap-2 text-4xl font-semibold"
                      variants={listVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {navData.map((nav, index) => (
                        <motion.li
                          key={nav.text}
                          className="relative pl-10"
                          variants={itemVariants}
                        >
                          <Link
                            href={nav.href}
                            onClick={() => setActive(false)}
                          >
                            <span className="opacity-30 absolute left-0 bottom-0 text-2xl">
                              0{index + 1}
                            </span>
                            {nav.text}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </nav>
                  <div className="top-full absolute left-0 mt-20 w-full">
                    <NavButton />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamMenu;
