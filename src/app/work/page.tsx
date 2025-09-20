"use client";
import MainLayout from "@/components/ui/MainLayout";
import TitleH1Anim from "@/components/ui/TitleH1Anim";
import { motion } from "motion/react";
import Image from "next/image";

const WorkData = [
  {
    title: "Clinix AI",
    image: "/images/CaseStudies/clinix/clinixai-1.jpg",
    tags: ["Web Design", "App Design"],
    id: 1,
  },
  {
    title: "Clinix AI",
    image: "/images/CaseStudies/clinix/clinixai-1.jpg",
    tags: ["Web Design", "App Design"],
    id: 2,
  },
  {
    title: "Clinix AI",
    image: "/images/CaseStudies/clinix/clinixai-1.jpg",
    tags: ["Web Design", "App Design"],
    id: 3,
  },
  {
    title: "Clinix AI",
    image: "/images/CaseStudies/clinix/clinixai-1.jpg",
    tags: ["Web Design", "App Design"],
    id: 4,
  },
  // Add more work items as needed
];

const page = () => {
  return (
    <MainLayout className="pt-40 overflow-x-hidden">
      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="border-b border-foreground/30 pb-3">
          <TitleH1Anim className="text-6xl lg:text-7xl xl:text-9xl font-semibold">
            WORK
          </TitleH1Anim>
        </div>
        <div className="grid grid-cols-12 gap-x-5 gap-y-20 mt-10">
          {WorkData.map(({ id, image, tags, title }) => (
            <div
              className={`${
                id === 1 ? "col-span-8" : id === 2 ? "col-span-4" : "col-span-6"
              }`}
              key={id}
            >
              <p>{id >= 10 ? id : `0${id}`}</p>
              <Image
                src={image}
                alt={title}
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
              <div className="flex justify-between mt-3">
                <h3 className="text-3xl">{title}</h3>
                <div className="flex gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="border py-0.5 px-2 border-foreground/20 rounded-full text-sm leading-7"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default page;
