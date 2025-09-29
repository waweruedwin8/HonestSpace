import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Calendar, Phone, Mail } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry?: {
    id: string;
    name: string;
    phone: string;
    email: string;
    property: string;
    message: string;
    date: string;
  };
}

export const InquiryModal = ({ isOpen, onClose, inquiry }: InquiryModalProps) => {
  const { toast } = useToast();
  const [response, setResponse] = useState("");
  const [viewingDate, setViewingDate] = useState("");
  const [viewingTime, setViewingTime] = useState("");

  const templates = [
    {
      title: "Standard Response",
      content: "Thank you for your interest in my property! I'd be happy to schedule a viewing. When would be convenient for you?"
    },
    {
      title: "Viewing Availability",
      content: "I have availability for viewings this week on Tuesday after 2 PM, Wednesday morning, or Friday evening. Which works best for you?"
    },
    {
      title: "Property Details",
      content: "Here are some additional details about the property: Recently renovated, excellent internet connectivity, 24/7 security, and close to public transport."
    }
  ];

  const handleSendResponse = () => {
    toast({
      title: "Response Sent",
      description: "Your message has been sent to the inquirer.",
    });
    onClose();
  };

  const handleScheduleViewing = () => {
    if (!viewingDate || !viewingTime) {
      toast({
        title: "Please select date and time",
        description: "Both date and time are required to schedule a viewing.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Viewing Scheduled",
      description: `Viewing scheduled for ${viewingDate} at ${viewingTime}. Confirmation sent to tenant.`,
    });
    onClose();
  };

  const handleDecline = () => {
    toast({
      title: "Inquiry Declined",
      description: "Polite decline message sent to inquirer.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Inquiry</DialogTitle>
        </DialogHeader>

        {inquiry && (
          <div className="space-y-6">
            {/* Inquiry Details */}
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">{inquiry.name}</h3>
                  <p className="text-sm text-muted-foreground">{inquiry.property}</p>
                </div>
                <Badge variant="secondary">New Inquiry</Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{inquiry.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{inquiry.email}</span>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-background rounded border">
                <p className="text-sm">{inquiry.message}</p>
              </div>
            </div>

            {/* Quick Response Templates */}
            <div>
              <Label>Quick Response Templates</Label>
              <div className="mt-2 space-y-2">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setResponse(template.content)}
                    className="w-full text-left p-3 border rounded hover:bg-muted/50 text-sm"
                  >
                    <div className="font-medium">{template.title}</div>
                    <div className="text-muted-foreground text-xs mt-1">{template.content.slice(0, 80)}...</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Response */}
            <div>
              <Label>Your Response</Label>
              <Textarea
                placeholder="Type your custom message..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            {/* Schedule Viewing */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Viewing
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={viewingDate}
                    onChange={(e) => setViewingDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={viewingTime}
                    onChange={(e) => setViewingTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSendResponse} className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Response
              </Button>
              <Button variant="outline" onClick={handleScheduleViewing}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Viewing
              </Button>
              <Button variant="outline" onClick={handleDecline}>
                Decline Politely
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};