import ClientsMarquee from "./ui/ClientsMarquee";

const ClientsSection = () => {
  return (
    <div className="flex flex-col gap-20" id="clients-section">
      <div className="flex flex-col text-center gap-3 items-center justify-center">
        <div className="relative">
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-radial from-transparent 
          to-background w-full h-[calc(100%+30px)] from-10%  to-90%"
          ></div>
          <h2 className="text-title">Trusted by Industry Leaders</h2>
        </div>
        <p className="font-light relative z-10">
          Powering Innovation for Companies Worldwide
        </p>
      </div>
      <ClientsMarquee />
    </div>
  );
};

export default ClientsSection;
