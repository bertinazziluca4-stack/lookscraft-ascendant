import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      {/* Animated glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
      
      <div className="container relative z-10 px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface mb-8 animate-fade-in">
          <Flame className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Transform yourself, one step at a time</span>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Welcome to{" "}
          <span className="gradient-text">Lookscraft</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          The ultimate self-improvement platform. Master looksmaxxing and ancestral eating with personalized guidance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Link to="/app">
            <Button variant="hero" size="xl">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="glass" size="xl">
            Watch How It Works
          </Button>
        </div>
        
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "10k+", label: "Active Users" },
            { value: "500+", label: "Articles" },
            { value: "98%", label: "Success Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
