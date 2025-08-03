import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewsTab } from "./ReviewsTab";
import { AmenitiesTab } from "./AmenitiesTab";
import { LocationTab } from "./LocationTab";
import { OverviewTab } from "./OverviewTab";

interface PropertyTabsProps {
  property: {
    description: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    amenities: {
      onPremise: string[];
      area: string[];
    };
    coordinates: { lat: number; lng: number };
    reviews: Array<{
      id: number;
      rating: number;
      text: string;
      author: string;
      date: string;
    }>;
    location: string;
  };
}

export const PropertyTabs = ({ property }: PropertyTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        <OverviewTab property={property} />
      </TabsContent>
      
      <TabsContent value="amenities" className="mt-6">
        <AmenitiesTab amenities={property.amenities} />
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-6">
        <ReviewsTab reviews={property.reviews} />
      </TabsContent>
      
      <TabsContent value="location" className="mt-6">
        <LocationTab 
          coordinates={property.coordinates} 
          location={property.location}
        />
      </TabsContent>
    </Tabs>
  );
};