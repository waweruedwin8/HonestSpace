import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Heart, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-foreground mb-6">
                About HonestSpace
              </h1>
              <p className="text-xl text-muted-foreground">
                Africa's rental platform where every listing is verified and every review is real
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Trust First</h3>
                <p className="text-muted-foreground">
                  Every listing is physically verified by local scouts before going live
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Community Driven</h3>
                <p className="text-muted-foreground">
                  Local scouts earn money while building trust in their communities
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Africa First</h3>
                <p className="text-muted-foreground">
                  Built specifically for African rental markets and communities
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  HonestSpace was born from a simple frustration: finding honest, verified rental properties in Africa was nearly impossible. 
                  With over 60% of listings being fake or misleading, renters were spending weeks searching for homes that didn't exist.
                </p>
                <p>
                  We realized the solution wasn't just better technology—it was building trust through community. By training local scouts 
                  to verify every property and gather real insights about neighborhoods, we created Africa's first truly honest rental platform.
                </p>
                <p>
                  Today, HonestSpace helps thousands of Africans find real homes with real reviews, while creating jobs for local youth 
                  as property scouts. Every listing is verified, every review is real, and every scout earns money building trust in their community.
                </p>
              </div>
            </div>

            <div className="bg-gradient-primary rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                Join the HonestSpace Community
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Whether you're looking for a home or want to help verify properties in your area, 
                join us in building Africa's most trusted rental platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-background text-primary px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-smooth">
                  Find a Home
                </button>
                <button className="bg-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/30 transition-smooth">
                  Become a Scout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;