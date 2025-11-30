import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingCart } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface CheckoutItem {
  product_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  size?: string;
  image_url?: string;
}

interface CheckoutFormProps {
  items: CheckoutItem[];
  designId?: string;
}

export const CheckoutForm = ({ items, designId }: CheckoutFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Your cart is empty',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { items, designId },
      });

      if (error) throw error;

      if (!data.sessionId || !data.url) {
        throw new Error('Invalid checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        variant: 'destructive',
        title: 'Checkout failed',
        description: error instanceof Error ? error.message : 'Failed to create checkout session',
      });
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                </p>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${(totalAmount + 5).toFixed(2)}</span>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={isProcessing || items.length === 0}
          className="w-full"
          variant="hero"
          size="lg"
        >
          {isProcessing ? 'Processing...' : 'Proceed to Payment'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Secure payment powered by Stripe
        </p>
      </CardContent>
    </Card>
  );
};
