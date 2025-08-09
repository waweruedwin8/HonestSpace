import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Camera, 
  CheckCircle, 
  Clock, 
  DollarSign,
  FileText,
  Star,
  AlertTriangle,
  Calendar,
  Navigation
} from "lucide-react";

export const ScoutDashboard = () => {
  const { user } = useAuth();
  
  // Mock data - will be replaced with real API calls
  const scoutStats = {
    completedVerifications: 23,
    pendingAssignments: 3,
    monthlyEarnings: 460,
    averageRating: 4.8,
    responseTime: "2.3 hours",
    successRate: 98
  };

  const assignments = [
    {
      id: "1",
      property: "Westlands 2BR Modern Apartment",
      landlord: "John Kamau",
      address: "Westlands, Nairobi",
      dueDate: "Today, 6:00 PM",
      priority: "high",
      payment: 25,
      distance: "1.2 km away"
    },
    {
      id: "2",
      property: "Kileleshwa Studio",
      landlord: "Mary Wanjiku", 
      address: "Kileleshwa, Nairobi",
      dueDate: "Tomorrow, 10:00 AM",
      priority: "medium",
      payment: 20,
      distance: "3.4 km away"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Scout Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName}! Ready for your next verification?</p>
        </div>

        <Tabs defaultValue="assignments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments">
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{scoutStats.pendingAssignments}</div>
                    <p className="text-xs text-muted-foreground">properties to verify</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">This Month</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{scoutStats.completedVerifications}</div>
                    <p className="text-xs text-muted-foreground">verifications completed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Response</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{scoutStats.responseTime}</div>
                    <p className="text-xs text-muted-foreground">assignment acceptance time</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{scoutStats.successRate}%</div>
                    <p className="text-xs text-muted-foreground">verification success rate</p>
                  </CardContent>
                </Card>
              </div>

              {/* Current Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium">{assignment.property}</h4>
                            <p className="text-sm text-muted-foreground">Landlord: {assignment.landlord}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span className="text-sm text-muted-foreground">{assignment.address}</span>
                              <span className="text-sm text-blue-600">• {assignment.distance}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={assignment.priority === 'high' ? 'destructive' : 'secondary'}>
                              {assignment.priority === 'high' ? '🔴 High Priority' : '🟡 Medium Priority'}
                            </Badge>
                            <p className="text-sm font-medium mt-1">${assignment.payment}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Due: {assignment.dueDate}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Navigation className="w-3 h-3 mr-1" />
                              Get Directions
                            </Button>
                            <Button size="sm">Start Verification</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Verification Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Verification Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Camera and backup power bank charged</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Internet speed test app ready</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <span className="text-sm">Emergency contact numbers saved</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">Transportation arranged for all locations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Earnings & Payments</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">${scoutStats.monthlyEarnings}</div>
                    <p className="text-sm text-muted-foreground">From {scoutStats.completedVerifications} verifications</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$125</div>
                    <p className="text-sm text-muted-foreground">Will be paid on Friday</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average per Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$20</div>
                    <p className="text-sm text-muted-foreground">Based on property type</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">Westlands 2BR Verification</p>
                        <p className="text-sm text-muted-foreground">Completed 2 days ago</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$25</p>
                        <Badge variant="outline" className="text-xs">Paid</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">Karen 3BR Villa Verification</p>
                        <p className="text-sm text-muted-foreground">Completed 3 days ago</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$30</p>
                        <Badge variant="secondary" className="text-xs">Pending</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Verification History</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Completed Verifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Westlands 2BR Modern Apartment</h4>
                          <p className="text-sm text-muted-foreground">Verified on Mar 15, 2025</p>
                        </div>
                        <Badge variant="default">Approved</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Score: 9.2/10</span>
                        <span>Photos: 12</span>
                        <span>Time: 45 minutes</span>
                        <span>Payment: $25</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Karen 3BR Villa</h4>
                          <p className="text-sm text-muted-foreground">Verified on Mar 12, 2025</p>
                        </div>
                        <Badge variant="default">Approved</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Score: 8.8/10</span>
                        <span>Photos: 15</span>
                        <span>Time: 52 minutes</span>
                        <span>Payment: $30</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="training">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Scout Training & Certification</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Certification Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Overall Progress</span>
                          <span className="font-bold">92%</span>
                        </div>
                        <Progress value={92} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Property Photography</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Infrastructure Assessment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Safety Evaluation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">Customer Communication (Pending)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Available Training</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border rounded p-3">
                        <h4 className="font-medium">Advanced Photography Techniques</h4>
                        <p className="text-sm text-muted-foreground">Learn professional property photography</p>
                        <Button variant="outline" size="sm" className="mt-2">Start Course</Button>
                      </div>
                      
                      <div className="border rounded p-3">
                        <h4 className="font-medium">Conflict Resolution</h4>
                        <p className="text-sm text-muted-foreground">Handle difficult landlord situations</p>
                        <Button variant="outline" size="sm" className="mt-2">Start Course</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Scout Profile</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold">{scoutStats.averageRating}/5.0</div>
                      <p className="text-sm text-muted-foreground">Based on 23 landlord reviews</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Verification Quality</span>
                        <span className="font-medium">4.9/5.0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Punctuality</span>
                        <span className="font-medium">4.8/5.0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Communication</span>
                        <span className="font-medium">4.7/5.0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Professionalism</span>
                        <span className="font-medium">4.9/5.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scout Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Verifications</p>
                        <p className="text-xl font-bold">89</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-xl font-bold">{scoutStats.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Time</p>
                        <p className="text-xl font-bold">42 min</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Areas Covered</p>
                        <p className="text-xl font-bold">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};