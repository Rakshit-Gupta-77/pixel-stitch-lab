import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Leaf, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Pushing boundaries with AI and 3D technology to revolutionize fashion customization",
    },
    {
      icon: Heart,
      title: "Creativity",
      description: "Empowering everyone to express their unique style and personality",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to ethical materials and responsible production practices",
    },
    {
      icon: Shield,
      title: "Quality",
      description: "Premium fabrics and meticulous craftsmanship in every piece",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold">
                Revolutionizing Fashion
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  One Design at a Time
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Style Your Way is more than a platform—it's a movement to democratize fashion design and empower creative expression through cutting-edge technology.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                  We started with a simple belief: everyone deserves to wear clothing that truly represents who they are. But traditional fashion often limits creative freedom, forcing people to choose from pre-made designs.
                </p>
                <p className="text-muted-foreground">
                  That's why we built Style Your Way—a platform that combines AI-powered design tools with 3D visualization technology, making custom fashion accessible to everyone. Now, you can design the exact piece you envision, from concept to creation.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl" />
                <div className="relative bg-secondary/50 rounded-2xl p-12 text-center space-y-4">
                  <p className="text-6xl font-bold text-primary">10K+</p>
                  <p className="text-lg font-semibold">Unique Designs Created</p>
                  <p className="text-muted-foreground">Join our community of creators</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="pt-6 space-y-3">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Powered by Innovation
                </h2>
                <p className="text-muted-foreground">
                  Our platform leverages the latest in AI and 3D technology
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-primary">AI</div>
                  <h3 className="font-semibold">Design Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    Create unique artwork from simple text prompts using advanced AI models
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-primary">3D</div>
                  <h3 className="font-semibold">Visualization</h3>
                  <p className="text-sm text-muted-foreground">
                    Preview your design on realistic 3D models from every angle
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-primary">∞</div>
                  <h3 className="font-semibold">Possibilities</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlimited customization options to make your vision reality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Join the Movement</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Be part of a community that's redefining fashion, one custom design at a time
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
