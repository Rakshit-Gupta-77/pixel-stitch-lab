import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [items] = useState([
    {
      id: 1,
      name: "Custom Hoodie",
      design: "Dragon Design",
      size: "M",
      color: "Black",
      price: 49.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Custom T-Shirt",
      design: "Floral Pattern",
      size: "L",
      color: "White",
      price: 29.99,
      quantity: 2,
    },
  ]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 9.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border">
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Button variant="hero" asChild>
                    <Link to="/products">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-lg border p-6 flex gap-6 items-center hover:shadow-card transition-shadow"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-24 bg-secondary rounded-md flex-shrink-0" />

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.design}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>

                    {/* Remove */}
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6 space-y-4 sticky top-4">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Input placeholder="Promo code" />
                  <Button variant="outline" className="w-full">Apply</Button>
                </div>

                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
