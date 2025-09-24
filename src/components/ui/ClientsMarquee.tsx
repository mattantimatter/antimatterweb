"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";

gsap.registerPlugin(MotionPathPlugin);

const logos = [
  "/images/clients/lowes.png",
  "/images/clients/cognizant.png",
  "/images/clients/trimble.png",
  "/images/clients/e2open.png",
  "/images/clients/toyota.png",
  "/images/clients/owasp.png",
  "/images/clients/injazat.png",
];

const ClientsMarquee: React.FC = () => {
  const containerRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<SVGImageElement>(
        containerRef.current!.querySelectorAll("image")
      );
      const spacing = 1 / items.length;

      items.forEach((item, i) => {
        const start = i * spacing;
        const end = start + 1;

        gsap.to(item, {
          duration: 20,
          repeat: -1,
          ease: "none",
          motionPath: {
            path: "#curvePath",
            align: "#curvePath",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start,
            end,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert(); // clean up animations on unmount
  }, []);

  return (
    <div className="w-full h-[600px] -mb-96 flex flex-col items-center justify-center relative">
      <div className="relative w-full h-full">
        <svg
          ref={containerRef}
          viewBox="0 0 1200 400"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[1500px] h-full absolute left-1/2 -translate-x-1/2 top-0 z-10"
        >
          <path
            id="curvePath"
            d="M0.5 86.5004C471.448 -28.4531 738.829 -27.0502 1221.5 86.5004"
            fill="transparent"
            stroke="transparent"
          />
          {logos.map((src) => (
            <image
              key={src}
              href={src}
              width="120"
              height="60"
              aria-label={`Client logo ${src.split("/").pop()?.split(".")[0]}`}
            />
          ))}
        </svg>
        <Image
          src={"/images/Fadebg.png"}
          alt="fade"
          width={300}
          height={200}
          className="top-0 -left-[130px] h-[200px] w-[300px] absolute z-20 -rotate-15"
        />
        <Image
          src={"/images/Fadebg.png"}
          alt="fade"
          width={300}
          height={200}
          className="top-0 -right-[130px] h-[200px] w-[300px] absolute z-20 rotate-195"
        />
        <Image
          src={"/images/clientsLightCurve.jpg"}
          alt="Light rays AntimatterAI"
          width={1458}
          height={86}
          className="absolute top-[90px] left-1/2 -translate-x-1/2 w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ClientsMarquee;
