import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, FileText, Phone, Mail, Building } from "lucide-react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  application?: {
    id: string;
    name: string;
    phone: string;
    email: string;
    property: string;
    company: string;
    position: string;
    income: string;
    documents: string[];
  };
}

export const ApplicationModal = ({ isOpen, onClose, application }: ApplicationModalProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");

  const handleApprove = () => {
    toast({
      title: "Application Approved",
      description: "Tenant application has been approved. Welcome message sent.",
    });
    onClose();
  };

  const handleReject = () => {
    toast({
      title: "Application Rejected",
      description: "Application rejected with feedback sent to applicant.",
    });
    onClose();
  };

  const handleRequestDocuments = () => {
    toast({
      title: "Documents Requested",
      description: "Request for missing documents sent to applicant.",
    });
    onClose();
  };

  const documents = [
    { name: "Copy of ID", status: "received" },
    { name: "3 recent payslips", status: "received" },
    { name: "Bank statements (3 months)", status: "received" },
    { name: "Letter from employer", status: "received" },
    { name: "Previous landlord reference", status: "missing" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Tenant Application</DialogTitle>
        </DialogHeader>

        {application && (
          <div className="space-y-6">
            {/* Application Header */}
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{application.name}</h3>
                <Badge variant="secondary">Pending Review</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{application.property}</p>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{application.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{application.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Employment Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company:</span>
                    <span>{application.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position:</span>
                    <span>{application.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Income:</span>
                    <span className="font-medium">{application.income}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Checklist */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Document Checklist
              </h4>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">{doc.name}</span>
                    <div className="flex items-center gap-2">
                      {doc.status === 'received' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Received
                          </Badge>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <Badge variant="destructive">Missing</Badge>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Income Analysis */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Income Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monthly Income:</span>
                  <span className="font-medium">$1,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Property Rent:</span>
                  <span>$450</span>
                </div>
                <div className="flex justify-between">
                  <span>Income-to-Rent Ratio:</span>
                  <span className="font-medium text-green-600">2.7x (Good)</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label>Review Notes</Label>
              <Textarea
                placeholder="Add any notes about this application..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleApprove} className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
              <Button variant="outline" onClick={handleRequestDocuments}>
                Request Missing Documents
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};