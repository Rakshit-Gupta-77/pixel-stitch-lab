import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

interface CartItem {
  id: number;
  product_id: string;
  name: string;
  design: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  description?: string;
  image_url?: string;
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      product_id: '1',
      name: "Custom Hoodie",
      design: "Dragon Design",
      size: "M",
      color: "Black",
      price: 49.99,
      quantity: 1,
      description: "Premium custom hoodie",
      image_url: "/placeholder.svg",
    },
    {
      id: 2,
      product_id: '2',
      name: "Custom T-Shirt",
      design: "Floral Pattern",
      size: "L",
      color: "White",
      price: 29.99,
      quantity: 2,
      description: "Comfortable cotton t-shirt",
      image_url: "/placeholder.svg",
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(items => items.filter(item => item.id !== id));
  };

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
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>

                    {/* Remove */}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Checkout */}
            <div className="space-y-6">
              <CheckoutForm 
                items={items.map(item => ({
                  product_id: item.product_id,
                  name: item.name,
                  description: item.description || item.design,
                  price: item.price,
                  quantity: item.quantity,
                  size: item.size,
                  image_url: item.image_url,
                }))}
              />
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
