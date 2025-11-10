import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, ShoppingCart, Search } from "lucide-react";

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const tags = ["All", "Anime", "Floral", "Typography", "Abstract", "Minimalist", "Vintage"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Community Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing designs from our creative community
            </p>
          </div>

          {/* Search & Filters */}
          <div className="space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div
                key={item}
                className="group bg-card rounded-lg border overflow-hidden hover:shadow-elegant transition-all"
              >
                <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary">View Design</Button>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Designer {item}</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Amazing custom design with unique style
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-accent transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{12 + item}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-accent transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{3 + item}</span>
                      </button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-8">
            <Button variant="outline" size="lg">Load More Designs</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
