import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with the basics",
    features: [
      "Access to 20 starter articles",
      "Basic progress tracking",
      "Community access",
      "Weekly tips newsletter",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Full access to transform",
    features: [
      "Unlock all 500+ articles",
      "Personalized improvement plan",
      "Advanced analytics",
      "Priority support",
      "Exclusive masterclasses",
      "1-on-1 monthly review",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Lifetime",
    price: "$299",
    period: "one-time",
    description: "Invest in yourself forever",
    features: [
      "Everything in Pro",
      "Lifetime updates",
      "Early access to new content",
      "Private community access",
      "Personal coaching sessions",
      "Custom meal plans",
    ],
    cta: "Get Lifetime",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-elevated/30 to-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Choose the plan that fits your commitment level. No hidden fees.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 ${
                plan.popular
                  ? "gradient-border glow-effect scale-105"
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary rounded-full text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/app">
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
