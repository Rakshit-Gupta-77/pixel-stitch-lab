import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <XCircle className="h-24 w-24 text-orange-500" />
          </div>
          
          <h1 className="text-4xl font-bold">Payment Cancelled</h1>
          
          <p className="text-lg text-muted-foreground">
            Your payment was cancelled. Your cart items are still saved.
          </p>

          <div className="pt-6 space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/cart')}
              className="w-full md:w-auto"
            >
              Return to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/products')}
              className="w-full md:w-auto"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentCancel;
