import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, MapPin, Shield, Heart, Flag, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface PropertyHeaderProps {
  property: {
    title: string;
    price: number;
    location: string;
    verified: boolean;
    rating: number;
    reviewCount: number;
  };
}

export const PropertyHeader = ({ property }: PropertyHeaderProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  
  // Mock login state - replace with actual auth
  const isLoggedIn = true;

  const handleSubmitReport = () => {
    if (reportReason && reportDetails.trim()) {
      console.log({ reason: reportReason, details: reportDetails });
      setReportReason("");
      setReportDetails("");
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{property.title}</h1>
            {property.verified && (
              <Badge variant="default" className="bg-verified text-verified-foreground">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(property.rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                {property.rating} ({property.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              KSh {property.price.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
          
          {isLoggedIn && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-red-500 border-red-200" : ""}
              >
                <Heart className={`w-4 h-4 mr-1 ${isBookmarked ? "fill-red-500" : ""}`} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Flag className="w-4 h-4 mr-1" />
                    Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Report Property</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Reason for reporting</Label>
                      <RadioGroup value={reportReason} onValueChange={setReportReason} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fake-listing" id="fake-listing" />
                          <Label htmlFor="fake-listing">Fake listing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fake-price" id="fake-price" />
                          <Label htmlFor="fake-price">Fake price/misleading cost</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="scam" id="scam" />
                          <Label htmlFor="scam">Suspected scam</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="poor-condition" id="poor-condition" />
                          <Label htmlFor="poor-condition">Poor property condition</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="safety-concerns" id="safety-concerns" />
                          <Label htmlFor="safety-concerns">Safety concerns</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label htmlFor="report-details" className="text-sm font-medium">Additional details</Label>
                      <Textarea
                        id="report-details"
                        placeholder="Please provide more details about your concern..."
                        value={reportDetails}
                        onChange={(e) => setReportDetails(e.target.value)}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmitReport}
                      disabled={!reportReason || !reportDetails.trim()}
                      className="w-full"
                    >
                      Submit Report
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
      
      {/* Landlord Contact Information */}
      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-foreground mb-3">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Landlord</div>
              <div className="font-medium">+254 712 345 678</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Property Manager</div>
              <div className="font-medium">manager@property.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};