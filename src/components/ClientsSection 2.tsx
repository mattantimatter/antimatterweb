import CenterTitle from "./ui/CenterTitle";
import ClientsMarquee from "./ui/ClientsMarquee";

const ClientsSection = () => {
  return (
    <div className="flex flex-col gap-20" id="clients-section">
      <div className="flex flex-col text-center gap-3 items-center justify-center">
        <CenterTitle>Trusted by Industry Leaders</CenterTitle>
        <p className="font-light relative z-10">
          Powering Innovation for Companies Worldwide
        </p>
      </div>
      <ClientsMarquee />
    </div>
  );
};

export default ClientsSection;
