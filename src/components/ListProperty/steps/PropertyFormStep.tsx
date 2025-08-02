import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X, MapPin, Camera, Video, Home, Wifi, Car, Shield, Sofa, School, Hospital, ShoppingCart, Bus } from "lucide-react";
import { ListPropertyData } from "../ListPropertyFlow";

interface PropertyFormStepProps {
  data: ListPropertyData;
  onNext: (data: Partial<ListPropertyData>) => void;
  onBack?: () => void;
}

export const PropertyFormStep = ({ data, onNext, onBack }: PropertyFormStepProps) => {
  const [currentTab, setCurrentTab] = useState("basic");
  const [propertyData, setPropertyData] = useState({
    type: "",
    title: "",
    description: "",
    price: "",
    deposit: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: {
      onPremise: [] as string[],
      area: [] as string[]
    },
    images: [] as File[],
    video: null as File | null
  });

  const propertyTypes = [
    "Studio Apartment",
    "1-Bedroom Apartment", 
    "2-Bedroom Apartment",
    "3-Bedroom Apartment",
    "Bungalow",
    "Townhouse",
    "Villa",
    "Commercial Space",
    "Office Space",
    "Warehouse"
  ];

  const onPremiseAmenities = [
    { id: "wifi", label: "WiFi Internet", icon: <Wifi className="w-4 h-4" /> },
    { id: "parking", label: "Parking Space", icon: <Car className="w-4 h-4" /> },
    { id: "security", label: "24/7 Security", icon: <Shield className="w-4 h-4" /> },
    { id: "furnished", label: "Fully Furnished", icon: <Sofa className="w-4 h-4" /> },
    { id: "kitchen", label: "Modern Kitchen", icon: <Home className="w-4 h-4" /> },
    { id: "balcony", label: "Balcony/Terrace", icon: <Home className="w-4 h-4" /> }
  ];

  const areaAmenities = [
    { id: "schools", label: "Schools Nearby", icon: <School className="w-4 h-4" /> },
    { id: "hospitals", label: "Hospitals/Clinics", icon: <Hospital className="w-4 h-4" /> },
    { id: "shopping", label: "Shopping Centers", icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "transport", label: "Public Transport", icon: <Bus className="w-4 h-4" /> }
  ];

  const handleInputChange = (field: string, value: string) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (type: "onPremise" | "area", amenityId: string) => {
    setPropertyData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [type]: prev.amenities[type].includes(amenityId)
          ? prev.amenities[type].filter(id => id !== amenityId)
          : [...prev.amenities[type], amenityId]
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (propertyData.images.length + files.length <= 10) {
      setPropertyData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const removeImage = (index: number) => {
    setPropertyData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPropertyData(prev => ({ ...prev, video: file }));
    }
  };

  const handleSubmit = () => {
    onNext({ propertyData });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          List Your Property
        </h1>
        <p className="text-muted-foreground">
          Fill in the details to create your property listing
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="media">Photos & Video</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
            
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select value={propertyData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Modern 2-bedroom apartment in downtown"
                  value={propertyData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property, highlighting key features and what makes it special..."
                  rows={4}
                  value={propertyData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Rent ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="1200"
                    value={propertyData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit ($)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    placeholder="2400"
                    value={propertyData.deposit}
                    onChange={(e) => handleInputChange("deposit", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select value={propertyData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Studio", "1", "2", "3", "4", "5+"].map((num) => (
                        <SelectItem key={num} value={num}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select value={propertyData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "1.5", "2", "2.5", "3", "3+"].map((num) => (
                        <SelectItem key={num} value={num}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="1200"
                    value={propertyData.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Property Photos & Video</h3>
            
            {/* Image Upload */}
            <div className="space-y-4">
              <div>
                <Label>Property Photos (Max 10)</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Upload high-quality photos that showcase your property's best features
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  {propertyData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Property ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  
                  {propertyData.images.length < 10 && (
                    <label className="border-2 border-dashed border-border rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <Camera className="w-6 h-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <Label>Property Video (Optional)</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Upload a short video tour (max 2 minutes)
                </p>
                
                {propertyData.video ? (
                  <div className="relative">
                    <video
                      src={URL.createObjectURL(propertyData.video)}
                      className="w-full h-40 object-cover rounded-lg border"
                      controls
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setPropertyData(prev => ({ ...prev, video: null }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-border rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Video className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Upload Property Video</span>
                    <span className="text-xs text-muted-foreground">MP4, MOV up to 100MB</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                  </label>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">On-Premise Amenities</h3>
              <div className="space-y-3">
                {onPremiseAmenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={amenity.id}
                      checked={propertyData.amenities.onPremise.includes(amenity.id)}
                      onCheckedChange={() => handleAmenityToggle("onPremise", amenity.id)}
                    />
                    <Label htmlFor={amenity.id} className="flex items-center gap-2 cursor-pointer">
                      {amenity.icon}
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Area Amenities</h3>
              <div className="space-y-3">
                {areaAmenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={amenity.id}
                      checked={propertyData.amenities.area.includes(amenity.id)}
                      onCheckedChange={() => handleAmenityToggle("area", amenity.id)}
                    />
                    <Label htmlFor={amenity.id} className="flex items-center gap-2 cursor-pointer">
                      {amenity.icon}
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Property Location</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter property address"
                    className="pl-10"
                    value={propertyData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-muted rounded-lg border flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive map will appear here</p>
                  <p className="text-sm text-muted-foreground">Click to set precise location</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Submit Property Listing
        </Button>
      </div>
    </div>
  );
};