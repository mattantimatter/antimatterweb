"use client";
import { animate, AnimatePresence, motion } from "motion/react";
import Button from "./Button";
import { useLoading } from "@/store";
import Image from "next/image";
import Counter from "./bits/Counter";
import { useEffect, useState } from "react";

const HeroComponent = () => {
  const finished = useLoading((s) => s.finished);
  const [projects, setProjects] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);

  useEffect(() => {
    if (finished) {
      const projANim = animate(0, 50, {
        duration: 2,
        ease: "circOut",
        onUpdate: (latest) => setProjects(Math.floor(latest)),
      });
      const satAnim = animate(0, 100, {
        duration: 2,
        ease: "circOut",
        onUpdate: (latest) => setSatisfaction(Math.floor(latest)),
      });
      return () => {
        projANim.stop();
        satAnim.stop();
      };
    }
  }, [finished]);
  if (!finished) return null;
  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col w-main m-auto  pt-10 pb-14 h-full relative z-10"
        >
          <div className="grow flex justify-center items-center ">
            <h1 className="text-7xl font-light" id="hero-title">
              <motion.div
                id="title1"
                initial={{ x: 150 }}
                animate={{ x: 0 }}
                transition={{ duration: 2, ease: "anticipate" }}
                className="pr-68"
              >
                Building <span className="italic font-bold">Digital</span>
              </motion.div>
              <motion.div
                className="text-right mt-2 pl-68"
                id="title2"
                initial={{ x: -150 }}
                animate={{ x: 0 }}
                transition={{ duration: 2, ease: "anticipate" }}
              >
                <span className="italic font-bold">Solutions</span> That Matter
              </motion.div>
            </h1>
          </div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.8, ease: "anticipate" }}
          >
            <div
              className="flex justify-between w-full items-end"
              id="hero-stats"
            >
              <div className="flex w-80 flex-col gap-10">
                <p>
                  Transforming ideas into digital reality with AI, Web3, and
                  Cutting-Edge Technology.
                </p>
                <div className="flex text-lg">
                  <Button>Start Your Project</Button>
                </div>
              </div>
              <div className="flex text-sm gap-16">
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-semibold">
                    <Counter
                      value={projects}
                      places={[10, 1]}
                      gap={2}
                      fontSize={30}
                      fontWeight={500}
                      gradientFrom="transparent"
                    />
                    <span className="text-tertiary">+</span>
                  </h3>
                  <h3>
                    Projects <br /> Delivered
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-semibold">
                    <Counter
                      value={satisfaction}
                      gap={2}
                      fontSize={30}
                      fontWeight={500}
                      gradientFrom="transparent"
                    />
                    <span className="text-tertiary">%</span>
                  </h3>
                  <h3>
                    Client
                    <br />
                    Satisfaction
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-semibold">
                    24<span className="text-tertiary">/</span>7
                  </h3>
                  <h3>
                    Support
                    <br />
                    Available
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default HeroComponent;
