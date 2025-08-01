import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedProperties } from "@/components/FeaturedProperties";

const Browse = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Browse Verified Properties
            </h1>
            <p className="text-lg text-muted-foreground">
              Find your perfect home from our collection of 100% verified listings across the globe
            </p>
          </div>
          
          <div className="mb-8">
            <SearchBar />
          </div>
          
          <FeaturedProperties />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;