import { Button } from "@/components/ui/button";
import { Flame, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Lookscraft</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#experiences" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Experiences
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Link to="/app">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link to="/app">
              <Button variant="hero" size="sm">Get Started</Button>
            </Link>
          </div>
          
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container px-4 py-4 space-y-4">
            <a href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">
              How It Works
            </a>
            <a href="#experiences" className="block text-sm text-muted-foreground hover:text-foreground">
              Experiences
            </a>
            <a href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </a>
            <div className="pt-4 space-y-2">
              <Link to="/app">
                <Button variant="outline" className="w-full">Log In</Button>
              </Link>
              <Link to="/app">
                <Button variant="hero" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
