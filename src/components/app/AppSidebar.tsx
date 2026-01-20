import { Button } from "@/components/ui/button";
import { ViewState } from "@/pages/App";
import { 
  BookOpen, 
  Flame, 
  Home, 
  Salad, 
  Sparkles, 
  User,
  ChevronLeft
} from "lucide-react";
import { Link } from "react-router-dom";

interface AppSidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  completedCount: number;
}

const AppSidebar = ({ currentView, setCurrentView, completedCount }: AppSidebarProps) => {
  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Flame className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl">Lookscraft</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Button 
          variant={currentView.type === "categories" ? "secondary" : "ghost"}
          className="w-full justify-start gap-3"
          onClick={() => setCurrentView({ type: "categories" })}
        >
          <Home className="w-4 h-4" />
          Home
        </Button>
        
        <div className="pt-4 pb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Categories
          </span>
        </div>
        
        <Button 
          variant={currentView.type === "category" && currentView.categoryId === "looksmaxxing" ? "secondary" : "ghost"}
          className="w-full justify-start gap-3"
          onClick={() => setCurrentView({ type: "category", categoryId: "looksmaxxing" })}
        >
          <User className="w-4 h-4" />
          Looksmaxxing
        </Button>
        
        <Button 
          variant={currentView.type === "category" && currentView.categoryId === "ancestral-eating" ? "secondary" : "ghost"}
          className="w-full justify-start gap-3"
          onClick={() => setCurrentView({ type: "category", categoryId: "ancestral-eating" })}
        >
          <Salad className="w-4 h-4" />
          Ancestral Eating
        </Button>
        
        <div className="pt-4 pb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Your Journey
          </span>
        </div>
        
        <Button 
          variant={currentView.type === "personalized" ? "secondary" : "ghost"}
          className="w-full justify-start gap-3"
          onClick={() => setCurrentView({ type: "personalized" })}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          Personalized Plan
        </Button>
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="gradient-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Progress</span>
          </div>
          <div className="text-2xl font-bold gradient-text">{completedCount}</div>
          <div className="text-xs text-muted-foreground">articles completed</div>
        </div>
      </div>
      
      <div className="p-4 border-t border-border">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default AppSidebar;
