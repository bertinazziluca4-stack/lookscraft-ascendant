import { BookOpen, Target, Trophy, User } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Create Your Profile",
    description: "Answer a few questions so we understand your goals and current state.",
  },
  {
    icon: BookOpen,
    title: "Learn & Progress",
    description: "Unlock articles as you advance. Complete tests to prove your understanding.",
  },
  {
    icon: Target,
    title: "Personalized Plan",
    description: "Each test builds your custom improvement roadmap based on your answers.",
  },
  {
    icon: Trophy,
    title: "Transform",
    description: "Follow your personalized path and watch yourself evolve.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A systematic approach to self-improvement that actually delivers results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              
              <div className="gradient-border rounded-2xl p-6 h-full card-hover">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-xs text-primary font-semibold mb-2">STEP {index + 1}</div>
                  <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
