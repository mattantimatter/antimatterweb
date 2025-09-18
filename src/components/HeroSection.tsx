import HeroComponent from "./ui/HeroComponent";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen z-40 overflow-x-hidden">
      <h2 className="absolute top-30 left-1/2 -translate-x-1/2 text-[14vw] font-bold text-nowrap text-center opacity-5">
        ANTIMATTER AI
      </h2>
      <HeroComponent />
    </div>
  );
};

export default HeroSection;
