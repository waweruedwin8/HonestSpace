import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { SubscriptionStep } from "./steps/SubscriptionStep";
import { AuthenticationStep } from "./steps/AuthenticationStep";
import { PaymentStep } from "./steps/PaymentStep";
import { PropertyFormStep } from "./steps/PropertyFormStep";

export type ListPropertyData = {
  subscriptionPlan?: string;
  isAuthenticated?: boolean;
  isPaid?: boolean;
  propertyData?: any;
};

const ListPropertyFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyData, setPropertyData] = useState<ListPropertyData>({});

  const steps = [
    { id: 1, title: "Choose Plan", component: SubscriptionStep },
    { id: 2, title: "Sign In", component: AuthenticationStep },
    { id: 3, title: "Payment", component: PaymentStep },
    { id: 4, title: "List Property", component: PropertyFormStep }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = (data: Partial<ListPropertyData>) => {
    setPropertyData(prev => ({ ...prev, ...data }));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background text-muted-foreground border-border'
                }`}>
                  {step.id}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Current Step Content */}
        <div className="max-w-4xl mx-auto">
          <CurrentStepComponent 
            data={propertyData}
            onNext={handleNext}
            onBack={currentStep > 1 ? handleBack : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPropertyFlow;