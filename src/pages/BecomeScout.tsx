import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, DollarSign, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const BecomeScout = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Earn $2-5 Per Property",
      description: "Get paid for every property you verify in your neighborhood"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Hours",
      description: "Work on your own schedule, perfect for students and part-time workers"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Local Focus",
      description: "Work in your own neighborhood where you know the area best"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Training & Certification",
      description: "Get professional training and certification as a HonestSpace Scout"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Become a HonestSpace Scout
            </h1>
            <p className="text-xl text-muted-foreground">
              Help build trust in rentals while earning money in your local community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-card rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              How to Become a Scout
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Apply Online</h3>
                  <p className="text-muted-foreground">Fill out our application form with your details and local area knowledge</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Complete Training</h3>
                  <p className="text-muted-foreground">Take our online training course on property verification and safety</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Start Earning</h3>
                  <p className="text-muted-foreground">Begin verifying properties in your area and earning money</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button variant="trust" size="lg">
                Apply to Become a Scout
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeScout;