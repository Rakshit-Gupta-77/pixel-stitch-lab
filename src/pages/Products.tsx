import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import tshirtImage from "@/assets/product-tshirt.jpg";
import hoodieImage from "@/assets/product-hoodie.jpg";
import jacketImage from "@/assets/product-jacket.jpg";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Classic T-Shirt",
      category: "T-Shirts",
      price: "$29.99",
      image: tshirtImage,
      isPopular: true,
    },
    {
      id: 2,
      name: "Premium Hoodie",
      category: "Hoodies",
      price: "$49.99",
      image: hoodieImage,
      isPopular: true,
    },
    {
      id: 3,
      name: "Designer Jacket",
      category: "Jackets",
      price: "$79.99",
      image: jacketImage,
      isPopular: false,
    },
    {
      id: 4,
      name: "Crew Neck Sweatshirt",
      category: "Sweatshirts",
      price: "$39.99",
      image: hoodieImage,
      isPopular: false,
    },
    {
      id: 5,
      name: "Long Sleeve Tee",
      category: "T-Shirts",
      price: "$34.99",
      image: tshirtImage,
      isPopular: false,
    },
    {
      id: 6,
      name: "Zip-Up Hoodie",
      category: "Hoodies",
      price: "$54.99",
      image: hoodieImage,
      isPopular: true,
    },
  ];

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
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  {product.isPopular && (
                    <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
                      Popular
                    </Badge>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">{product.price}</p>
                    <Button variant="hero" size="sm">
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our 3D customization studio lets you design every detail. Add graphics, text, colors, and more.
            </p>
            <Button variant="accent" size="lg">
              Open Design Studio
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
