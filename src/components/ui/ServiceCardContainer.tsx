"use client";
import ServiceCard, { ServiceCardProps } from "./ServiceCard";
import { useActiveIndex } from "@/store";

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
    title: "Design",
    description: "Creating user-centric designs that captivate and engage.",
    services: ["UI/UX Design", "Web Development", "Mobile App"],
    tools: ["Figma", "Sketch", "Adobe XD"],
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
