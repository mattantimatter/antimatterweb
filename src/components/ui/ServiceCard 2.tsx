import { useEffect, useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";

export interface ServiceCardProps {
  title: string;
  number: string;
  active?: boolean;
  description?: string;
  services?: string[];
  tools?: string[];
}

const ServiceCard = (props: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const bgcolor = props.active
    ? "bg-primary"
    : "bg-[url('/images/service-card-bg.png')] bg-cover bg-bottom-right bg-no-repeat";

  useEffect(() => {
    if (h3Ref.current && cardRef.current && card2Ref.current) {
      const h3Height = h3Ref.current.offsetHeight;
      const cardHeight = cardRef.current.offsetHeight;
      card2Ref.current.style.paddingTop = `${h3Height + 60}px`;
      if (props.active) {
        h3Ref.current.style.transform = `scale(1.3)`;
      } else {
        h3Ref.current.style.transform = `translateY(${
          cardHeight - h3Height
        }px) scale(1)`;
      }
    }
  }, [props.active]);

  return (
    <div className="service-card">
      <div
        className={`p-[1px] grow shrink-0 relative border border-zinc-700 overflow-hidden rounded-3xl w-[300px] h-[350px] sm:w-[340px] sm:h-[380px] 2xl:w-[420px] 2xl:h-[480px] ${bgcolor} duration-300 ${
          props.active ? "scale-100" : "scale-90"
        } `}
      >
        <div className={`p-6 2xl:p-10 h-full relative z-10`}>
          <div
            className={`w-full h-full duration-200 ${bgcolor} absolute inset-0 rounded-3xl`}
          ></div>

          <div className="relative h-full z-10" ref={cardRef}>
            <h3
              className={`text-xl pr-1 2xl:text-2xl font-semibold left-0 duration-800 ease-in-out top-0 absolute origin-top-left `}
              ref={h3Ref}
            >
              {props.title}
            </h3>
            <GoArrowUpRight className="size-10 absolute right-0 top-0" />
            <div
              className={`h-full ${
                props.active ? "-translate-y-full" : "pt-0"
              } duration-800 ease-in-out`}
            >
              <div className="flex flex-col justify-between h-full relative">
                <div className="flex justify-between">
                  <h4 className="text-4xl font-semibold">{props.number}</h4>
                </div>
              </div>
              <div
                className="flex flex-col justify-between h-full"
                ref={card2Ref}
              >
                <div className="flex justify-between">
                  <p className="text-sm 2xl:text-base">{props.description}</p>
                </div>
                <div className="flex gap-5 justify-between">
                  <div>
                    <h3 className="text-foreground/60 text-lg">Services</h3>
                    <div className="flex flex-col text-sm gap-1">
                      {props.services?.map((service, index) => (
                        <span key={index} className="">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-foreground/60 text-lg">Tools</h3>
                    <div className="flex flex-col text-sm gap-1">
                      {props.tools?.map((tool, index) => (
                        <span key={index} className="">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -translate-1/2 size-[500px] bg-radial from-[#B4B5ED] via-[696AAC] to-transparent"></div>
      </div>
    </div>
  );
};

export default ServiceCard;
