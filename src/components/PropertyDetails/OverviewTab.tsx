import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, Bath, Square } from "lucide-react";

interface OverviewTabProps {
  property: {
    description: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
  };
}

export const OverviewTab = ({ property }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Bed className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">{property.bedrooms}</div>
              <div className="text-sm text-muted-foreground">Bedrooms</div>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Bath className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">{property.bathrooms}</div>
              <div className="text-sm text-muted-foreground">Bathrooms</div>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Square className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">{property.area}</div>
              <div className="text-sm text-muted-foreground">Sq Ft</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {property.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};