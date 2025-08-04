import { useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

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
}

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  onToggleLike: (propertyId: string) => void;
  likedProperties: string[];
}

export const PropertyGrid = ({
  properties,
  loading,
  totalResults,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onToggleLike,
  likedProperties
}: PropertyGridProps) => {
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} properties
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show:</span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Property Grid */}
      {loading ? (
        renderSkeletons()
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard
                id={property.id}
                title={property.title}
                location={property.location}
                price={property.price}
                currency={property.currency}
                image={property.image}
                rating={property.rating}
                reviewCount={property.reviewCount}
                trustBadges={property.trustBadges}
                isLiked={likedProperties.includes(property.id)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm z-10"
                onClick={() => onToggleLike(property.id)}
              >
                <Heart className={`w-4 h-4 ${likedProperties.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex gap-1">
              {getPageNumbers().map((pageNum, index) => (
                <Button
                  key={index}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
                  disabled={pageNum === '...'}
                  className={pageNum === '...' ? 'cursor-default' : ''}
                >
                  {pageNum}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};