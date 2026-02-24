import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/layout/HeroSection";
import { ServicesSection } from "@/components/layout/ServicesSection";
import { ProcessSection } from "@/components/layout/ProcessSection";
import { WorkSection } from "@/components/layout/WorkSection";
import { FooterSection } from "@/components/layout/FooterSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent w-full overflow-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <WorkSection />
      <FooterSection />
    </main>
  );
}
