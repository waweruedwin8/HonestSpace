import { PropertyCard } from "./PropertyCard";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

// Mock data for featured properties
const featuredProperties = [
  {
    id: "1",
    title: "Modern 2BR Apartment in Westlands",
    location: "Westlands, Nairobi",
    price: 75000,
    currency: "KES",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 24,
    trustBadges: ["verified", "safe-night", "good-internet", "water-24-7"] as const,
    isLiked: false
  },
  {
    id: "2", 
    title: "Spacious 3BR Family Home in Karen",
    location: "Karen, Nairobi",
    price: 120000,
    currency: "KES",
    image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 31,
    trustBadges: ["verified", "safe-night", "scout-verified"] as const,
    isLiked: true
  },
  {
    id: "3",
    title: "Affordable Bedsitter in Kasarani", 
    location: "Kasarani, Nairobi",
    price: 15000,
    currency: "KES",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewCount: 18,
    trustBadges: ["verified", "good-internet"] as const,
    isLiked: false
  },
  {
    id: "4",
    title: "Executive 4BR Penthouse in Kilimani",
    location: "Kilimani, Nairobi", 
    price: 200000,
    currency: "KES",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewCount: 12,
    trustBadges: ["verified", "safe-night", "good-internet", "water-24-7", "scout-verified"] as const,
    isLiked: false
  },
  {
    id: "5",
    title: "Cozy 1BR Near University",
    location: "South B, Nairobi",
    price: 35000, 
    currency: "KES",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 22,
    trustBadges: ["verified", "good-internet", "water-24-7"] as const,
    isLiked: true
  },
  {
    id: "6",
    title: "Family Compound in Kiambu",
    location: "Kiambu, Kiambu County",
    price: 90000,
    currency: "KES", 
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviewCount: 15,
    trustBadges: ["verified", "safe-night", "scout-verified"] as const,
    isLiked: false
  }
];

export const FeaturedProperties = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Verified Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked properties verified by our local scouts with authentic tenant reviews
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="hero" size="lg" className="px-8">
            <Link to="/browse">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};