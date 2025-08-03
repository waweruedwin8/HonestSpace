import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Shield, Heart, Flag } from "lucide-react";
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
  const [showReportDialog, setShowReportDialog] = useState(false);
  
  // Mock login state - replace with actual auth
  const isLoggedIn = true;

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
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReportDialog(true)}
              >
                <Flag className="w-4 h-4 mr-1" />
                Report
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};