import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ViewState } from "@/pages/App";
import { getArticleById } from "@/lib/data";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizViewProps {
  articleId: string;
  onComplete: (articleId: string, answers: Record<string, string>) => void;
  setCurrentView: (view: ViewState) => void;
}

// Quiz questions per article
const quizData: Record<string, { comprehension: { question: string; options: string[]; correct: number }[]; personalization: { question: string; options: string[]; key: string }[] }> = {
  "lm-1": {
    comprehension: [
      {
        question: "What are the three pillars of looksmaxxing mentioned in the article?",
        options: ["Diet, Exercise, Sleep", "Skincare, Bone Structure, Body Composition", "Posture, Mewing, Cardio", "Supplements, Surgery, Grooming"],
        correct: 1,
      },
    ],
    personalization: [
      {
        question: "What's your primary goal with looksmaxxing?",
        options: ["Improve my skin", "Enhance facial structure", "Build a better body", "All of the above"],
        key: "primary_goal",
      },
    ],
  },
  "lm-2": {
    comprehension: [
      {
        question: "What is the most important step in a morning skincare routine according to the article?",
        options: ["Vitamin C serum", "Moisturizer", "Sunscreen", "Cleanser"],
        correct: 2,
      },
    ],
    personalization: [
      {
        question: "How would you describe your current skin?",
        options: ["Clear with minor issues", "Acne-prone", "Dry/Sensitive", "Oily"],
        key: "skin_type",
      },
    ],
  },
  "lm-3": {
    comprehension: [
      {
        question: "What's the correct way to start mewing?",
        options: ["Push tongue against teeth", "Say 'sing' and note tongue position", "Open mouth wide", "Breathe through mouth"],
        correct: 1,
      },
    ],
    personalization: [
      {
        question: "Do you currently practice proper tongue posture?",
        options: ["Yes, consistently", "Sometimes", "Rarely", "I wasn't aware of it"],
        key: "mewing_status",
      },
    ],
  },
  "lm-4": {
    comprehension: [
      {
        question: "What causes forward head posture?",
        options: ["Sleeping wrong", "Looking at screens", "Walking too much", "Eating poorly"],
        correct: 1,
      },
    ],
    personalization: [
      {
        question: "How many hours per day do you spend sitting?",
        options: ["Less than 4 hours", "4-6 hours", "6-8 hours", "More than 8 hours"],
        key: "sitting_hours",
      },
    ],
  },
  "lm-5": {
    comprehension: [
      {
        question: "Why should you be careful with jaw exercises?",
        options: ["They don't work", "Can cause TMJ issues", "They're expensive", "Need equipment"],
        correct: 1,
      },
    ],
    personalization: [
      {
        question: "Have you tried any facial exercises before?",
        options: ["Yes, regularly", "A few times", "Never", "Interested to start"],
        key: "facial_exercise_exp",
      },
    ],
  },
  "ae-1": {
    comprehension: [
      {
        question: "What should you avoid according to ancestral eating principles?",
        options: ["Organ meats", "Seed oils", "Bone broth", "Fatty fish"],
        correct: 1,
      },
    ],
    personalization: [
      {
        question: "How would you describe your current diet?",
        options: ["Standard American Diet", "Mostly whole foods", "Keto/Low carb", "Vegetarian/Vegan"],
        key: "current_diet",
      },
    ],
  },
  "ae-2": {
    comprehension: [
      {
        question: "Why is liver called 'nature's multivitamin'?",
        options: ["It's very filling", "It's the most nutrient-dense food", "It's cheap", "It tastes good"],
        correct: 1,
      },
    ],
    personalization: [
      {
        question: "Have you ever eaten organ meats?",
        options: ["Yes, regularly", "Occasionally", "Never but willing to try", "Not interested"],
        key: "organ_meat_exp",
      },
    ],
  },
  "ae-3": {
    comprehension: [
      {
        question: "What's the main problem with seed oils?",
        options: ["They're expensive", "High in Omega-6 causing inflammation", "They taste bad", "Low in calories"],
        correct: 1,
      },
    ],
    personalization: [
      {
        question: "What oils do you currently cook with?",
        options: ["Butter/Ghee/Tallow", "Olive oil only", "Vegetable/Seed oils", "Mix of everything"],
        key: "cooking_oils",
      },
    ],
  },
  "ae-4": {
    comprehension: [
      {
        question: "What's the benefit of making bone broth?",
        options: ["It's very tasty", "Rich in collagen and minerals, great for gut health", "It's quick to make", "Low in nutrients"],
        correct: 1,
      },
    ],
    personalization: [
      {
        question: "Do you make bone broth at home?",
        options: ["Yes, weekly", "Sometimes", "Never tried", "Interested to learn"],
        key: "bone_broth_habit",
      },
    ],
  },
  "ae-5": {
    comprehension: [
      {
        question: "What's a sign of poor digestion mentioned in the article?",
        options: ["Being hungry", "Bloating after meals", "Weight loss", "Better sleep"],
        correct: 1,
      },
    ],
    personalization: [
      {
        question: "Do you experience digestive issues?",
        options: ["Rarely or never", "Sometimes", "Frequently", "After certain foods"],
        key: "digestion_issues",
      },
    ],
  },
};

