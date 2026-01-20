import { Flame } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Lookscraft</span>
          </Link>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2024 Lookscraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
