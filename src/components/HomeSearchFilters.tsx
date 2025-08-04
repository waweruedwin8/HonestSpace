import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, MapPin, Filter, X } from "lucide-react";

export const HomeSearchFilters = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  const quickFilterOptions = [
    "Safe at Night",
    "Good Internet", 
    "24/7 Water",
    "Family Friendly",
    "Student Housing",
    "Pet Allowed"
  ];

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

  const toggleQuickFilter = (filter: string) => {
    setQuickFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (searchText) count++;
    if (location) count++;
    if (propertyType && propertyType !== "Any Type") count++;
    if (priceRange[0] > 0 || priceRange[1] < 200000) count++;
    if (quickFilters.length > 0) count += quickFilters.length;
    return count;
  };

  const handleSearch = () => {
    // Navigate to browse page with filters
    const params = new URLSearchParams();
    if (searchText) params.set('search', searchText);
    if (location) params.set('location', location);
    if (propertyType && propertyType !== "Any Type") params.set('type', propertyType);
    if (priceRange[0] > 0 || priceRange[1] < 200000) {
      params.set('minPrice', priceRange[0].toString());
      params.set('maxPrice', priceRange[1].toString());
    }
    if (quickFilters.length > 0) params.set('amenities', quickFilters.join(','));
    
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search properties, descriptions..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 h-12 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-trust focus-visible:ring-offset-0"
              />
            </div>
            
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Location (e.g., Westlands, Nairobi)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-trust focus-visible:ring-offset-0"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 h-12 hover:bg-trust hover:text-trust-foreground"
            >
              <Filter className="w-4 h-4" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="hero" 
              size="lg" 
              className="gap-2 px-8 h-12"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Advanced Filters</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowFilters(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Property Type</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
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
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Price Range (KSh per month)</label>
              <div className="px-4">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  max={200000}
                  min={0}
                  step={5000}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>KSh {priceRange[0].toLocaleString()}</span>
                <span>KSh {priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Active Filters */}
            {getActiveFilterCount() > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Active Filters</label>
                  <div className="flex flex-wrap gap-2">
                    {searchText && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Search: {searchText}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchText("")} />
                      </Badge>
                    )}
                    {location && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Location: {location}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setLocation("")} />
                      </Badge>
                    )}
                    {propertyType && propertyType !== "Any Type" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Type: {propertyType}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setPropertyType("")} />
                      </Badge>
                    )}
                    {quickFilters.map((filter) => (
                      <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                        {filter}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => toggleQuickFilter(filter)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {quickFilterOptions.map((filter) => (
          <Button 
            key={filter} 
            variant={quickFilters.includes(filter) ? "default" : "outline"}
            size="sm"
            className="rounded-full hover:bg-trust hover:text-trust-foreground"
            onClick={() => toggleQuickFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
};