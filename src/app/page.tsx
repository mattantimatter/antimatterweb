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
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Antimatter AI designs and builds high-impact AI products, secure platforms, and modern web experiences.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="relative h-[0]">
        <LightRays />
      </div>
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
