import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Shield, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ListProperty = () => {
  const plans = [
    {
      name: "Residential",
      price: "$1",
      description: "Perfect for individual landlords",
      features: [
        "1 property listing",
        "Scout verification included",
        "30-day active listing",
        "Basic support",
        "Mobile-friendly listing page"
      ],
      recommended: false
    },
    {
      name: "Small Business",
      price: "$5",
      description: "For small property managers",
      features: [
        "Up to 5 property listings",
        "Scout verification included",
        "60-day active listings",
        "Priority support",
        "Analytics dashboard",
        "Professional photos option"
      ],
      recommended: true
    },
    {
      name: "Executive",
      price: "$50",
      description: "For premium properties",
      features: [
        "Up to 20 property listings",
        "Premium scout verification",
        "90-day active listings",
        "VIP support",
        "Advanced analytics",
        "Featured listing placement",
        "Professional photography included"
      ],
      recommended: false
    }
  ];

  const verificationProcess = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Local Scout Assignment",
      description: "A trained scout in your area will be assigned to verify your property"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Property Inspection",
      description: "Scout visits your property to verify details, take photos, and check amenities"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Trust Badge Evaluation",
      description: "Property earns trust badges based on verified features and neighborhood data"
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Go Live",
      description: "Your verified listing goes live and starts receiving genuine inquiries"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              List Your Property
            </h1>
            <p className="text-xl text-muted-foreground">
              Join Africa's most trusted rental platform. Pay once, get verified, reach genuine tenants.
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`p-6 relative ${plan.recommended ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full font-semibold">
                      Recommended
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.recommended ? "trust" : "outline"} 
                  className="w-full"
                >
                  Choose {plan.name}
                </Button>
              </Card>
            ))}
          </div>

          {/* Verification Process */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Our Verification Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {verificationProcess.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why List With Us */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Why List With HonestSpace?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Genuine Inquiries Only</h4>
                    <p className="text-muted-foreground text-sm">Our verification process filters out fake tenants and time-wasters</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Build Your Reputation</h4>
                    <p className="text-muted-foreground text-sm">Verified tenant reviews help you build trust and attract quality renters</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">No Hidden Fees</h4>
                    <p className="text-muted-foreground text-sm">One upfront payment, no commission on bookings or monthly fees</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Professional Support</h4>
                    <p className="text-muted-foreground text-sm">Our local scouts help optimize your listing for maximum visibility</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Community Trust</h4>
                    <p className="text-muted-foreground text-sm">Join Africa's most trusted rental platform with verified listings only</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Mobile Optimized</h4>
                    <p className="text-muted-foreground text-sm">Your listings look great on all devices, reaching more potential tenants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListProperty;