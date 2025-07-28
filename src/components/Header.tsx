import { Button } from "./ui/button";
import { Menu, Home, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              HonestSpace
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/browse" className="text-foreground hover:text-primary transition-smooth">Browse</Link>
            <Link to="/how-it-works" className="text-foreground hover:text-primary transition-smooth">How it Works</Link>
            <Link to="/become-scout" className="text-foreground hover:text-primary transition-smooth">Become a Scout</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-smooth">About</Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="w-5 h-5" />
            </Button>
            
            <Button variant="outline" className="hidden md:flex">
              Sign In
            </Button>
            
            <Link to="/list-property">
              <Button variant="trust">
                List Property
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};