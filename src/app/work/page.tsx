import MainLayout from "@/components/ui/MainLayout";
import WorkComponent from "./WorkComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies and recent projects by Antimatter AI.",
};

const WorkData = [
  {
    title: "Clinix AI",
    image: "/images/CaseStudies/clinix/clinixai-1.jpg",
    tags: ["Web Design", "App Design"],
    id: 1,
    link: "/case-study/clinixAI",
  },
  {
    title: "Synergies4",
    image: "/images/CaseStudies/synergies4.jpg",
    tags: ["Web Design", "App Design"],
    id: 2,
    link: "/case-study/clinixAI",
  },
  {
    title: "Curehire",
    image: "/images/CaseStudies/curehire.jpg",
    tags: ["Web Design", "App Design"],
    id: 3,
    link: "/case-study/clinixAI",
  },
  {
    title: "OWASP",
    image: "/images/CaseStudies/owasp.jpg",
    tags: ["Web Design", "App Design"],
    id: 4,
    link: "/case-study/clinixAI",
  },
];

const WorkPage = () => {
  return (
    <MainLayout className="pt-28 md:pt-40">
      <WorkComponent WorkData={WorkData} />
    </MainLayout>
  );
};

export default WorkPage;
