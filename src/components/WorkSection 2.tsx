import React from "react";
import Title from "./ui/Title";
import CaseStudies from "./ui/CaseStudies";

const WorkSection = () => {
  return (
    <div className="relative">
      <div className="flex flex-col gap-24 ">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <Title>Case studies</Title>
          <p className="text-left md:text-right font-light">
            Proven results, measurable impact—explore <br /> the transformations
            we&apos;ve delivered.
          </p>
        </div>
        <CaseStudies />
      </div>
      <div
        className="size-[600px] bg-primary rounded-full 
      absolute right-full top-1/2 -translate-y-1/2 blur-[150px] scale-x-75"
      ></div>
    </div>
  );
};

export default WorkSection;
