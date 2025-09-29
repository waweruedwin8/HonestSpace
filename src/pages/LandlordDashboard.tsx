import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PropertyFormModal } from "@/components/modals/PropertyFormModal";
import { InquiryModal } from "@/components/modals/InquiryModal";
import { ApplicationModal } from "@/components/modals/ApplicationModal";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  DollarSign, 
  Eye, 
  MessageSquare, 
  Calendar, 
  FileText,
  Star,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

export const LandlordDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [propertyModal, setPropertyModal] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    property?: any;
  }>({ isOpen: false, mode: 'add' });
  
  const [inquiryModal, setInquiryModal] = useState<{
    isOpen: boolean;
    inquiry?: any;
  }>({ isOpen: false });
  
  const [applicationModal, setApplicationModal] = useState<{
    isOpen: boolean;
    application?: any;
  }>({ isOpen: false });
  
  // Mock data - will be replaced with real API calls
  const dashboardStats = {
    totalProperties: 7,
    activeListings: 5,
    rentedProperties: 2,
    monthlyRevenue: 2340,
    averageRating: 4.2,
    profileCompleteness: 89,
    newInquiries: 23,
    propertyViews: 1247,
    scheduledVisits: 8,
    pendingApplications: 4
  };

  const properties = [
    {
      id: "1",
      title: "Westlands 2BR Modern Apartment",
      status: "active",
      rent: 450,
      inquiries: 5,
      views: 89,
      verificationDate: "3 days ago",
      verifiedBy: "James K.",
      trustBadges: ["Reliable Internet", "Safe at Night", "24/7 Water"]
    },
    {
      id: "2", 
      title: "Kileleshwa Studio Apartment",
      status: "pending",
      rent: 280,
      scoutAssigned: "Mary W.",
      dueDate: "24 hours",
      submissionDate: "2 days ago"
    }
  ];

  return (
    <DashboardLayout title="Landlord Dashboard" userType="landlord">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Landlord Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName}! Manage your property portfolio.</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Portfolio Summary Cards */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalProperties}</div>
                  <p className="text-xs text-muted-foreground">properties listed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardStats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">from {dashboardStats.rentedProperties} rented properties</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.averageRating}/5.0</div>
                  <p className="text-xs text-muted-foreground">stars from tenant reviews</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Complete</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.profileCompleteness}%</div>
                  <Progress value={dashboardStats.profileCompleteness} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* This Month's Activity */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>This Month's Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{dashboardStats.newInquiries} New Inquiries</p>
                      <p className="text-xs text-muted-foreground">potential tenants contacted you</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">{dashboardStats.propertyViews.toLocaleString()} Property Views</p>
                      <p className="text-xs text-muted-foreground">total views across all properties</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">{dashboardStats.scheduledVisits} Scheduled Visits</p>
                      <p className="text-xs text-muted-foreground">confirmed property viewings</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">{dashboardStats.pendingApplications} Applications</p>
                      <p className="text-xs text-muted-foreground">rental applications pending review</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{property.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                            {property.status === 'active' ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Active & Verified
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                Pending Verification
                              </>
                            )}
                          </Badge>
                          <span className="text-sm text-muted-foreground">${property.rent}/month</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Property Management</h2>
                <Button onClick={() => setPropertyModal({ isOpen: true, mode: 'add' })}>
                  Add New Property
                </Button>
              </div>
              
              <div className="space-y-4">
                {properties.map((property) => (
                  <Card key={property.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                          <div className="flex items-center gap-4 mb-3">
                            <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                              {property.status === 'active' ? '🟢 Active & Verified' : '🟡 Pending Verification'}
                            </Badge>
                            <span className="font-medium">${property.rent}/month</span>
                          </div>
                          
                          {property.status === 'active' ? (
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <p>Current Inquiries: <span className="font-medium text-foreground">{property.inquiries} active conversations</span></p>
                              <p>Last 30 Days: <span className="font-medium text-foreground">{property.views} views, {property.inquiries} inquiries</span></p>
                              <p>Verification: <span className="font-medium text-foreground">Verified {property.verificationDate} by {property.verifiedBy}</span></p>
                              <div className="flex gap-2 mt-2">
                                {property.trustBadges?.map((badge, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">✓ {badge}</Badge>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <p>Scout Assignment: <span className="font-medium text-foreground">Assigned to {property.scoutAssigned} - Due in {property.dueDate}</span></p>
                              <p>Submission Date: <span className="font-medium text-foreground">Submitted {property.submissionDate}</span></p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => {
                            toast({ title: "Opening Property", description: "Redirecting to property listing..." });
                          }}>
                            View Listing
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => {
                            setPropertyModal({ isOpen: true, mode: 'edit', property });
                          }}>
                            Edit Details
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => {
                            toast({ title: "Analytics", description: "Opening property analytics..." });
                          }}>
                            Analytics
                          </Button>
                          {property.status === 'active' ? (
                            <Button variant="outline" size="sm" onClick={() => {
                              setInquiryModal({ 
                                isOpen: true, 
                                inquiry: {
                                  id: "1",
                                  name: "Sarah M.",
                                  phone: "+254 701 123 456",
                                  email: "sarah.m@email.com",
                                  property: property.title,
                                  message: "Hi! I'm interested in viewing this property.",
                                  date: "2 hours ago"
                                }
                              });
                            }}>
                              Manage Inquiries
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({ title: "Contacting Scout", description: "Opening scout communication..." });
                            }}>
                              Contact Scout
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inquiries">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Tenant Inquiry Management</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Active Conversations (8)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">Inquiry from Sarah M.</h4>
                          <p className="text-sm text-muted-foreground">Interested Property: Westlands 2BR Modern</p>
                          <p className="text-sm text-muted-foreground">Contact: +254 701 123 456</p>
                        </div>
                        <Badge variant="secondary">🟡 Awaiting your response</Badge>
                      </div>
                      <p className="text-sm mb-3 bg-muted p-3 rounded">"Hi! I'm interested in viewing this property. I work in tech and looking to move by end of month. When can I schedule a viewing?"</p>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => {
                          setInquiryModal({ 
                            isOpen: true, 
                            inquiry: {
                              id: "1",
                              name: "Sarah M.",
                              phone: "+254 701 123 456",
                              email: "sarah.m@email.com",
                              property: "Westlands 2BR Modern",
                              message: "Hi! I'm interested in viewing this property. I work in tech and looking to move by end of month. When can I schedule a viewing?",
                              date: "2 hours ago"
                            }
                          });
                        }}>
                          Reply
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({ title: "Scheduling", description: "Opening viewing scheduler..." });
                        }}>
                          Schedule Viewing
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({ title: "Details Sent", description: "Property details sent to inquirer." });
                        }}>
                          Send Property Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({ title: "Declined", description: "Polite decline message sent." });
                        }}>
                          Decline Politely
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Property Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Inquiry Conversion Rate</p>
                        <p className="text-2xl font-bold">22%</p>
                        <p className="text-xs text-muted-foreground">23 views → 5 inquiries</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Response Time Impact</p>
                        <p className="text-sm text-muted-foreground">Your 2-hour avg response time increases inquiries by 34%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                        <p className="text-sm">Add more kitchen photos to increase inquiries by 15%</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                        <p className="text-sm">Your rent is competitive - consider highlighting unique features</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                        <p className="text-sm">Properties with virtual tours get 40% more qualified inquiries</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Tenant Applications</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Application: Sarah M. - Westlands 2BR</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Personal Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> Sarah Mwangi</p>
                        <p><span className="font-medium">Phone:</span> +254 701 123 456</p>
                        <p><span className="font-medium">Email:</span> sarah.mwangi@techcorp.ke</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Employment Details</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Company:</span> TechCorp Kenya Ltd.</p>
                        <p><span className="font-medium">Position:</span> Software Developer</p>
                        <p><span className="font-medium">Income:</span> $1,200/month (verified)</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Button onClick={() => {
                      setApplicationModal({ 
                        isOpen: true, 
                        application: {
                          id: "1",
                          name: "Sarah Mwangi",
                          phone: "+254 701 123 456",
                          email: "sarah.mwangi@techcorp.ke",
                          property: "Westlands 2BR",
                          company: "TechCorp Kenya Ltd.",
                          position: "Software Developer",
                          income: "$1,200/month",
                          documents: []
                        }
                      });
                    }}>
                      Review Application
                    </Button>
                    <Button variant="outline" onClick={() => {
                      toast({ title: "Documents Requested", description: "Missing document request sent." });
                    }}>
                      Request Missing Documents
                    </Button>
                    <Button variant="outline">Schedule Interview</Button>
                    <Button variant="destructive">Decline Application</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Profile & Trust Building</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Completeness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Current Progress</span>
                          <span className="font-bold">{dashboardStats.profileCompleteness}%</span>
                        </div>
                        <Progress value={dashboardStats.profileCompleteness} />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Personal information complete</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Profile photo uploaded</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                          <span>Missing: Bank account for direct deposits</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Landlord Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{dashboardStats.averageRating}/5.0</div>
                        <p className="text-sm text-muted-foreground">Based on 8 tenant reviews</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Responsiveness</span>
                          <span className="font-medium">4.5/5.0</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Property Accuracy</span>
                          <span className="font-medium">4.0/5.0</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Maintenance</span>
                          <span className="font-medium">3.8/5.0</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <PropertyFormModal
        isOpen={propertyModal.isOpen}
        onClose={() => setPropertyModal({ isOpen: false, mode: 'add' })}
        property={propertyModal.property}
        mode={propertyModal.mode}
      />

      <InquiryModal
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal({ isOpen: false })}
        inquiry={inquiryModal.inquiry}
      />

      <ApplicationModal
        isOpen={applicationModal.isOpen}
        onClose={() => setApplicationModal({ isOpen: false })}
        application={applicationModal.application}
      />
    </DashboardLayout>
  );
};