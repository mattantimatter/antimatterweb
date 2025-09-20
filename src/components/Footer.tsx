import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import AtlantaClock from "./ui/AtlantaClock";

const Footer = () => {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="w-main mx-auto pb-5 md:pb-10 relative z-20">
        <div className="flex flex-col md:flex-row gap-20 md:gap-5 justify-between">
          <div className="flex flex-col font-light text-lg">
            <p className="text-2xl">clients@antimatterai.com</p>
            <p className="text-2xl">+1 (555) 123-4567</p>
            <div className="flex mt-3">
              <a
                href=""
                target="_blank"
                className="flex items-center border-b pb-0.5"
              >
                Linkedin <GoArrowUpRight className={`size-4`} />
              </a>
            </div>
            <div className="flex flex-col mt-10">
              <div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
                <p>Based in Atlanta, GA</p>
                <p className="opacity-50">Serving clients globally</p>
              </div>
              <h3 className="font-semibold text-5xl sm:text-6xl lg:text-8xl mt-2">
                <AtlantaClock />
              </h3>
            </div>
          </div>
          <div className="flex flex-col xs:flex-row justify-between sm:justify-normal gap-10 xs:gap-5 sm:gap-50 md:gap-20 lg:gap-30">
            <div>
              <h2 className="text-foreground/50 mb-2">Services</h2>
              <div className="flex flex-col gap-2">
                <Link href={"/"}>Web Development</Link>
                <Link href={"/"}>AI Solutions</Link>
                <Link href={"/"}>Design Agency</Link>
                <Link href={"/"}>Digital marketing</Link>
                <Link href={"/"}>Web3 Development</Link>
                <Link href={"/"}>Security Solutions</Link>
              </div>
            </div>
            <div>
              <h2 className="text-foreground/50 mb-2">Resources</h2>
              <div className="flex flex-col gap-2">
                <Link href={"/"}>Clinix AI</Link>
                <Link href={"/"}>ShadowShield AI</Link>
                <Link href={"/"}>Synergies4 AI</Link>
                <Link href={"/"}>Support</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-20 gap-10 md:gap-5 justify-between font-light">
          <p className=" text-foreground/50 text-center">
            Antimatter AI, © 2024. All rights reserved.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-primary blur-3xl scale-150">
        <div className="absolute left-0 bottom-20 w-full h-full scale-y-200 origin-bottom rounded-[100%] bg-background"></div>
      </div>
    </div>
  );
};

export default Footer;
