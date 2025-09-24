"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { HTMLMotionProps, motion } from "motion/react";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

type Props = { linesClass?: string } & HTMLMotionProps<"h1">;

const TitleH1Anim = ({
  children,
  linesClass = "overflow-hidden py-3",
  ...props
}: Props) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const h1 = h1Ref.current;
    if (h1) {
      const ctx = gsap.context(() => {
        const title = new SplitText(h1, { type: "chars,lines", linesClass });
        gsap.fromTo(
          title.chars,
          { y: "100%" },
          {
            y: 0,
            duration: 0.7,
            stagger: 0.04,
            ease: "back.out",
            delay: 0.3,
          }
        );
        return () => title.revert();
      }, h1); // 👈 pass the element, not []
      return () => ctx.revert();
    }
  }, [linesClass]);
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={h1Ref}
      {...props}
    >
      {children}
    </motion.h1>
  );
};

export default TitleH1Anim;
