import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Lock } from "lucide-react";

const Checkout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
              <span className="font-medium">Cart</span>
            </div>
            <div className="flex-1 h-px bg-primary" />
            <div className="flex items-center gap-2 text-primary">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</div>
              <span className="font-medium">Checkout</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-semibold">3</div>
              <span>Complete</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Checkout Form */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-card rounded-lg border p-6 space-y-6">
                <h2 className="text-2xl font-bold">Shipping Information</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" />
                </div>

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
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP Code</Label>
                    <Input placeholder="10001" />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card rounded-lg border p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Payment Information</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Secure Payment
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <div className="relative">
                    <Input placeholder="1234 5678 9012 3456" className="pl-10" />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="123" maxLength={3} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cardholder Name</Label>
                  <Input placeholder="John Doe" />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6 space-y-6 sticky top-4">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex gap-4 pb-4 border-b">
                    <div className="w-16 h-16 bg-secondary rounded" />
                    <div className="flex-1">
                      <p className="font-medium">Custom Hoodie</p>
                      <p className="text-sm text-muted-foreground">Size M • Black</p>
                      <p className="text-sm font-medium">$49.99</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pb-4 border-b">
                    <div className="w-16 h-16 bg-secondary rounded" />
                    <div className="flex-1">
                      <p className="font-medium">Custom T-Shirt</p>
                      <p className="text-sm text-muted-foreground">Size L • White</p>
                      <p className="text-sm font-medium">$59.98 (×2)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">$109.97</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">$9.99</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">$119.96</span>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Place Order
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to our Terms and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
