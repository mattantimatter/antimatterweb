import MainLayout from "@/components/ui/MainLayout";
import WorkComponent from "./WorkComponent";

const WorkData = [
  {
    title: "Clinix AI",
    image: "/images/CaseStudies/clinix/clinixai-1.jpg",
    tags: ["Web Design", "App Design"],
    id: 1,
    link: "/case-study/clinixAI",
  },
  {
    title: "Clinix AI",
    image: "/images/CaseStudies/clinix/clinixai-1.jpg",
    tags: ["Web Design", "App Design"],
    id: 2,
    link: "/case-study/clinixAI",
  },
  {
    title: "Clinix AI",
    image: "/images/CaseStudies/clinix/clinixai-1.jpg",
    tags: ["Web Design", "App Design"],
    id: 3,
    link: "/case-study/clinixAI",
  },
  {
    title: "Clinix AI",
    image: "/images/CaseStudies/clinix/clinixai-1.jpg",
    tags: ["Web Design", "App Design"],
    id: 4,
    link: "/case-study/clinixAI",
  },
];

const Page = () => {
  return (
    <MainLayout className="pt-40 overflow-x-hidden">
      <WorkComponent WorkData={WorkData} />
    </MainLayout>
  );
};

export default Page;
