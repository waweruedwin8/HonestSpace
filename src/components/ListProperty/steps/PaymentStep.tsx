import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Smartphone, Building2, Shield, CheckCircle } from "lucide-react";
import { ListPropertyData } from "../ListPropertyFlow";

interface PaymentStepProps {
  data: ListPropertyData;
  onNext: (data: Partial<ListPropertyData>) => void;
  onBack?: () => void;
}

export const PaymentStep = ({ data, onNext, onBack }: PaymentStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa" | "paypal">("card");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [mpesaPhone, setMpesaPhone] = useState("");

  const planDetails = {
    residential: { name: "Residential", price: "$1", features: ["1 listing", "30 days active"] },
    "small-business": { name: "Small Business", price: "$5", features: ["5 listings", "60 days active"] },
    executive: { name: "Executive", price: "$20", features: ["20 listings", "90 days active"] }
  };

  const selectedPlan = planDetails[data.subscriptionPlan as keyof typeof planDetails] || planDetails.residential;

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      onNext({ isPaid: true });
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Complete Your Payment
        </h1>
        <p className="text-muted-foreground">
          Secure payment to activate your listing plan
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            
            <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="card" className="text-xs">
                  <CreditCard className="w-4 h-4 mr-1" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="mpesa" className="text-xs">
                  <Smartphone className="w-4 h-4 mr-1" />
                  M-Pesa
                </TabsTrigger>
                <TabsTrigger value="paypal" className="text-xs">
                  <Building2 className="w-4 h-4 mr-1" />
                  PayPal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardData.name}
                    onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </TabsContent>

              <TabsContent value="mpesa" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                  <Input
                    id="mpesaPhone"
                    placeholder="+254 700 000 000"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  You'll receive an M-Pesa prompt on your phone to complete the payment.
                </div>
              </TabsContent>

              <TabsContent value="paypal" className="space-y-4">
                <div className="text-center py-8">
                  <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    You'll be redirected to PayPal to complete your payment securely.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Security Note */}
          <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Secure Payment</p>
              <p className="text-muted-foreground">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedPlan.name} Plan</p>
                  <div className="flex gap-2 mt-1">
                    {selectedPlan.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-lg font-bold">{selectedPlan.price}</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>{selectedPlan.price}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <h4 className="font-semibold text-foreground mb-3">What's Included:</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Scout verification process",
                "Professional listing optimization",
                "Genuine tenant screening",
                "Mobile-optimized property page",
                "24/7 customer support"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handlePayment} size="lg" className="px-8">
          Pay {selectedPlan.price} & Continue
        </Button>
      </div>
    </div>
  );
};