import { useState } from "react";
import AppSidebar from "@/components/app/AppSidebar";
import CategoryView from "@/components/app/CategoryView";
import PersonalizedSection from "@/components/app/PersonalizedSection";
import ArticleView from "@/components/app/ArticleView";
import QuizView from "@/components/app/QuizView";

export type ViewState = 
  | { type: "categories" }
  | { type: "category"; categoryId: string }
  | { type: "article"; articleId: string }
  | { type: "quiz"; articleId: string }
  | { type: "personalized" };

const AppPage = () => {
  const [currentView, setCurrentView] = useState<ViewState>({ type: "categories" });
  const [completedArticles, setCompletedArticles] = useState<string[]>([]);
  const [personalizedData, setPersonalizedData] = useState<Record<string, string>>({});

  const handleCompleteQuiz = (articleId: string, answers: Record<string, string>) => {
    setCompletedArticles((prev) => [...prev, articleId]);
    setPersonalizedData((prev) => ({ ...prev, ...answers }));
    setCurrentView({ type: "categories" });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        completedCount={completedArticles.length}
      />
      
      <main className="flex-1 overflow-auto">
        {currentView.type === "categories" && (
          <CategoryView 
            setCurrentView={setCurrentView} 
            completedArticles={completedArticles}
          />
        )}
        {currentView.type === "category" && (
          <CategoryView 
            categoryId={currentView.categoryId}
            setCurrentView={setCurrentView} 
            completedArticles={completedArticles}
          />
        )}
        {currentView.type === "article" && (
          <ArticleView 
            articleId={currentView.articleId}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView.type === "quiz" && (
          <QuizView 
            articleId={currentView.articleId}
            onComplete={handleCompleteQuiz}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView.type === "personalized" && (
          <PersonalizedSection 
            personalizedData={personalizedData}
            completedArticles={completedArticles}
          />
        )}
      </main>
    </div>
  );
};

export default AppPage;
