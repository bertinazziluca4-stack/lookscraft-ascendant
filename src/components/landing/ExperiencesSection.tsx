import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus R.",
    role: "6 months in",
    content: "Lookscraft changed my life. The structured approach helped me understand what I was doing wrong and how to fix it systematically.",
    rating: 5,
    avatar: "M",
  },
  {
    name: "James K.",
    role: "1 year member",
    content: "The ancestral eating section alone was worth it. I've never felt more energetic and focused. The personalized plan adapts as you progress.",
    rating: 5,
    avatar: "J",
  },
  {
    name: "Alex T.",
    role: "3 months in",
    content: "Finally a platform that takes this seriously. The locked progression keeps you accountable and the tests make sure you actually learn.",
    rating: 5,
    avatar: "A",
  },
];

const ExperiencesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-elevated/50 to-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Real <span className="gradient-text">Experiences</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Hear from people who transformed their lives with Lookscraft.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="gradient-border rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
