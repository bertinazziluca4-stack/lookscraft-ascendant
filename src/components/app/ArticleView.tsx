import { Button } from "@/components/ui/button";
import { ViewState } from "@/pages/App";
import { getArticleById } from "@/lib/data";
import { ArrowRight, Clock } from "lucide-react";

interface ArticleViewProps {
  articleId: string;
  setCurrentView: (view: ViewState) => void;
}

const ArticleView = ({ articleId, setCurrentView }: ArticleViewProps) => {
  const article = getArticleById(articleId);

  if (!article) {
    return (
      <div className="p-8">
        <p>Article not found</p>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="font-display text-3xl font-bold mb-6 mt-8 first:mt-0">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="font-display text-xl font-bold mb-4 mt-6">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="font-semibold mb-2 mt-4">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\* - (.+)/);
        if (match) {
          elements.push(
            <li key={index} className="ml-4 mb-2">
              <strong className="text-foreground">{match[1]}</strong>
              <span className="text-muted-foreground"> - {match[2]}</span>
            </li>
          );
        }
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={index} className="ml-4 mb-1 text-muted-foreground">
            {line.slice(2)}
          </li>
        );
      } else if (line.match(/^\d\. \*\*/)) {
        const match = line.match(/^(\d)\. \*\*(.+?)\*\*(.*)$/);
        if (match) {
          elements.push(
            <li key={index} className="ml-4 mb-2">
              <span className="text-primary font-semibold">{match[1]}.</span>{" "}
              <strong>{match[2]}</strong>
              {match[3] && <span className="text-muted-foreground">{match[3]}</span>}
            </li>
          );
        }
      } else if (line.match(/^\d\. /)) {
        elements.push(
          <li key={index} className="ml-4 mb-1 text-muted-foreground">
            {line}
          </li>
        );
      } else if (line.trim() === "") {
        elements.push(<br key={index} />);
      } else {
        elements.push(
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentView({ type: "category", categoryId: article.category })}
          className="mb-6"
        >
          ← Back to {article.category === "looksmaxxing" ? "Looksmaxxing" : "Ancestral Eating"}
        </Button>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {article.duration} read
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
        
        <article className="prose prose-invert max-w-none">
          {renderContent(article.content)}
        </article>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="gradient-border rounded-xl p-6">
            <h3 className="font-display text-lg font-bold mb-2">Ready to continue?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Take a quick quiz to test your understanding and unlock the next article.
            </p>
            <Button 
              variant="hero"
              onClick={() => setCurrentView({ type: "quiz", articleId })}
            >
              Take the Quiz
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
