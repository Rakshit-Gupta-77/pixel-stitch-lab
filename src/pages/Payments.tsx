import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CreditCard, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Payments = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-secondary/40 via-primary/10 to-accent/20">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm font-medium">Payments</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Seamless Checkout Coming Soon
          </h1>
          <p className="text-lg text-muted-foreground">
            We’re preparing secure Stripe integration for payments. This page is a frontend placeholder.
            The full backend flow will be enabled shortly.
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
            <Button variant="hero" asChild>
              <Link to="/checkout">
                <Rocket className="h-4 w-4 mr-2" />
                Preview Checkout UI
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://stripe.com/docs" target="_blank" rel="noreferrer">Learn about Stripe</a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payments;
