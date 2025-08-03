import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  video?: string;
  title: string;
}

export const PropertyGallery = ({ images, video, title }: PropertyGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const allMedia = [...images, ...(video ? [video] : [])];
  const isVideo = (index: number) => index >= images.length;

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
        {/* Navigation Arrows */}
        {allMedia.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 transition-colors"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
        
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogTrigger asChild>
            <div className="relative w-full h-full cursor-pointer group">
              {isVideo(selectedIndex) ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg"
                    controls={false}
                  >
                    <source src={allMedia[selectedIndex]} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={allMedia[selectedIndex]}
                  alt={`${title} - Image ${selectedIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </DialogTrigger>
          
          <DialogContent className="max-w-6xl p-0 bg-black border-0">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
              
              {allMedia.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
              
              <div className="aspect-[16/9] max-h-[80vh]">
                {isVideo(selectedIndex) ? (
                  <video
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                  >
                    <source src={allMedia[selectedIndex]} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={allMedia[selectedIndex]}
                    alt={`${title} - Image ${selectedIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnail Navigation */}
      {allMedia.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {allMedia.slice(0, 10).map((media, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative aspect-square rounded-md overflow-hidden border-2 transition-all",
                selectedIndex === index
                  ? "border-primary shadow-sm"
                  : "border-transparent hover:border-muted-foreground"
              )}
            >
              {isVideo(index) ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video className="w-full h-full object-cover">
                    <source src={media} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={media}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};