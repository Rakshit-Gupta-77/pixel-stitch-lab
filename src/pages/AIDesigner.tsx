import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Download, ArrowRight } from "lucide-react";

const AIDesigner = () => {
  const [prompt, setPrompt] = useState("");

  const inspirationPrompts = [
    "Anime dragon with neon effects",
    "Minimalist floral pattern",
    "Cyberpunk cityscape",
    "Abstract watercolor splash",
    "Vintage 80s retro wave",
    "Japanese cherry blossom",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Design Studio</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Create with AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe your vision, and watch AI bring it to life. Perfect for custom clothing designs.
            </p>
          </div>

          {/* Coming Soon Note */}
          <div className="mx-auto max-w-3xl bg-secondary/40 border rounded-xl p-4 text-sm text-muted-foreground">
            Full AI generation will connect to the backend soon. This page is a frontend preview of the experience.
          </div>

          {/* Prompt Input */}
          <div className="bg-card rounded-xl p-8 border shadow-card space-y-6 animate-slide-in">
            <div className="space-y-3">
              <label className="text-sm font-medium">Describe Your Design</label>
              <Textarea
                placeholder="A futuristic dragon with glowing neon scales, set against a dark cyberpunk cityscape..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] text-base"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="hero" size="lg" className="flex-1">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Design
              </Button>
              <Button variant="outline" size="lg">
                <Send className="h-5 w-5" />
              </Button>
            </div>

            {/* Inspiration Prompts */}
            <div className="space-y-3 pt-4 border-t">
              <p className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Need Inspiration?
              </p>
              <div className="flex flex-wrap gap-2">
                {inspirationPrompts.map((inspiration, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(inspiration)}
                    className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                  >
                    {inspiration}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Generated Designs</h2>
              <Button variant="outline">View All History</Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="group relative bg-card rounded-lg border overflow-hidden hover:shadow-elegant transition-all duration-300"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      AI-generated design preview
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="accent" size="sm" className="flex-1">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Use Design
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIDesigner;
