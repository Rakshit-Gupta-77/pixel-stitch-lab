import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear cart on successful payment
    if (sessionId) {
      localStorage.removeItem('cart');
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold">Payment Successful!</h1>
          
          <p className="text-lg text-muted-foreground">
            Thank you for your order. Your custom apparel is being prepared.
          </p>

          {sessionId && (
            <p className="text-sm text-muted-foreground">
              Order ID: {sessionId}
            </p>
          )}

          <div className="pt-6 space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="w-full md:w-auto"
            >
              View My Orders
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

export default PaymentSuccess;
