import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[150px]" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface mb-8">
            <Flame className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm">Your transformation is waiting</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            What Are You <span className="gradient-text">Waiting For?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10">
            Every day you wait is a day you could have been improving. Join thousands who already started their journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button variant="hero" size="xl">
                Begin Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            Free to start • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
