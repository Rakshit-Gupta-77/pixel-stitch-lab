import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Heart, Settings, Edit, ShoppingCart, Download } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-lg mb-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                JD
              </div>
              <div>
                <h1 className="text-3xl font-bold">John Doe</h1>
                <p className="text-white/80">john.doe@example.com</p>
                <p className="text-sm text-white/70 mt-1">Member since January 2025</p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="orders">
                <Package className="mr-2 h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="designs">
                <Heart className="mr-2 h-4 w-4" />
                My Designs
              </TabsTrigger>
              <TabsTrigger value="history">
                <ShoppingCart className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              <h2 className="text-2xl font-bold">My Orders</h2>
              
              {[1, 2, 3].map((order) => (
                <div key={order} className="bg-card rounded-lg border p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Order #ORD-{1000 + order}</p>
                      <p className="text-sm text-muted-foreground">Placed on Jan {order}, 2025</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      In Progress
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-secondary rounded" />
                    <div className="flex-1">
                      <p className="font-medium">Custom Hoodie</p>
                      <p className="text-sm text-muted-foreground">Dragon Design • Size M</p>
                      <p className="text-sm font-medium mt-1">$49.99</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">Track Order</Button>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="designs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Saved Designs</h2>
                <Button variant="hero">Create New Design</Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((design) => (
                  <div key={design} className="bg-card rounded-lg border overflow-hidden group hover:shadow-elegant transition-all">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20" />
                    <div className="p-4 space-y-3">
                      <p className="font-medium">Design {design}</p>
                      <p className="text-sm text-muted-foreground">Created Jan {design}, 2025</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="accent" size="sm" className="flex-1">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Order
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <h2 className="text-2xl font-bold">AI Generation History</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-card rounded-lg border overflow-hidden">
                    <div className="aspect-square bg-secondary" />
                    <div className="p-3 space-y-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        AI design prompt preview...
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="accent" size="sm" className="flex-1">
                          Use Design
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="bg-card rounded-lg border p-6 space-y-6">
                <h2 className="text-2xl font-bold">Account Settings</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="John Doe" />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="john.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input type="tel" defaultValue="+1 (555) 000-0000" />
                  </div>

                  <div className="pt-4">
                    <Button variant="hero">Save Changes</Button>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-6 space-y-6">
                <h2 className="text-xl font-bold">Shipping Address</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input placeholder="123 Main Street" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input placeholder="NY" />
                    </div>
                    <div className="space-y-2">
                      <Label>ZIP</Label>
                      <Input placeholder="10001" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline">Update Address</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
