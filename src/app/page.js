import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-0">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </div>
  );
}
