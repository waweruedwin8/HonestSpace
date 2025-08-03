import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyGallery } from "@/components/PropertyDetails/PropertyGallery";
import { PropertyTabs } from "@/components/PropertyDetails/PropertyTabs";
import { PropertyHeader } from "@/components/PropertyDetails/PropertyHeader";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  // Mock property data - in real app, fetch from API using the id
  const property = {
    id: id || "1",
    title: "Modern 2BR Apartment in Westlands",
    price: 85000,
    location: "Westlands, Nairobi",
    verified: true,
    rating: 4.5,
    reviewCount: 24,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    video: "/placeholder.svg",
    description: "Beautiful modern apartment with stunning city views. Features include modern finishes, spacious living areas, and excellent amenities.",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: {
      onPremise: ["WiFi", "Parking", "Security", "Furnished", "Balcony", "Kitchen"],
      area: ["Schools", "Hospital", "Shopping Mall", "Public Transport", "Restaurant", "Gym"]
    },
    coordinates: { lat: -1.2659, lng: 36.8037 },
    reviews: [
      {
        id: 1,
        rating: 5,
        text: "Amazing property with great location and amenities. Highly recommended!",
        author: "Sarah K.",
        date: "2024-01-15"
      },
      {
        id: 2,
        rating: 4,
        text: "Good value for money. The apartment is well-maintained and secure.",
        author: "John M.",
        date: "2024-01-10"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <PropertyHeader property={property} />
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <PropertyGallery 
              images={property.images} 
              video={property.video}
              title={property.title}
            />
            <div className="lg:sticky lg:top-24 lg:self-start">
              <PropertyTabs property={property} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;