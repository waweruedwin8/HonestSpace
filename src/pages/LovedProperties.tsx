import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, MapPin, Wifi, Car, Shield, TrendingUp, BarChart3, Map, GitCompare } from "lucide-react";
import { usePropertySearch } from "@/hooks/usePropertySearch";

const LovedProperties = () => {
  const { likedProperties, toggleLike } = usePropertySearch();
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  
  // Mock loved properties data
  const lovedPropertiesData = [
    {
      id: "1",
      title: "Beautiful Apartment in Westlands",
      location: "Westlands, Nairobi",
      price: 45000,
      currency: "KSh",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&h=300",
      rating: 4.5,
      amenities: ["WiFi", "Parking", "Security", "Swimming Pool"],
      area: 850,
      bedrooms: 2,
      verified: true,
      priceHistory: [42000, 43000, 45000],
      dateAdded: "2024-01-15"
    },
    {
      id: "2", 
      title: "Modern House in Karen",
      location: "Karen, Nairobi",
      price: 85000,
      currency: "KSh",
      image: "https://images.unsplash.com/photo-1721322800608-8c38375eef04?auto=format&fit=crop&w=400&h=300",
      rating: 4.8,
      amenities: ["WiFi", "Parking", "Security", "Garden", "Gym"],
      area: 1200,
      bedrooms: 3,
      verified: true,
      priceHistory: [80000, 82000, 85000],
      dateAdded: "2024-01-20"
    },
    {
      id: "3",
      title: "Cozy Studio in Kilimani",
      location: "Kilimani, Nairobi", 
      price: 28000,
      currency: "KSh",
      image: "https://images.unsplash.com/photo-1721322800609-8c38375eef04?auto=format&fit=crop&w=400&h=300",
      rating: 4.2,
      amenities: ["WiFi", "Security", "Laundry"],
      area: 450,
      bedrooms: 1,
      verified: false,
      priceHistory: [26000, 27000, 28000],
      dateAdded: "2024-01-25"
    }
  ];

  const handleComparisonToggle = (propertyId: string) => {
    setSelectedForComparison(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : prev.length < 3 ? [...prev, propertyId] : prev
    );
  };

  const averagePrice = lovedPropertiesData.reduce((sum, prop) => sum + prop.price, 0) / lovedPropertiesData.length;
  const priceRange = {
    min: Math.min(...lovedPropertiesData.map(p => p.price)),
    max: Math.max(...lovedPropertiesData.map(p => p.price))
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Loved Properties</h1>
            <p className="text-muted-foreground">
              Manage your saved properties and discover insights about your preferences
            </p>
          </div>

          <Tabs defaultValue="grid" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-6">
              {lovedPropertiesData.length === 0 ? (
                <Card className="p-12 text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No loved properties yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start browsing properties and save your favorites to see them here
                  </p>
                  <Button asChild>
                    <a href="/browse">Browse Properties</a>
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lovedPropertiesData.map((property) => (
                    <Card key={property.id} className="group hover:shadow-medium transition-shadow">
                      <div className="relative">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          onClick={() => toggleLike(property.id)}
                        >
                          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        </Button>
                        {property.verified && (
                          <Badge className="absolute top-2 left-2 bg-trust text-trust-foreground">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">
                            {property.currency} {property.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {property.bedrooms} bed • {property.area}m²
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {property.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {property.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{property.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`compare-${property.id}`}
                              checked={selectedForComparison.includes(property.id)}
                              onCheckedChange={() => handleComparisonToggle(property.id)}
                              disabled={!selectedForComparison.includes(property.id) && selectedForComparison.length >= 3}
                            />
                            <label 
                              htmlFor={`compare-${property.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Compare
                            </label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Price Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Average Price</p>
                        <p className="text-2xl font-bold">KSh {averagePrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price Range</p>
                        <p className="text-lg">KSh {priceRange.min.toLocaleString()} - {priceRange.max.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">WiFi</span>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Parking</span>
                        <span className="text-sm font-medium">67%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Security</span>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Map className="w-5 h-5" />
                      Location Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Westlands</span>
                        <span className="text-sm font-medium">33%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Karen</span>
                        <span className="text-sm font-medium">33%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Kilimani</span>
                        <span className="text-sm font-medium">33%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="compare" className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Property Comparison</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select up to 3 properties to compare side by side. 
                  {selectedForComparison.length > 0 && ` ${selectedForComparison.length}/3 selected`}
                </p>
                {selectedForComparison.length > 1 && (
                  <Button className="mb-4">
                  <GitCompare className="w-4 h-4 mr-2" />
                    Compare Selected Properties
                  </Button>
                )}
              </div>

              {selectedForComparison.length === 0 ? (
                <Card className="p-8 text-center">
                  <GitCompare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Select properties to compare</h3>
                  <p className="text-muted-foreground">
                    Go to the Grid tab and select properties using the checkboxes to compare them here
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {selectedForComparison.map((propertyId) => {
                    const property = lovedPropertiesData.find(p => p.id === propertyId);
                    if (!property) return null;
                    
                    return (
                      <Card key={property.id} className="border-primary">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">{property.title}</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Price:</span>
                              <span className="font-medium">{property.currency} {property.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Area:</span>
                              <span>{property.area}m²</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Bedrooms:</span>
                              <span>{property.bedrooms}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Rating:</span>
                              <span>{property.rating}/5</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Verified:</span>
                              <span>{property.verified ? 'Yes' : 'No'}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations Based on Your Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Similar Properties</h4>
                      <p className="text-sm text-blue-800">
                        Based on your loved properties, we found 12 similar listings in Westlands and Karen 
                        with comparable prices and amenities.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">View Recommendations</Button>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Price Alerts</h4>
                      <p className="text-sm text-green-800">
                        3 properties in your loved list have dropped in price recently. 
                        Consider reaching out to landlords for potential deals.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">Set Price Alerts</Button>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Market Insights</h4>
                      <p className="text-sm text-purple-800">
                        Properties with your preferred amenities (WiFi, Security) typically rent 
                        15% faster than average in your target areas.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">View Market Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LovedProperties;