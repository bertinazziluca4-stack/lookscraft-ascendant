import { Button } from "@/components/ui/button";
import { ViewState } from "@/pages/App";
import { categories, getArticlesByCategory, isArticleUnlocked } from "@/lib/data";
import { BookOpen, Clock, Lock, Salad, User, CheckCircle } from "lucide-react";

interface CategoryViewProps {
  categoryId?: string;
  setCurrentView: (view: ViewState) => void;
  completedArticles: string[];
}

const CategoryView = ({ categoryId, setCurrentView, completedArticles }: CategoryViewProps) => {
  if (!categoryId) {
    // Show all categories
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground mb-8">Continue your self-improvement journey.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCurrentView({ type: "category", categoryId: category.id })}
                className="gradient-border rounded-2xl p-6 text-left card-hover group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  {category.id === "looksmaxxing" ? (
                    <User className="w-7 h-7 text-primary" />
                  ) : (
                    <Salad className="w-7 h-7 text-primary" />
                  )}
                </div>
                <h2 className="font-display text-xl font-bold mb-2">{category.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>{category.articleCount} articles</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show specific category
  const category = categories.find((c) => c.id === categoryId);
  const categoryArticles = getArticlesByCategory(categoryId);

  if (!category) return null;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentView({ type: "categories" })}
          className="mb-4"
        >
          ← Back to Categories
        </Button>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
            {category.id === "looksmaxxing" ? (
              <User className="w-7 h-7 text-primary" />
            ) : (
              <Salad className="w-7 h-7 text-primary" />
            )}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">{category.title}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {categoryArticles.map((article, index) => {
            const isUnlocked = isArticleUnlocked(article, completedArticles);
            const isCompleted = completedArticles.includes(article.id);
            
            return (
              <div
                key={article.id}
                className={`relative rounded-xl border p-5 transition-all ${
                  isUnlocked 
                    ? "border-border bg-card hover:border-primary/50 cursor-pointer card-hover" 
                    : "border-border/50 bg-card/50"
                }`}
                onClick={() => isUnlocked && setCurrentView({ type: "article", articleId: article.id })}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isCompleted 
                        ? "bg-primary/20" 
                        : isUnlocked 
                          ? "bg-secondary" 
                          : "bg-muted/50"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      ) : isUnlocked ? (
                        <span className="font-semibold text-foreground">{index + 1}</span>
                      ) : (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${!isUnlocked && "text-muted-foreground"}`}>
                        {article.title}
                      </h3>
                      <p className={`text-sm ${isUnlocked ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                        {article.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.duration}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      article.level === 1 
                        ? "bg-green-500/20 text-green-400"
                        : article.level === 2 
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-primary/20 text-primary"
                    }`}>
                      Level {article.level}
                    </div>
                  </div>
                </div>
                
                {!isUnlocked && (
                  <div className="absolute inset-0 rounded-xl bg-background/50 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      Complete previous article to unlock
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
