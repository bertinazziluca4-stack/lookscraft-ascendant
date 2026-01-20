import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppSidebar from "@/components/app/AppSidebar";
import CategoryView from "@/components/app/CategoryView";
import PersonalizedSection from "@/components/app/PersonalizedSection";
import ArticleView from "@/components/app/ArticleView";
import QuizView from "@/components/app/QuizView";
import CommunitySection from "@/components/app/CommunitySection";
import LevelBar from "@/components/app/LevelBar";
import { useArticleProgress, completeArticle } from "@/hooks/useGamification";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export type ViewState = 
  | { type: "categories" }
  | { type: "category"; categoryId: string }
  | { type: "article"; articleId: string }
  | { type: "quiz"; articleId: string }
  | { type: "personalized" }
  | { type: "community" };

const AppPage = () => {
  const { user, loading, addXP } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentView, setCurrentView] = useState<ViewState>({ type: "categories" });
  
  const { data: articleProgress, isLoading: progressLoading } = useArticleProgress();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const completedArticles = articleProgress?.map(p => p.article_id) || [];
  const personalizedData = articleProgress?.reduce((acc, p) => {
    if (p.personalization_data) {
      return { ...acc, ...p.personalization_data };
    }
    return acc;
  }, {} as Record<string, string>) || {};

  const handleCompleteQuiz = async (articleId: string, answers: Record<string, string>) => {
    if (!user) return;
    
    try {
      await completeArticle(user.id, articleId, 100, answers);
      await addXP(25); // 25 XP per article completed
      queryClient.invalidateQueries({ queryKey: ["article-progress"] });
      queryClient.invalidateQueries({ queryKey: ["badges"] });
      setCurrentView({ type: "categories" });
    } catch (error) {
      console.error("Error completing article:", error);
    }
  };

  if (loading || progressLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        completedCount={completedArticles.length}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-4 border-b border-border">
          <LevelBar />
        </div>
        
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
        {currentView.type === "community" && (
          <CommunitySection />
        )}
      </main>
    </div>
  );
};

export default AppPage;
