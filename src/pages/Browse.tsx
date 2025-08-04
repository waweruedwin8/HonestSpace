import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyGrid } from "@/components/PropertyGrid";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { usePropertySearch } from "@/hooks/usePropertySearch";

const Browse = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const {
    properties,
    totalResults,
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
  } = usePropertySearch();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Browse Verified Properties
            </h1>
            <p className="text-lg text-muted-foreground">
              Find your perfect home from our collection of 100% verified listings
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-6">
            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              onSearch={performSearch}
              resultCount={totalResults}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
            
            <PropertyGrid
              properties={properties}
              loading={loading}
              totalResults={totalResults}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              onToggleLike={toggleLike}
              likedProperties={likedProperties}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;