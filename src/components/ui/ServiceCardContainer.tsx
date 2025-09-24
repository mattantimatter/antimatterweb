"use client";
import ServiceCard, { ServiceCardProps } from "./ServiceCard";
import { useActiveIndex } from "@/store";
import { SiFigma, SiSketch, SiAdobexd, SiBlender, SiThreedotjs, SiAbstract } from "react-icons/si";

const ServiceCardContainer = () => {
  const activeIndex = useActiveIndex((state) => state.activeIndex);
  return (
    <div className="flex" id="service-cards">
      {serviceCardData.map((card, index) => (
        <ServiceCard
          key={card.title}
          active={activeIndex === index}
          {...card}
        />
      ))}
    </div>
  );
};

export default ServiceCardContainer;

const serviceCardData: ServiceCardProps[] = [
  {
    number: "01",
    title: "Product Design",
    description:
      "End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.",
    services: [
      "User Research & Strategy",
      "UX Flows & Wireframes",
      "UI Systems & Prototypes",
      "Design Ops & Dev Handoff",
    ],
    tools: ["Figma", "Sketch", "Adobe XD", "Blender", "Three.js", "Abstract"],
    toolIcons: [
      <SiFigma key="figma" />,
      <SiSketch key="sketch" />,
      <SiAdobexd key="xd" />,
      <SiBlender key="blender" />,
      <SiThreedotjs key="three" />,
      <SiAbstract key="abstract" />,
    ],
  },
  {
    number: "02",
    title: "Development",
    description:
      "Building robust and scalable applications tailored to your needs.",
    services: [
      "Frontend Development",
      "Backend Development",
      "Full-Stack Development",
    ],
    tools: ["React", "Node.js", "Django"],
  },
  {
    number: "03",
    title: "Marketing",
    description:
      "Crafting strategies that drive growth and enhance brand visibility.",
    services: ["SEO", "Content Marketing", "Social Media Management"],
    tools: ["Google Analytics", "SEMrush", "Hootsuite"],
  },
  {
    number: "04",
    title: "Healthcare Apps/Compliance",
    description: "Developing secure and compliant healthcare applications.",
    services: [
      "HIPAA Compliance",
      "Telemedicine Solutions",
      "Health Data Management",
    ],
    tools: ["AWS", "Azure", "Google Cloud"],
  },
  {
    number: "05",
    title: "AI Development",
    description:
      "Leveraging artificial intelligence to transform your business processes.",
    services: [
      "Machine Learning",
      "Natural Language Processing",
      "Computer Vision",
    ],
    tools: ["TensorFlow", "PyTorch", "scikit-learn"],
  },
  {
    number: "06",
    title: "Cybersecurity",
    description:
      "Protecting your digital assets with advanced cybersecurity solutions.",
    services: [
      "Threat Analysis",
      "Vulnerability Assessment",
      "Incident Response",
    ],
    tools: ["Nessus", "Wireshark", "Metasploit"],
  },
];
