import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Camera, MapPin, Upload, Star } from "lucide-react";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: {
    id: string;
    title: string;
    address: string;
    landlord: string;
  };
  mode: 'review' | 'submit';
}

export const VerificationModal = ({ isOpen, onClose, property, mode }: VerificationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    photos: [] as File[],
    notes: "",
    rating: 0,
    internetSpeed: "",
    safetyRating: 0,
    location: "",
    amenities: [] as string[],
    issues: ""
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const handleSubmit = () => {
    if (mode === 'submit') {
      toast({
        title: "Verification Submitted",
        description: "Your property verification has been submitted for admin review.",
      });
    } else {
      toast({
        title: "Verification Approved",
        description: "Property verification has been approved and published.",
      });
    }
    onClose();
  };

  const handleReject = () => {
    toast({
      title: "Verification Rejected",
      description: "Property verification has been rejected. Feedback sent to scout.",
      variant: "destructive"
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'submit' ? 'Submit Property Verification' : 'Review Property Verification'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {property && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-sm text-muted-foreground">{property.address}</p>
              <p className="text-sm text-muted-foreground">Landlord: {property.landlord}</p>
            </div>
          )}

          <div>
            <Label>Property Photos *</Label>
            <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Camera className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload photos</span>
              </label>
              {formData.photos.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.photos.map((file, index) => (
                    <Badge key={index} variant="secondary">{file.name}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Location Verification</Label>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="Confirm exact location/GPS coordinates"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-1" />
                Get GPS
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Internet Speed Test</Label>
              <Input
                placeholder="e.g., 25 Mbps"
                value={formData.internetSpeed}
                onChange={(e) => setFormData(prev => ({ ...prev, internetSpeed: e.target.value }))}
              />
            </div>
            <div>
              <Label>Overall Property Rating</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className={`p-1 ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label>Verification Notes</Label>
            <Textarea
              placeholder="Detailed notes about property condition, amenities, accessibility..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
            />
          </div>

          {mode === 'submit' && (
            <div>
              <Label>Any Issues or Concerns</Label>
              <Textarea
                placeholder="Report any issues that need landlord attention..."
                value={formData.issues}
                onChange={(e) => setFormData(prev => ({ ...prev, issues: e.target.value }))}
                rows={3}
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            {mode === 'submit' ? (
              <>
                <Button onClick={handleSubmit} className="flex-1">
                  Submit for Review
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Save Draft
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleSubmit} className="flex-1">
                  Approve Verification
                </Button>
                <Button variant="outline" onClick={() => {}}>
                  Request Changes
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};