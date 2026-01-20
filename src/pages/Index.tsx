import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ExperiencesSection from "@/components/landing/ExperiencesSection";
import PersonalizationSection from "@/components/landing/PersonalizationSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <section id="experiences">
          <ExperiencesSection />
        </section>
        <PersonalizationSection />
        <section id="pricing">
          <PricingSection />
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
