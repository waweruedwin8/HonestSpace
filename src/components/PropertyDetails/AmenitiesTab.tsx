import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Car, Shield, Sofa, Building, MapPin, GraduationCap, Plus, ShoppingBag, Bus, Utensils, Dumbbell } from "lucide-react";

interface AmenitiesTabProps {
  amenities: {
    onPremise: string[];
    area: string[];
  };
}

const amenityIcons = {
  // On-premise amenities
  "WiFi": Wifi,
  "Parking": Car,
  "Security": Shield,
  "Furnished": Sofa,
  "Balcony": Building,
  "Kitchen": Utensils,
  
  // Area amenities
  "Schools": GraduationCap,
  "Hospital": Plus,
  "Shopping Mall": ShoppingBag,
  "Public Transport": Bus,
  "Restaurant": Utensils,
  "Gym": Dumbbell,
};

export const AmenitiesTab = ({ amenities }: AmenitiesTabProps) => {
  const renderAmenityBadge = (amenity: string, type: 'onPremise' | 'area') => {
    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || MapPin;
    
    return (
      <Badge
        key={amenity}
        variant="secondary"
        className={`flex items-center gap-2 p-3 h-auto ${
          type === 'onPremise' 
            ? 'bg-primary/10 text-primary border-primary/20' 
            : 'bg-accent/10 text-accent-foreground border-accent/20'
        }`}
      >
        <IconComponent className="w-4 h-4" />
        {amenity}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            On-Premise Amenities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenities.onPremise.map((amenity) => 
              renderAmenityBadge(amenity, 'onPremise')
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Area Amenities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenities.area.map((amenity) => 
              renderAmenityBadge(amenity, 'area')
            )}
          </div>
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Area amenities are within walking distance or a short drive from the property. 
              Exact distances may vary.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};