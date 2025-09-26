"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LightRays = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = ref.current;
    if (!element) return;
    const st = ScrollTrigger.create({
      trigger: "#service-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => gsap.to(element, { opacity: 1 - self.progress, overwrite: "auto" }),
    });
    return () => st.kill();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-x-0 top-0 h-[120vh] overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Image
        src={"/images/LightRays.png"}
        alt="Light rays AntimatterAI"
        width={880}
        height={975}
        loading="eager"
        className="h-auto"
      />
    </motion.div>
  );
};

export default LightRays;
