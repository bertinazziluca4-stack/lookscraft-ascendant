import { articles } from "@/lib/data";
import { AlertTriangle, CheckCircle, Sparkles, TrendingUp } from "lucide-react";

interface PersonalizedSectionProps {
  personalizedData: Record<string, string>;
  completedArticles: string[];
}

const getRecommendations = (data: Record<string, string>) => {
  const recommendations: { type: "issue" | "improvement"; title: string; description: string }[] = [];

  // Analyze personalization data and give recommendations
  if (data.skin_type === "Acne-prone") {
    recommendations.push({
      type: "issue",
      title: "Acne-Prone Skin",
      description: "Focus on a consistent skincare routine with salicylic acid and niacinamide. Avoid touching your face and change pillowcases weekly.",
    });
  }

  if (data.sitting_hours === "More than 8 hours" || data.sitting_hours === "6-8 hours") {
    recommendations.push({
      type: "issue",
      title: "Excessive Sitting",
      description: "You sit for long periods which affects posture. Set hourly reminders to stretch and do the posture exercises from the article.",
    });
  }

  if (data.mewing_status === "I wasn't aware of it" || data.mewing_status === "Rarely") {
    recommendations.push({
      type: "improvement",
      title: "Start Mewing Practice",
      description: "Begin practicing proper tongue posture. Start with awareness—check your tongue position hourly until it becomes habit.",
    });
  }

  if (data.cooking_oils === "Vegetable/Seed oils" || data.cooking_oils === "Mix of everything") {
    recommendations.push({
      type: "issue",
      title: "Switch Your Cooking Oils",
      description: "You're using inflammatory seed oils. Switch to butter, ghee, tallow, or olive oil for better health outcomes.",
    });
  }

  if (data.organ_meat_exp === "Never but willing to try" || data.organ_meat_exp === "Not interested") {
    recommendations.push({
      type: "improvement",
      title: "Try Organ Meats",
      description: "Organ meats are nature's multivitamin. Start with beef heart (tastes like steak) or freeze liver into pill-sized pieces.",
    });
  }

  if (data.digestion_issues === "Frequently" || data.digestion_issues === "After certain foods") {
    recommendations.push({
      type: "issue",
      title: "Improve Digestion",
      description: "Focus on chewing thoroughly, eating mindfully, and incorporating fermented foods like sauerkraut into your diet.",
    });
  }

  if (data.current_diet === "Standard American Diet") {
    recommendations.push({
      type: "issue",
      title: "Diet Overhaul Needed",
      description: "Your current diet is far from optimal. Start by eliminating processed foods and seed oils before adding in nutrient-dense foods.",
    });
  }

  if (data.primary_goal === "All of the above") {
    recommendations.push({
      type: "improvement",
      title: "Holistic Approach",
      description: "Great that you want to improve everything! Focus on one area at a time—start with skincare as it shows results fastest.",
    });
  }

  return recommendations;
};

const PersonalizedSection = ({ personalizedData, completedArticles }: PersonalizedSectionProps) => {
  const recommendations = getRecommendations(personalizedData);
  const completedArticleData = articles.filter((a) => completedArticles.includes(a.id));
  
  const looksmaxxingProgress = completedArticleData.filter((a) => a.category === "looksmaxxing").length;
  const ancestralProgress = completedArticleData.filter((a) => a.category === "ancestral-eating").length;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Your Personalized Plan</h1>
            <p className="text-muted-foreground">Based on your quiz responses</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="gradient-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Looksmaxxing Progress
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Articles Completed</span>
                <span className="text-primary font-semibold">{looksmaxxingProgress}/5</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(looksmaxxingProgress / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="gradient-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Ancestral Eating Progress
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Articles Completed</span>
                <span className="text-primary font-semibold">{ancestralProgress}/5</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${(ancestralProgress / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">Your Recommendations</h2>
            <div className="grid gap-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-5 border ${
                    rec.type === "issue"
                      ? "border-yellow-500/30 bg-yellow-500/5"
                      : "border-primary/30 bg-primary/5"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      rec.type === "issue" ? "bg-yellow-500/20" : "bg-primary/20"
                    }`}>
                      {rec.type === "issue" ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : completedArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold mb-2">No Data Yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Complete articles and quizzes to build your personalized improvement plan. Each quiz helps us understand your unique situation.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-xl font-bold mb-2">You're On Track!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Based on your responses, you're doing well. Keep completing articles to refine your personalized recommendations.
            </p>
          </div>
        )}

        {/* Your Responses */}
        {Object.keys(personalizedData).length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-xl font-bold mb-4">Your Profile</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(personalizedData).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-card border border-border p-4">
                  <div className="text-xs text-muted-foreground mb-1 capitalize">
                    {key.replace(/_/g, " ")}
                  </div>
                  <div className="font-medium text-sm">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedSection;
