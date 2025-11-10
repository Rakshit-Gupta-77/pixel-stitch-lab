import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Palette, Box, Users } from "lucide-react";
import heroImage from "@/assets/hero-hoodie.jpg";
import tshirtImage from "@/assets/product-tshirt.jpg";
import hoodieImage from "@/assets/product-hoodie.jpg";
import jacketImage from "@/assets/product-jacket.jpg";

const Home = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Design",
      description: "Generate unique designs with AI or upload your own artwork",
    },
    {
      icon: Box,
      title: "3D Preview",
      description: "Visualize your design in real-time on realistic 3D models",
    },
    {
      icon: Palette,
      title: "Full Customization",
      description: "Choose colors, fabrics, and placement for your perfect piece",
    },
    {
      icon: Users,
      title: "Community Gallery",
      description: "Share your designs and get inspired by others' creations",
    },
  ];

  const featuredProducts = [
    { id: 1, name: "Custom T-Shirt", price: "$29.99", image: tshirtImage },
    { id: 2, name: "Designer Hoodie", price: "$49.99", image: hoodieImage },
    { id: 3, name: "Custom Jacket", price: "$79.99", image: jacketImage },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Design It.
                <br />
                Wear It.
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Your Way.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Create unique, personalized clothing with AI-powered design tools and 3D visualization. Express yourself like never before.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button variant="hero" size="lg">
                    Start Designing
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl" />
              <img
                src={heroImage}
                alt="Featured clothing"
                className="relative rounded-2xl shadow-[var(--shadow-elegant)] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Creativity Meets Technology
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI and 3D technology to give you complete creative freedom
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Start with these popular items and make them your own</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-lg font-bold text-primary">{product.price}</p>
                  <Link to="/products">
                    <Button variant="outline" className="w-full">
                      Customize Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/products">
              <Button variant="accent" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">Ready to Create Something Amazing?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of creators who are already designing their unique style
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
