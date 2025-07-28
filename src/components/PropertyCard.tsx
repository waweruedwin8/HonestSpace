import { MapPin, Star, Heart } from "lucide-react";
import { TrustBadge } from "./TrustBadge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  trustBadges?: readonly ("verified" | "safe-night" | "good-internet" | "water-24-7" | "scout-verified")[];
  isLiked?: boolean;
}

export const PropertyCard = ({
  title,
  location,
  price,
  currency,
  image,
  rating = 0,
  reviewCount = 0,
  trustBadges = [],
  isLiked = false
}: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden shadow-soft hover:shadow-medium transition-smooth transform hover:scale-105 bg-gradient-card">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-smooth group-hover:scale-110"
        />
        <Button 
          variant="ghost" 
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm ${
            isLiked ? 'text-destructive' : 'text-muted-foreground'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        
        {/* Trust Badges Overlay */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {trustBadges.slice(0, 2).map((badge, index) => (
            <TrustBadge key={index} type={badge} />
          ))}
          {trustBadges.length > 2 && (
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-background/90 text-xs font-medium text-foreground">
              +{trustBadges.length - 2} more
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
          {rating > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="font-medium">{rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3 h-3" />
          <span className="line-clamp-1">{location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-foreground">{currency} {price.toLocaleString()}</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
          <Button variant="trust" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};