import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { X, Search, MapPin, Filter } from "lucide-react";

export interface FilterState {
  searchText: string;
  location: string;
  propertyType: string;
  priceRange: [number, number];
  amenities: string[];
  verifiedOnly: boolean;
  parkingAvailable: boolean;
  furnished: string; // 'any' | 'furnished' | 'unfurnished'
  petFriendly: boolean;
  minArea: number;
  maxArea: number;
  sortBy: string;
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch: () => void;
  resultCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const AdvancedFilters = ({
  filters,
  onFiltersChange,
  onSearch,
  resultCount,
  isOpen,
  onToggle
}: AdvancedFiltersProps) => {
  const propertyTypes = [
    "Any Type",
    "Apartment",
    "House", 
    "Studio",
    "Bedsitter",
    "Maisonette",
    "Villa",
    "Townhouse"
  ];

  const amenitiesList = [
    "WiFi",
    "Parking",
    "Security",
    "Swimming Pool",
    "Gym",
    "Laundry",
    "Balcony",
    "Garden",
    "Air Conditioning",
    "Generator",
    "CCTV",
    "Backup Water"
  ];

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Highest Rated" }
  ];

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilters({ amenities: newAmenities });
  };

  const clearAllFilters = () => {
    onFiltersChange({
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
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.searchText) count++;
    if (filters.location) count++;
    if (filters.propertyType && filters.propertyType !== "Any Type") count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.verifiedOnly) count++;
    if (filters.parkingAvailable) count++;
    if (filters.furnished !== "any") count++;
    if (filters.petFriendly) count++;
    if (filters.minArea > 0 || filters.maxArea < 5000) count++;
    return count;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search properties, descriptions..."
                value={filters.searchText}
                onChange={(e) => updateFilters({ searchText: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Location (e.g., Westlands, Nairobi)"
                value={filters.location}
                onChange={(e) => updateFilters({ location: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={onToggle}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
            
            <Button onClick={onSearch} className="px-8">
              Search ({resultCount})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters Panel */}
      {isOpen && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Advanced Filters</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
              <Button variant="ghost" size="icon" onClick={onToggle}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Property Type */}
              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={filters.propertyType} onValueChange={(value) => updateFilters({ propertyType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Furnished */}
              <div className="space-y-2">
                <Label>Furnished</Label>
                <Select value={filters.furnished} onValueChange={(value) => updateFilters({ furnished: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
              <Label>Price Range (KSh per month)</Label>
              <div className="px-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                  max={200000}
                  min={0}
                  step={5000}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>KSh {filters.priceRange[0].toLocaleString()}</span>
                <span>KSh {filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            <Separator />

            {/* Property Size */}
            <div className="space-y-4">
              <Label>Property Size (sq ft)</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Min</Label>
                  <Input
                    type="number"
                    value={filters.minArea}
                    onChange={(e) => updateFilters({ minArea: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Max</Label>
                  <Input
                    type="number"
                    value={filters.maxArea}
                    onChange={(e) => updateFilters({ maxArea: Number(e.target.value) })}
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label>Verified Properties Only</Label>
                <Switch
                  checked={filters.verifiedOnly}
                  onCheckedChange={(checked) => updateFilters({ verifiedOnly: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Parking Available</Label>
                <Switch
                  checked={filters.parkingAvailable}
                  onCheckedChange={(checked) => updateFilters({ parkingAvailable: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Pet Friendly</Label>
                <Switch
                  checked={filters.petFriendly}
                  onCheckedChange={(checked) => updateFilters({ petFriendly: checked })}
                />
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div className="space-y-4">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={filters.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label
                      htmlFor={amenity}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Label>Active Filters</Label>
                  <div className="flex flex-wrap gap-2">
                    {filters.searchText && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Search: {filters.searchText}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilters({ searchText: "" })} />
                      </Badge>
                    )}
                    {filters.location && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Location: {filters.location}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilters({ location: "" })} />
                      </Badge>
                    )}
                    {filters.propertyType && filters.propertyType !== "Any Type" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Type: {filters.propertyType}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilters({ propertyType: "" })} />
                      </Badge>
                    )}
                    {filters.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                        {amenity}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => toggleAmenity(amenity)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};