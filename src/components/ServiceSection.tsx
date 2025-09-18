import ServiceCardContainer from "./ui/ServiceCardContainer";
import Title from "./ui/Title";

const ServiceSection = () => {
  return (
    <div id="service-section">
      <div className="flex w-full justify-end" id="services">
        <div className="w-3/5 flex flex-col gap-20 ">
          <div className="flex gap-43 justify-between">
            <div className="whitespace-nowrap">
              <Title>Our Services</Title>
            </div>
            <p className="font-light">
              We offer comprehensive digital solutions that transform your
              business and drive innovation across every touchpoint.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -left-[500px] top-0 h-full w-[500px] bg-gradient-to-r from-background from-75%  to-white/0 z-10"></div>
            <div className="absolute -right-[300px] wide:hidden block top-0 h-full w-[300px] bg-gradient-to-l from-background from-75%  to-white/0 z-10"></div>
            <ServiceCardContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
