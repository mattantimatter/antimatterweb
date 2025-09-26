"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type BreakTitleProps = {
  text: string;
  align?: "left" | "center" | "right";
  className?: string;
};

// Word-by-word reveal on scroll. No external SplitText plugin required.
export default function BreakTitle({ text, align = "left", className = "" }: BreakTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const targets = containerRef.current.querySelectorAll("span[data-word]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 24, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: containerRef.current!,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <h2
      ref={containerRef}
      className={`text-3xl sm:text-title/tight font-semibold leading-tight ${alignClass} ${className}`}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} data-word className="inline-block will-change-transform">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}


