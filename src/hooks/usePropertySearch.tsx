import { useState, useEffect, useMemo } from "react";
import { FilterState } from "@/components/AdvancedFilters";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  reviewCount: number;
  trustBadges: readonly ("verified" | "safe-night" | "good-internet" | "water-24-7" | "scout-verified")[];
  propertyType: string;
  amenities: string[];
  verified: boolean;
  furnished: boolean;
  petFriendly: boolean;
  area: number;
  description: string;
  dateAvailable: string;
}

// Mock data - replace with actual API calls
const generateMockProperties = (): Property[] => {
  const propertyTypes = ["Apartment", "House", "Studio", "Bedsitter", "Maisonette", "Villa"];
  const locations = ["Westlands", "Karen", "Kilimani", "Lavington", "Runda", "Muthaiga", "Kileleshwa", "Parklands"];
  const amenitiesList = ["WiFi", "Parking", "Security", "Swimming Pool", "Gym", "Laundry", "Balcony", "Garden"];
  
  return Array.from({ length: 100 }, (_, i) => ({
    id: `property-${i + 1}`,
    title: `Beautiful ${propertyTypes[i % propertyTypes.length]} in ${locations[i % locations.length]}`,
    location: `${locations[i % locations.length]}, Nairobi`,
    price: Math.floor(Math.random() * 150000) + 20000,
    currency: "KSh",
    image: `https://images.unsplash.com/photo-${1721322800607 + i}-8c38375eef04?auto=format&fit=crop&w=400&h=300`,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 100) + 5,
    trustBadges: i % 3 === 0 ? ["verified", "safe-night"] as const : ["good-internet"] as const,
    propertyType: propertyTypes[i % propertyTypes.length],
    amenities: amenitiesList.slice(0, Math.floor(Math.random() * 4) + 2),
    verified: i % 3 === 0,
    furnished: i % 2 === 0,
    petFriendly: i % 4 === 0,
    area: Math.floor(Math.random() * 2000) + 500,
    description: `This is a wonderful ${propertyTypes[i % propertyTypes.length].toLowerCase()} located in the heart of ${locations[i % locations.length]}.`,
    dateAvailable: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
};

export const usePropertySearch = () => {
  const [allProperties] = useState<Property[]>(generateMockProperties());
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [likedProperties, setLikedProperties] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    searchText: "",
    location: "",
    propertyType: "",
    priceRange: [0, 200000],
    amenities: [],
    verifiedOnly: false,
    parkingAvailable: false,
    furnished: "any",
    petFriendly: false,
    minArea: 0,
    maxArea: 5000,
    sortBy: "relevance"
  });

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = allProperties.filter((property) => {
      // Text search
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        if (!property.title.toLowerCase().includes(searchLower) && 
            !property.description.toLowerCase().includes(searchLower) &&
            !property.location.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Location filter
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Property type filter
      if (filters.propertyType && filters.propertyType !== "Any Type" && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Price range filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => property.amenities.includes(amenity));
        if (!hasAllAmenities) return false;
      }

      // Verified only filter
      if (filters.verifiedOnly && !property.verified) {
        return false;
      }

      // Parking filter
      if (filters.parkingAvailable && !property.amenities.includes("Parking")) {
        return false;
      }

      // Furnished filter
      if (filters.furnished === "furnished" && !property.furnished) {
        return false;
      }
      if (filters.furnished === "unfurnished" && property.furnished) {
        return false;
      }

      // Pet friendly filter
      if (filters.petFriendly && !property.petFriendly) {
        return false;
      }

      // Area filter
      if (property.area < filters.minArea || property.area > filters.maxArea) {
        return false;
      }

      return true;
    });

    // Sort properties
    switch (filters.sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered = filtered.sort((a, b) => new Date(b.dateAvailable).getTime() - new Date(a.dateAvailable).getTime());
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [allProperties, filters]);

  // Paginated properties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  // Simulate API loading
  const performSearch = () => {
    setLoading(true);
    setCurrentPage(1);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handlePageChange = (page: number) => {
    setLoading(true);
    setCurrentPage(page);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const toggleLike = (propertyId: string) => {
    setLikedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Update page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return {
    properties: paginatedProperties,
    totalResults: filteredProperties.length,
    loading,
    currentPage,
    itemsPerPage,
    filters,
    likedProperties,
    setFilters,
    performSearch,
    handlePageChange,
    handleItemsPerPageChange,
    toggleLike
  };
};
