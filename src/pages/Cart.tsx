import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
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
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data: cartData, error } = await supabase
          .from('cart_items')
          .select(`
            id,
            quantity,
            size,
            design_id,
            products (
              id,
              name,
              price,
              description,
              image_url
            ),
            designs (
              name
            )
          `)
          .eq('user_id', user.id);

        if (error) throw error;

        const formattedItems: CartItem[] = (cartData || []).map((item: any) => ({
          id: item.id,
          product_id: item.products.id,
          name: item.products.name,
          design: item.designs?.name || 'Custom Design',
          size: item.size || 'M',
          color: 'Custom',
          price: item.products.price,
          quantity: item.quantity,
          description: item.products.description,
          image_url: item.products.image_url,
        }));

        setItems(formattedItems);
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load cart items',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, toast]);

  const updateQuantity = async (id: string, delta: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', id);

      if (error) throw error;

      setItems(items =>
        items.map(item =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update quantity',
      });
    }
  };

  const removeItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(items => items.filter(item => item.id !== id));
      
      toast({
        title: 'Item removed',
        description: 'Item removed from cart',
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to remove item',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

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
