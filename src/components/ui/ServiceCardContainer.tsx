"use client";
import ServiceCard, { ServiceCardProps } from "./ServiceCard";
import { useActiveIndex } from "@/store";
import { SiFigma, SiSketch, SiAdobexd, SiBlender, SiThreedotjs, SiAbstract, SiReact, SiFlutter, SiNextdotjs, SiNodedotjs, SiDocker, SiTypescript, SiHubspot, SiSalesforce, SiGoogleanalytics, SiMixpanel, SiIntercom, SiZapier, SiAmazonwebservices, SiGooglecloud, SiOkta, SiAuth0, SiTwilio, SiStripe } from "react-icons/si";

const ServiceCardContainer = () => {
  const activeIndex = useActiveIndex((state) => state.activeIndex);
  return (
    <div
      className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:gap-0 w-full max-w-[100vw] lg:max-w-none px-4 lg:px-0 overflow-x-hidden lg:overflow-visible"
      id="service-cards"
    >
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
      "Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps.",
    services: [
      "Frontend Platforms (React / Next)",
      "Backend APIs & Microservices (Node)",
      "Mobile & Cross‑platform (Flutter)",
      "CI/CD & Cloud Ops (Docker)",
    ],
    tools: ["React", "Flutter", "Next.js", "Node.js", "Docker", "TypeScript"],
    toolIcons: [
      <SiReact key="react" />,
      <SiFlutter key="flutter" />,
      <SiNextdotjs key="next" />,
      <SiNodedotjs key="node" />,
      <SiDocker key="docker" />,
      <SiTypescript key="ts" />,
    ],
  },
  {
    number: "03",
    title: "GTM Strategy",
    description:
      "Data-driven go-to-market for SaaS and AI—clear positioning, smart pricing, and repeatable growth loops from ICP to post‑launch analytics.",
    services: [
      "ICP & Segmentation",
      "Positioning, Narrative & Messaging",
      "Pricing & Packaging",
      "Demand Gen & Content Engine",
    ],
    tools: ["HubSpot", "Salesforce", "Google Analytics", "Mixpanel", "Intercom", "Zapier"],
    toolIcons: [
      <SiHubspot key="hubspot" />,
      <SiSalesforce key="salesforce" />,
      <SiGoogleanalytics key="ga" />,
      <SiMixpanel key="mixpanel" />,
      <SiIntercom key="intercom" />,
      <SiZapier key="zapier" />,
    ],
  },
  {
    number: "04",
    title: "Healthcare Apps",
    description:
      "Secure, compliant healthcare software—from telehealth to EHR integrations—built for HIPAA and auditability.",
    services: [
      "HIPAA & PHI Compliance",
      "Telehealth & Patient Portals",
      "EHR Integrations (FHIR / HL7)",
      "Audit Logging & Access Controls",
    ],
    toolIcons: [
      <SiAmazonwebservices key="aws" />,
      <SiGooglecloud key="gcp" />,
      <SiOkta key="okta" />,
      <SiAuth0 key="auth0" />,
      <SiTwilio key="twilio" />,
      <SiStripe key="stripe" />,
    ],
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
