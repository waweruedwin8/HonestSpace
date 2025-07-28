import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SearchBar = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-2 p-2 bg-background rounded-xl shadow-medium border border-border">
        {/* Location Input */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Enter location (e.g., Westlands, Nairobi)"
            className="pl-10 border-0 bg-transparent focus-visible:ring-0 h-12"
          />
        </div>
        
        {/* Price Range */}
        <div className="flex-1 relative">
          <Input 
            placeholder="Budget (e.g., KES 20,000 - 50,000)"
            className="border-0 bg-transparent focus-visible:ring-0 h-12"
          />
        </div>
        
        {/* Filters Button */}
        <Button variant="outline" size="lg" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        
        {/* Search Button */}
        <Button variant="hero" size="lg" className="gap-2 px-8">
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
      
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {[
          "Safe at Night",
          "Good Internet", 
          "24/7 Water",
          "Family Friendly",
          "Student Housing",
          "Pet Allowed"
        ].map((filter) => (
          <Button 
            key={filter} 
            variant="outline" 
            size="sm"
            className="rounded-full hover:bg-trust hover:text-trust-foreground"
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
};