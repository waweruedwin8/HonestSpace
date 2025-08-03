import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ReviewsTabProps {
  reviews: Array<{
    id: number;
    rating: number;
    text: string;
    author: string;
    date: string;
  }>;
}

export const ReviewsTab = ({ reviews }: ReviewsTabProps) => {
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  
  // Mock login state - replace with actual auth
  const isLoggedIn = true;
  
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  const handleSubmitReview = () => {
    if (newRating > 0 && newReview.trim()) {
      // Handle review submission here
      console.log({ rating: newRating, review: newReview });
      setNewRating(0);
      setNewReview("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on {reviews.length} reviews
              </div>
            </div>
            
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm">{rating}</span>
                    <Star className="w-3 h-3 fill-primary text-primary" />
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave a Review */}
      {isLoggedIn && (
        <Card>
          <CardHeader>
            <CardTitle>Leave a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setNewRating(rating)}
                    className="transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= (hoveredRating || newRating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Review</label>
              <Textarea
                placeholder="Share your experience with this property..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows={4}
              />
            </div>
            
            <Button 
              onClick={handleSubmitReview}
              disabled={newRating === 0 || !newReview.trim()}
              className="w-full"
            >
              Submit Review
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>
                    {review.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{review.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      {review.rating}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};