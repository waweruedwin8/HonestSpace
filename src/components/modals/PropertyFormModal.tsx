import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, MapPin } from "lucide-react";

interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: any;
  mode: 'add' | 'edit';
}

export const PropertyFormModal = ({ isOpen, onClose, property, mode }: PropertyFormModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: property?.title || "",
    description: property?.description || "",
    rent: property?.rent || "",
    bedrooms: property?.bedrooms || "",
    bathrooms: property?.bathrooms || "",
    location: property?.location || "",
    amenities: property?.amenities || [],
    photos: [] as File[],
    propertyType: property?.propertyType || ""
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.rent || !formData.location) {
      toast({
        title: "Please fill required fields",
        description: "Title, rent, and location are required.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: mode === 'add' ? "Property Added" : "Property Updated",
      description: mode === 'add' 
        ? "Your property has been submitted for verification." 
        : "Property details have been updated successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Property' : 'Edit Property'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Property Title *</Label>
            <Input
              placeholder="e.g., Modern 2BR Apartment in Westlands"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Monthly Rent (USD) *</Label>
              <Input
                type="number"
                placeholder="450"
                value={formData.rent}
                onChange={(e) => setFormData(prev => ({ ...prev, rent: e.target.value }))}
              />
            </div>
            <div>
              <Label>Property Type</Label>
              <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Bedrooms</Label>
              <Select value={formData.bedrooms} onValueChange={(value) => setFormData(prev => ({ ...prev, bedrooms: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Bathrooms</Label>
              <Select value={formData.bathrooms} onValueChange={(value) => setFormData(prev => ({ ...prev, bathrooms: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bathroom</SelectItem>
                  <SelectItem value="2">2 Bathrooms</SelectItem>
                  <SelectItem value="3">3 Bathrooms</SelectItem>
                  <SelectItem value="4">4+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Location *</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Westlands, Nairobi"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-1" />
                Map
              </Button>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Describe your property, highlight unique features, nearby amenities..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          <div>
            <Label>Property Photos</Label>
            <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="property-photos"
              />
              <label htmlFor="property-photos" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload property photos</span>
                <span className="text-xs text-muted-foreground">Recommended: 5-10 high-quality photos</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              {mode === 'add' ? 'Submit Property' : 'Update Property'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};