import { useState } from "react";
import { Check, Crown, Building, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListPropertyData } from "../ListPropertyFlow";

interface SubscriptionStepProps {
  data: ListPropertyData;
  onNext: (data: Partial<ListPropertyData>) => void;
  onBack?: () => void;
}

export const SubscriptionStep = ({ data, onNext }: SubscriptionStepProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(data.subscriptionPlan || "");

  const plans = [
    {
      id: "residential",
      name: "Residential",
      price: "$1",
      period: "per listing",
      icon: <Home className="w-8 h-8" />,
      description: "Perfect for individual landlords",
      features: [
        "1 property listing",
        "Scout verification included",
        "30-day active listing",
        "Basic support",
        "Mobile-friendly listing page",
        "Photo upload (up to 10 images)"
      ],
      recommended: false,
      color: "border-border"
    },
    {
      id: "small-business",
      name: "Small Business",
      price: "$5",
      period: "per listing",
      icon: <Building className="w-8 h-8" />,
      description: "For small property managers",
      features: [
        "Up to 5 property listings",
        "Scout verification included",
        "60-day active listings",
        "Priority support",
        "Analytics dashboard",
        "Professional photos option",
        "Video upload capability",
        "Featured in search results"
      ],
      recommended: true,
      color: "border-primary ring-2 ring-primary/20"
    },
    {
      id: "executive",
      name: "Executive",
      price: "$20",
      period: "per listing",
      icon: <Crown className="w-8 h-8" />,
      description: "For premium properties",
      features: [
        "Up to 20 property listings",
        "Premium scout verification",
        "90-day active listings",
        "VIP support 24/7",
        "Advanced analytics",
        "Featured listing placement",
        "Professional photography included",
        "Video production service",
        "Social media promotion",
        "Dedicated account manager"
      ],
      recommended: false,
      color: "border-accent"
    }
  ];

  const handleContinue = () => {
    if (selectedPlan) {
      onNext({ subscriptionPlan: selectedPlan });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Choose Your Listing Plan
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select the plan that best fits your property management needs. All plans include scout verification and genuine tenant screening.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              selectedPlan === plan.id 
                ? `${plan.color} bg-primary/5` 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-primary">
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={selectedPlan === plan.id ? "trust" : "outline"}
                className="w-full"
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : `Choose ${plan.name}`}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleContinue}
          disabled={!selectedPlan}
          size="lg"
          className="px-8"
        >
          Continue to Sign In
        </Button>
      </div>
    </div>
  );
};