import { Shield, Users, CheckCircle, MapPin, Star, Wifi } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "100% Verified Listings",
    description: "Every property is personally verified by our local scouts before going live. No fake listings, ever.",
    color: "text-trust"
  },
  {
    icon: Users,
    title: "Local Scout Network", 
    description: "Our trained local scouts verify properties and provide employment opportunities in your community.",
    color: "text-secondary"
  },
  {
    icon: CheckCircle,
    title: "Authentic Reviews",
    description: "Real tenant reviews from verified renters. Read about internet quality, water supply, and safety.",
    color: "text-verified"
  },
  {
    icon: MapPin,
    title: "Infrastructure Mapping",
    description: "Detailed information about internet speeds, water reliability, and local amenities.",
    color: "text-accent"
  },
  {
    icon: Star,
    title: "Trust Badges",
    description: "Properties earn trust badges like 'Safe at Night' and 'Good Internet' from community verification.", 
    color: "text-primary"
  },
  {
    icon: Wifi,
    title: "Real-time Data",
    description: "Live updates on property availability, pricing, and local infrastructure improvements.",
    color: "text-trust"
  }
];

export const TrustFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Built on Trust, Verified by Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing African rentals with transparency, local employment, and community-driven verification
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card p-8 rounded-xl shadow-soft hover:shadow-medium transition-smooth border border-border hover:border-primary/20 group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-spring`}>
                  <Icon className={`w-6 h-6 text-primary-foreground`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button asChild variant="hero" size="lg" className="px-12 py-4 text-lg">
            <Link to="/become-scout">Join Our Scout Network</Link>
          </Button>
          <p className="text-muted-foreground mt-4">
            Earn KES 2,000-5,000 monthly by verifying properties in your area
          </p>
        </div>
      </div>
    </section>
  );
};