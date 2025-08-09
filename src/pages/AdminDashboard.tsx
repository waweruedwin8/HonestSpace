import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Home, 
  DollarSign, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Star,
  Eye,
  MessageSquare
} from "lucide-react";

export const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Mock data - will be replaced with real API calls
  const adminStats = {
    totalUsers: 2847,
    totalProperties: 1523,
    totalRevenue: 15420,
    pendingVerifications: 23,
    activeScouts: 45,
    newSignupsToday: 12,
    propertyViewsToday: 3421,
    applicationsToday: 8
  };

  const pendingVerifications = [
    {
      id: "1",
      property: "Westlands 2BR Modern Apartment",
      landlord: "John Kamau",
      scout: "Mary Wanjiku",
      submittedDate: "2 hours ago",
      priority: "high",
      status: "pending_review"
    },
    {
      id: "2",
      property: "Karen 3BR Villa",
      landlord: "Alice Muthoni",
      scout: "James Kiprotich", 
      submittedDate: "5 hours ago",
      priority: "medium",
      status: "pending_review"
    }
  ];

  const scoutApplications = [
    {
      id: "1",
      name: "David Mwangi",
      location: "Nairobi",
      experience: "2 years",
      rating: 4.6,
      submittedDate: "1 day ago",
      status: "under_review"
    },
    {
      id: "2",
      name: "Grace Wanjira",
      location: "Nakuru",
      experience: "3 years",
      rating: 4.8,
      submittedDate: "3 days ago",
      status: "documents_pending"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management tools</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
            <TabsTrigger value="scouts">Scouts</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+{adminStats.newSignupsToday} today</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Properties Listed</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.totalProperties.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">{adminStats.pendingVerifications} pending verification</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Scouts</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.activeScouts}</div>
                    <p className="text-xs text-muted-foreground">covering 15 areas</p>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{adminStats.propertyViewsToday.toLocaleString()} Property Views</p>
                        <p className="text-xs text-muted-foreground">+15% from yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">{adminStats.newSignupsToday} New Signups</p>
                        <p className="text-xs text-muted-foreground">8 tenants, 4 landlords</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">{adminStats.applicationsToday} Scout Applications</p>
                        <p className="text-xs text-muted-foreground">6 new, 2 renewals</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">23 Support Tickets</p>
                        <p className="text-xs text-muted-foreground">5 urgent, 18 normal</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Verifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingVerifications.slice(0, 3).map((verification) => (
                        <div key={verification.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{verification.property}</p>
                            <p className="text-xs text-muted-foreground">Scout: {verification.scout}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={verification.priority === 'high' ? 'destructive' : 'secondary'}>
                              {verification.priority}
                            </Badge>
                            <Button size="sm" variant="outline">Review</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scout Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scoutApplications.slice(0, 3).map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{application.name}</p>
                            <p className="text-xs text-muted-foreground">{application.location} • {application.experience} experience</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current text-yellow-500" />
                              <span className="text-xs">{application.rating}</span>
                            </div>
                            <Button size="sm" variant="outline">Review</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verifications">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Property Verifications</h2>
                <Button>Bulk Review</Button>
              </div>
              
              <div className="space-y-4">
                {pendingVerifications.map((verification) => (
                  <Card key={verification.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{verification.property}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>Landlord: <span className="font-medium text-foreground">{verification.landlord}</span></span>
                            <span>Scout: <span className="font-medium text-foreground">{verification.scout}</span></span>
                            <span>Submitted: <span className="font-medium text-foreground">{verification.submittedDate}</span></span>
                          </div>
                        </div>
                        <Badge variant={verification.priority === 'high' ? 'destructive' : 'secondary'}>
                          {verification.priority === 'high' ? '🔴 High Priority' : '🟡 Medium Priority'}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="default" size="sm">Approve Verification</Button>
                        <Button variant="outline" size="sm">Request Changes</Button>
                        <Button variant="outline" size="sm">View Full Report</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scouts">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Scout Management</h2>
                <Button>Recruit Scouts</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Scouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.activeScouts}</div>
                    <p className="text-sm text-muted-foreground">across 15 areas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Applications Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground">awaiting review</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.7/5.0</div>
                    <p className="text-sm text-muted-foreground">from landlord feedback</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Scout Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scoutApplications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium">{application.name}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>Location: {application.location}</span>
                              <span>Experience: {application.experience}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current text-yellow-500" />
                                <span>{application.rating} rating</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={application.status === 'under_review' ? 'secondary' : 'outline'}>
                            {application.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm">Approve Application</Button>
                          <Button variant="outline" size="sm">Schedule Interview</Button>
                          <Button variant="outline" size="sm">View Documents</Button>
                          <Button variant="destructive" size="sm">Reject</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Property Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.totalProperties.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">listed properties</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Verified Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,245</div>
                    <p className="text-sm text-muted-foreground">82% of total</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.pendingVerifications}</div>
                    <p className="text-sm text-muted-foreground">awaiting scout review</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Flagged Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-sm text-muted-foreground">require attention</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Property Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Westlands 2BR Modern Apartment</p>
                        <p className="text-sm text-muted-foreground">Listed by John Kamau • 2 hours ago</p>
                      </div>
                      <Badge variant="secondary">Pending Verification</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Karen 3BR Villa</p>
                        <p className="text-sm text-muted-foreground">Verified by James K. • 4 hours ago</p>
                      </div>
                      <Badge variant="default">Verified</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">User Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">registered accounts</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tenants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,156</div>
                    <p className="text-sm text-muted-foreground">76% of users</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Landlords</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">646</div>
                    <p className="text-sm text-muted-foreground">23% of users</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{adminStats.activeScouts}</div>
                    <p className="text-sm text-muted-foreground">1% of users</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Today's Signups</span>
                      <span className="font-bold">+{adminStats.newSignupsToday}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>This Week</span>
                      <span className="font-bold">+89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>This Month</span>
                      <span className="font-bold">+342</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Platform Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,892</div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">+12.5%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$15,420</div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">+8.3%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2%</div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">+0.4%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.6/5.0</div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">+0.2</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">API Response Time</p>
                        <p className="text-sm text-muted-foreground">Average 89ms</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Uptime</p>
                        <p className="text-sm text-muted-foreground">99.9% this month</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Active Issues</p>
                        <p className="text-sm text-muted-foreground">2 minor issues</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};