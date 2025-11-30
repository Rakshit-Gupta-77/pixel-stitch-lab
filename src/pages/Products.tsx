import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
  image_url: string | null;
}

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container">
          <div className="space-y-4 mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">Customize Your Style</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Choose from our collection of premium garments and make them uniquely yours with our AI-powered design studio
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No products available yet.</p>
              </div>
            ) : (
              products.map((product, index) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                      src={product.image_url || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
                      {user ? (
                        <Link to="/customize">
                          <Button variant="hero" size="sm">
                            Customize
                          </Button>
                        </Link>
                      ) : (
                        <Link to="/login">
                          <Button variant="hero" size="sm">
                            Sign in to Customize
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our 3D customization studio lets you design every detail. Add graphics, text, colors, and more.
            </p>
            {user ? (
              <Link to="/customize">
                <Button variant="accent" size="lg">
                  Open Design Studio
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button variant="accent" size="lg">
                  Sign Up to Start Designing
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
