import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Khateeb",
            "url": "https://khateeb.dev",
            "jobTitle": "Full Stack Developer",
            "sameAs": [
              "https://github.com/khateeb",
              "https://linkedin.com/in/khateeb",
              "https://twitter.com/khateeb"
            ],
            "knowsAbout": ["Web Development", "Mobile Apps", "SEO", "Business Automation", "Blockchain"],
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "500",
              "description": "Starting price for web development services"
            }
          }),
        }}
      />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </div>
  );
}
