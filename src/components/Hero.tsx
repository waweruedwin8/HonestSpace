import { SearchBar } from "./SearchBar";
import { Button } from "./ui/button";
import { Shield, Users, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="African homes and apartments" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <Shield className="w-4 h-4 text-trust" />
              <span className="text-sm font-medium">100% Verified</span>
            </div>
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Local Scouts</span>
            </div>
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <CheckCircle className="w-4 h-4 text-verified" />
              <span className="text-sm font-medium">Real Reviews</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Find Homes,
            <br />
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Not Scams
            </span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Africa's rental platform where every listing is verified and every review is real
          </p>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="px-8 py-3 text-lg">
              Browse Properties
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-background/90 backdrop-blur-sm border-primary-foreground text-foreground hover:bg-background">
              List Your Property
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">2,500+</div>
              <div className="text-primary-foreground/80 text-sm">Verified Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">50+</div>
              <div className="text-primary-foreground/80 text-sm">Local Scouts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">100%</div>
              <div className="text-primary-foreground/80 text-sm">Trust Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};