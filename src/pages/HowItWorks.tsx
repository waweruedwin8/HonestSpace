import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Shield, Users, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Every Listing is Verified",
      description: "Our local scouts physically visit and verify every property before it goes live. No fake listings, guaranteed."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Local Community Scouts",
      description: "Trained locals in each neighborhood verify properties and provide real insights about the area."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Real Tenant Reviews",
      description: "Only verified tenants can leave reviews about internet, water, safety, and landlord responsiveness."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Trust Badges",
      description: "Properties earn badges like 'Good Internet Zone', 'Safe at Night', and 'Family Friendly' based on real data."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              How HonestSpace Works
            </h1>
            <p className="text-xl text-muted-foreground">
              World's first rental platform where every listing is verified and every review is real
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg text-primary">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-primary rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Join thousands of Tenants who trust HonestSpace for verified, honest rentals
            </p>
            <button className="bg-background text-primary px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-smooth">
              Start Browsing
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;