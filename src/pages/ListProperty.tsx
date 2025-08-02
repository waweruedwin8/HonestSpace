import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ListPropertyFlow from "@/components/ListProperty/ListPropertyFlow";

const ListProperty = () => {
  const [showFlow, setShowFlow] = useState(false);

  if (showFlow) {
    return <ListPropertyFlow />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-6">
                List Your Property on HonestSpace
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join the most trusted rental platform in Kenya. Get verified, reach genuine tenants, and grow your rental business.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Choose Your Plan</h3>
                <p className="text-muted-foreground text-sm">Select from Residential, Small Business, or Executive plans</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Pay & Verify</h3>
                <p className="text-muted-foreground text-sm">Complete payment and get your property professionally verified</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Go Live</h3>
                <p className="text-muted-foreground text-sm">Your verified listing attracts genuine, pre-screened tenants</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Why 10,000+ Landlords Choose HonestSpace
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">95% faster tenant screening</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Zero fake inquiries guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Professional photography included</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">No hidden fees or commissions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">24/7 customer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Mobile-optimized listings</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => setShowFlow(true)}
            >
              Start Listing Your Property
            </Button>

            <p className="text-sm text-muted-foreground">
              Trusted by landlords across Nairobi, Mombasa, Kisumu, and 47+ counties
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListProperty;