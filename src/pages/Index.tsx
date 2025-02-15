
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SubHeroSection from "@/components/sections/SubHeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MetricsSection from "@/components/sections/MetricsSection";
import WaitlistSection from "@/components/sections/WaitlistSection";

const Index = () => {
  const scrollToWaitlist = () => {
    const waitlistElement = document.getElementById('waitlist');
    waitlistElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground font-plus-jakarta">
      <Navbar />
      <HeroSection onWaitlistClick={scrollToWaitlist} />
      <SubHeroSection />
      <FeaturesSection />
      <MetricsSection />
      <WaitlistSection />
      <Footer currentYear={currentYear} />
    </div>
  );
};

export default Index;
