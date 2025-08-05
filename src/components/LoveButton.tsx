import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link } from "react-router-dom";

interface LoveButtonProps {
  likedProperties: string[];
  onToggleLike?: (propertyId: string) => void;
}

export const LoveButton = ({ likedProperties }: LoveButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock recent liked properties for preview
  const recentLiked = [
    {
      id: "1",
      title: "Beautiful Apartment in Westlands",
      price: "KSh 45,000",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=100&h=80"
    },
    {
      id: "2", 
      title: "Modern House in Karen",
      price: "KSh 85,000",
      image: "https://images.unsplash.com/photo-1721322800608-8c38375eef04?auto=format&fit=crop&w=100&h=80"
    }
  ].slice(0, 3);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className={`w-5 h-5 ${likedProperties.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          {likedProperties.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
            >
              {likedProperties.length > 99 ? '99+' : likedProperties.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Loved Properties</h3>
            <Badge variant="secondary">{likedProperties.length}</Badge>
          </div>
          
          {likedProperties.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No loved properties yet</p>
              <p className="text-sm">Start browsing to save your favorites</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {recentLiked.map((property) => (
                  <div key={property.id} className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{property.title}</p>
                      <p className="text-sm text-muted-foreground">{property.price}</p>
                    </div>
                  </div>
                ))}
                {likedProperties.length > 3 && (
                  <p className="text-sm text-muted-foreground text-center">
                    +{likedProperties.length - 3} more properties
                  </p>
                )}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <Button asChild className="w-full" variant="outline">
                  <Link to="/loved-properties">View All Loved Properties</Link>
                </Button>
                <Button asChild className="w-full" variant="trust">
                  <Link to="/loved-properties?tab=compare">Compare Properties</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};