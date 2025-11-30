import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DesignCanvas } from "@/components/design-studio/DesignCanvas";

const CustomizeStudio = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Design Studio</h1>
            <p className="text-muted-foreground">
              Create amazing custom designs with our professional tools and AI assistance
            </p>
          </div>
          
          <DesignCanvas />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomizeStudio;
