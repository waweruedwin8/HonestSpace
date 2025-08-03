import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock } from "lucide-react";

interface LocationTabProps {
  coordinates: { lat: number; lng: number };
  location: string;
}

export const LocationTab = ({ coordinates, location }: LocationTabProps) => {
  // Mock nearby landmarks data
  const nearbyLandmarks = [
    { name: "Westlands Shopping Centre", distance: "0.5 km", type: "Shopping" },
    { name: "Nairobi Hospital", distance: "2.1 km", type: "Healthcare" },
    { name: "International School of Kenya", distance: "1.8 km", type: "Education" },
    { name: "Westlands Matatu Stage", distance: "0.3 km", type: "Transport" },
    { name: "Java House", distance: "0.2 km", type: "Restaurant" },
    { name: "Equity Bank", distance: "0.4 km", type: "Banking" }
  ];

  const transportation = [
    { type: "Matatu", route: "Route 46, 100, 102", time: "5 min walk" },
    { type: "Uber/Bolt", route: "Available 24/7", time: "Instant" },
    { type: "Boda Boda", route: "Multiple stands nearby", time: "2 min walk" }
  ];

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Property Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
            <div className="text-center space-y-2">
              <MapPin className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">
                Google Maps integration would display here
              </p>
              <p className="text-xs text-muted-foreground">
                Coordinates: {coordinates.lat}, {coordinates.lng}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-medium">{location}</span>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Landmarks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-accent" />
            Nearby Landmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {nearbyLandmarks.map((landmark, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div>
                    <div className="font-medium">{landmark.name}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {landmark.type}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {landmark.distance}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transportation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            Transportation Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transportation.map((transport, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">{transport.type}</div>
                  <div className="text-sm text-muted-foreground">{transport.route}</div>
                </div>
                <Badge variant="secondary">
                  {transport.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};