import { Button } from "./ui/button";
import { Home, LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface DashboardHeaderProps {
  title: string;
  userType: 'landlord' | 'scout' | 'admin';
}

export const DashboardHeader = ({ title, userType }: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="HonestSpace Logo"
                className="w-10 h-10"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">
                  HonestSpace
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {title}
                </span>
              </div>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Main App
                </Link>
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Welcome, {user?.firstName}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <div className="text-sm text-muted-foreground">
              Welcome, {user?.firstName}
            </div>
            
            <Button variant="outline" size="sm" asChild className="w-full justify-start">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Home className="w-4 h-4" />
                Main App
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};