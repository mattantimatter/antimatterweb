"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles3D from "./Particles3D";

const Particels = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = ref.current;
    if (!element) return;
    gsap.set(element, { opacity: 1 });
    const st = ScrollTrigger.create({
      trigger: "#service-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.to(element, { opacity: 1 - self.progress, overwrite: "auto" });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute lg:fixed opacity-100 -mt-30 sm:-mt-0 top-1/2 left-1/2 -translate-1/2 size-[500px] sm:size-[700px] 2xl:size-[900px] z-10 pointer-events-none"
      id="particles3d"
    >
      <div className="relative w-full h-full   2xl:translate-x-0">
        <Particles3D />
        <div className="size-1/2 top-1/2 left-1/2 -translate-1/2 absolute bg-primary rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default Particels;
