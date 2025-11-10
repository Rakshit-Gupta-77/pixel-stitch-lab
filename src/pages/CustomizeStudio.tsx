import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, RotateCw, Save, ShoppingCart, Download } from "lucide-react";

const CustomizeStudio = () => {
  const [rotation, setRotation] = useState([0]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          {/* Control Panel */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Design Studio</h1>
              <p className="text-muted-foreground">Customize your perfect outfit</p>
            </div>

            <Tabs defaultValue="basics" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
              </TabsList>

              <TabsContent value="basics" className="space-y-4">
                <div className="space-y-2">
                  <Label>Garment Type</Label>
                  <Select defaultValue="hoodie">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tshirt">T-Shirt</SelectItem>
                      <SelectItem value="hoodie">Hoodie</SelectItem>
                      <SelectItem value="jacket">Jacket</SelectItem>
                      <SelectItem value="sweatshirt">Sweatshirt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Size</Label>
                  <Select defaultValue="m">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Base Color</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {['bg-white', 'bg-gray-800', 'bg-primary', 'bg-accent', 'bg-red-500', 'bg-green-500'].map((color) => (
                      <button
                        key={color}
                        className={`${color} h-10 rounded-md border-2 border-border hover:border-primary transition-colors`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Fabric</Label>
                  <Select defaultValue="cotton">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cotton">100% Cotton</SelectItem>
                      <SelectItem value="blend">Cotton Blend</SelectItem>
                      <SelectItem value="polyester">Polyester</SelectItem>
                      <SelectItem value="premium">Premium Organic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="design" className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <Button variant="outline" className="w-full">
                  Choose from Gallery
                </Button>
                <Button variant="accent" className="w-full">
                  Generate with AI
                </Button>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label>Text Content</Label>
                  <Input placeholder="Enter your text..." />
                </div>
                <div className="space-y-2">
                  <Label>Font Style</Label>
                  <Select defaultValue="sans">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sans">Sans Serif</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="mono">Monospace</SelectItem>
                      <SelectItem value="script">Script</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label>Rotate View ({rotation[0]}°)</Label>
              <Slider
                value={rotation}
                onValueChange={setRotation}
                max={360}
                step={1}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>

            <Button variant="hero" className="w-full" size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart - $49.99
            </Button>
          </div>

          {/* 3D Preview Area */}
          <div className="bg-secondary/20 rounded-lg border-2 border-border flex items-center justify-center min-h-[600px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative z-10 text-center space-y-4">
              <RotateCw className="h-16 w-16 mx-auto text-muted-foreground animate-spin-slow" />
              <div>
                <h3 className="text-2xl font-semibold mb-2">3D Preview</h3>
                <p className="text-muted-foreground">Interactive 3D model will appear here</p>
                <p className="text-sm text-muted-foreground mt-2">Drag to rotate • Scroll to zoom</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomizeStudio;
