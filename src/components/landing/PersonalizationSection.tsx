import { Brain, Dna, LineChart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "The platform learns from your answers and adjusts content to your level.",
  },
  {
    icon: Dna,
    title: "Unique to You",
    description: "Your improvement plan is crafted based on your specific needs and goals.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Visual insights into your journey and what areas need more focus.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "AI-powered suggestions for your next steps based on your progress.",
  },
];

const PersonalizationSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="container px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              The Platform <span className="gradient-text">Personalizes</span> With You
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unlike generic guides, Lookscraft adapts to your unique situation. Every test you take, every question you answer builds a more accurate picture of what you need to improve.
            </p>
            
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card/50 hover:bg-card transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {/* Mock personalization dashboard */}
            <div className="gradient-border rounded-2xl p-6 glow-effect">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-lg">Your Progress</h3>
                  <span className="text-sm text-primary">Level 7</span>
                </div>
                
                {[
                  { label: "Skin Health", progress: 72, color: "bg-primary" },
                  { label: "Nutrition", progress: 45, color: "bg-accent" },
                  { label: "Posture", progress: 88, color: "bg-primary" },
                  { label: "Mindset", progress: 60, color: "bg-accent" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="text-muted-foreground">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="text-sm text-primary font-semibold mb-1">Next Recommendation</div>
                  <p className="text-sm text-muted-foreground">Complete "Advanced Facial Structure" to unlock posture mastery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizationSection;
