import { IconType } from "react-icons";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { RiBitCoinLine } from "react-icons/ri";

interface ServiceItemProps {
  title: string;
  desc?: string;
  images?: string[];
}

export type ServiceProps = {
  icon: IconType;
  link: string;
  title: string;
  pageTitle?: React.ReactNode;
  description?: string;
  tagline?: string[];
  items: ServiceItemProps[];
};

export const ServicesData: ServiceProps[] = [
  {
    icon: MdOutlineDesignServices,
    title: "Design",
    link: "/design-agency",
    pageTitle: (
      <>
        You think it. <br /> We{" "}
        <span className="text-secondary font-bold italic mr-3">DESIGN</span> it.
      </>
    ),
    description:
      "From initial sketches to prototypes fully custom apps, we're your design partner. With a modern approach and cutting-edge tools, we shape every pixel with precision because every detail matters.",
    tagline: [
      "Human creativity.",
      "AI-enhanced speed.",
      "Designs that think ahead.",
    ],
    items: [
      {
        title: "Branding",
        desc: "We forge unique visual identities and build brand strategies that resonate, whether you're a startup or an established brand.",
      },
      {
        title: "UI/UX Design",
        desc: "Our intuitive designs enhance user engagement and empower businesses to achieve their goals through seamless digital experiences.",
      },
      {
        title: "Visual Storytelling",
        desc: "A brand is just the beginning; with impactful visual design, we elevate your identity to create a lasting impression.",
      },
      {
        title: "3D & Motion Design",
        desc: "Our team of motion, interaction, and 3D designers adds vitality to your brand, making your website and app dynamic and memorable.",
      },
      {
        title: "Web Design",
        desc: "We design stunning websites and landing pages that not only tell your brand’s story but also build trust and drive conversions.",
      },
      {
        title: "Product Design",
        desc: "We conceptualize and prototype diverse applications—from web and mobile to AR/VR and beyond—crafting the future of digital products.",
      },
    ],
  },
  {
    icon: FaCode,
    title: "Development",
    link: "/development-agency",
    pageTitle: (
      <>
        Software Developers <br /> you can{" "}
        <span className="text-secondary font-bold italic mr-3">count on.</span>
      </>
    ),
    description:
      "From concept to digital reality, we build across all devices, languages, and platforms. Every line of code is crafted with care, ensuring seamless functionality and exceptional performance. Here, every detail matters.",
    tagline: ["We make tech that", "just makes sense."],
    items: [
      {
        title: "Web Development",
        desc: "We create everything from engaging websites to powerful web applications, ensuring a seamless user experience across all platforms, including e-commerce solutions that drive results.",
      },
      {
        title: "App Development",
        desc: "We design and develop intuitive apps for mobile devices, wearables, AR/VR, in-car systems, and more, delivering a consistent experience across all platforms.",
      },
      {
        title: "API Development",
        desc: "Our robust API development and integration services connect your systems and enhance functionality with seamless third-party integrations.",
      },
      {
        title: "Cloud & DevOps",
        desc: "We provide cloud-based development combined with DevOps practices to ensure your applications are scalable, secure, and efficiently managed.",
      },
      {
        title: "AI Development",
        desc: "We harness the power of artificial intelligence to automate processes, enhance decision-making, and unlock new possibilities for your business.",
      },
      {
        title: "Data Engineering",
        desc: "We design and implement data architectures that empower your business, transforming raw data into actionable insights and driving smarter decisions.",
      },
    ],
  },
  {
    icon: BsGraphUpArrow,
    link: "/marketing-agency",
    title: "Marketing",
    pageTitle: (
      <>
        <span className="text-secondary font-bold italic mr-3">
          Drive Conversions,
        </span>{" "}
        <br />
        Not Useless Traffic
      </>
    ),
    description:
      "From strategy to execution, we craft marketing campaigns that resonate across all platforms. Every piece of content is designed with purpose, ensuring maximum impact and engagement. Here, every interaction matters.",
    tagline: ["Campaigns people connect with."],
    items: [
      {
        title: "Digital Marketing",
        desc: "We craft comprehensive digital marketing strategies tailored to your business goals, ensuring a cohesive approach across all channels",
      },
      {
        title: "SEO",
        desc: "Our SEO services improve your website’s visibility, driving organic traffic and improving your rankings on search engines.",
      },
      {
        title: "Content Marketing",
        desc: "Our team creates compelling content that resonates with your audience, drives engagement, and boosts brand visibility.",
      },
      {
        title: "Pay-Per-Click (PPC) ",
        desc: "We design and manage targeted PPC campaigns that maximize ROI, delivering highly qualified leads directly to your business.",
      },
      {
        title: "Social Media",
        desc: "We manage your social media presence across platforms, creating and curating content that amplifies your brand.",
      },
      {
        title: "Email Marketing",
        desc: "We develop and execute email marketing campaigns that nurture leads, engage customers, and drive conversions.",
      },
    ],
  },
  {
    icon: LuBrain,
    link: "/ai-development",
    title: "AI",
    pageTitle: (
      <>
        AI Development with <br />
        <span className="text-secondary font-bold italic mr-3">
          Human Touch
        </span>
      </>
    ),
    description:
      "From concept to intelligent systems, we build AI that thinks ahead. Leveraging advanced machine learning and neural networks, our solutions integrate seamlessly, making smarter decisions with minimal human input. Here, every decision matters.",
    tagline: ["AI that works,", "driven by expert logic."],
    items: [
      {
        title: "Predictive Analytics",
        desc: "Transform your data interactions with predictive insights. Our solutions analyze trends and patterns, enabling proactive decision-making that drives business success.",
      },
      {
        title: "Recommendation Systems",
        desc: "Enhance engagement with personalized recommendations. Our AI-driven engines tailor content, products, and services to individual user preferences.",
      },
      {
        title: "AutoML Solutions",
        desc: "Accelerate AI deployment with AutoML. We simplify model development using automated tools, ensuring faster, more efficient implementation",
      },
      {
        title: "Chatbots",
        desc: "Streamline customer interactions with intelligent AI. Our chatbots and virtual assistants handle tasks efficiently, improving service and satisfaction.",
      },
      {
        title: "Computer Vision",
        desc: "Harness the potential of visual data. Our computer vision solutions identify patterns, detect anomalies, and automate processes across industries.",
      },
      {
        title: "Natural Language (NLP)",
        desc: "Unlock the power of language with our NLP services. We develop applications that understand and interpret human language, turning unstructured data into actionable insights.",
      },
    ],
  },
  {
    icon: RiBitCoinLine,
    link: "/web3-development",
    title: "Web3",
    pageTitle: (
      <>
        Web3 Solutions
        <br />
        that
        <span className="text-secondary font-bold italic mr-3">Make Sense</span>
      </>
    ),
    description:
      "From concept to decentralized solutions, we build Web3 applications that empower users across all platforms. Every smart contract and blockchain interaction is crafted with precision, ensuring security, transparency, and innovation. Here, every transaction matters.",
    tagline: ["Decentralized,", "powered by everyone."],
    items: [
      {
        title: "Decentralized App",
        desc: "We create DApps that operate on blockchain technology, enabling transparent, secure, and decentralized operations for various industries.",
      },
      {
        title: "Smart Contract",
        desc: "We design and deploy smart contracts that automate agreements and transactions on the blockchain, ensuring accuracy and trust.",
      },
      {
        title: "Tokenization Services",
        desc: "We help you create and manage digital tokens for assets, loyalty programs, or new economies within your platform.",
      },
      {
        title: "DeFi Solutions",
        desc: "We build DeFi platforms that enable decentralized lending, borrowing, and trading, empowering users with more financial control.",
      },
      {
        title: "Blockchain Integration",
        desc: "We integrate blockchain solutions into existing systems, enhancing security, transparency, and efficiency across your business processes.",
      },
      {
        title: "NFT Development",
        desc: "We develop and launch NFTs and marketplaces, allowing creators to tokenize and sell their digital assets securely and transparently.",
      },
    ],
  },
];