const QuizView = ({ articleId, onComplete, setCurrentView }: QuizViewProps) => {
  const article = getArticleById(articleId);
  const quiz = quizData[articleId];
  
  const [step, setStep] = useState<"comprehension" | "personalization" | "complete">("comprehension");
  const [comprehensionAnswer, setComprehensionAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [personalizationAnswers, setPersonalizationAnswers] = useState<Record<string, string>>({});

  if (!article || !quiz) {
    return (
      <div className="p-8">
        <p>Quiz not found</p>
      </div>
    );
  }

  const handleComprehensionSubmit = () => {
    if (comprehensionAnswer === null) return;
    const correct = comprehensionAnswer === quiz.comprehension[0].correct;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(() => setStep("personalization"), 1500);
    }
  };

  const handlePersonalizationSubmit = () => {
    onComplete(articleId, personalizationAnswers);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentView({ type: "article", articleId })}
          className="mb-6"
        >
          ← Back to Article
        </Button>
        
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === "comprehension" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
            }`}>
              1
            </div>
            <div className="h-px flex-1 bg-border" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === "personalization" ? "bg-primary text-primary-foreground" : 
              step === "complete" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Understanding Check</span>
            <span>Personalization</span>
          </div>
        </div>

        {step === "comprehension" && (
          <div className="gradient-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold mb-2">Quick Check</h2>
            <p className="text-muted-foreground mb-6">Let's make sure you understood the key concepts.</p>
            
            <div className="space-y-4">
              <p className="font-semibold">{quiz.comprehension[0].question}</p>
              
              <div className="space-y-3">
                {quiz.comprehension[0].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (isCorrect === null) {
                        setComprehensionAnswer(index);
                      }
                    }}
                    disabled={isCorrect !== null}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      comprehensionAnswer === index
                        ? isCorrect === null
                          ? "border-2 border-primary bg-primary/10"
                          : isCorrect
                            ? "border-2 border-green-500 bg-green-500/10"
                            : "border-2 border-red-500 bg-red-500/10"
                        : "border border-border hover:border-primary/50 bg-card"
                    } ${isCorrect !== null && "cursor-not-allowed"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {isCorrect !== null && (
                <div className={`flex items-center gap-2 p-4 rounded-xl ${
                  isCorrect ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                }`}>
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Correct! Moving to personalization...</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Not quite. Try reading the article again.</span>
                    </>
                  )}
                </div>
              )}
              
              {isCorrect === null && (
                <Button 
                  variant="hero" 
                  className="w-full mt-4"
                  onClick={handleComprehensionSubmit}
                  disabled={comprehensionAnswer === null}
                >
                  Check Answer
                </Button>
              )}
              
              {isCorrect === false && (
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setCurrentView({ type: "article", articleId })}
                >
                  Re-read Article
                </Button>
              )}
            </div>
          </div>
        )}

        {step === "personalization" && (
          <div className="gradient-border rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold mb-2">Personalize Your Journey</h2>
            <p className="text-muted-foreground mb-6">Help us tailor your improvement plan.</p>
            
            <div className="space-y-6">
              {quiz.personalization.map((q) => (
                <div key={q.key} className="space-y-3">
                  <p className="font-semibold">{q.question}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {q.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setPersonalizationAnswers(prev => ({ ...prev, [q.key]: option }))}
                        className={`p-4 rounded-xl text-sm text-left transition-all ${
                          personalizationAnswers[q.key] === option
                            ? "border-2 border-primary bg-primary/10"
                            : "border border-border hover:border-primary/50 bg-card"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              <Button 
                variant="hero" 
                className="w-full mt-4"
                onClick={handlePersonalizationSubmit}
                disabled={Object.keys(personalizationAnswers).length < quiz.personalization.length}
              >
                Complete & Unlock Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;
