import ClientsSection from "@/components/ClientsSection";
import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import ServiceSection from "@/components/ServiceSection";
import Testimonial from "@/components/Testimonial";
import LightRays from "@/components/ui/LightRays";
import Loading from "@/components/ui/Loading";
import MainLayout from "@/components/ui/MainLayout";
import WorkSection from "@/components/WorkSection";
import Interactions from "@/utils/interactions";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LightRays />
      <MainLayout className="mt-40 sm:mt-60 overflow-x-hidden">
        <ServiceSection />
        <WorkSection />
        <Testimonial />
        <ClientsSection />
        <CTASection />
      </MainLayout>
      <Loading />
      <Interactions />
    </>
  );
}
