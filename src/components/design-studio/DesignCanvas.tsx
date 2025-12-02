import { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Rect, IText, FabricImage } from 'fabric';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Type,
  Square,
  Circle as CircleIcon,
  Image as ImageIcon,
  Download,
  Save,
  Undo,
  Redo,
  Trash2,
  Sparkles,
  Upload,
  ShoppingCart,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { AddToCartDialog } from './AddToCartDialog';

export const DesignCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState('#000000');
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'rectangle' | 'circle' | 'draw'>('select');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [designName, setDesignName] = useState('My Design');
  const [history, setHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(0);
  const [savedDesignId, setSavedDesignId] = useState<string | null>(null);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === 'draw';
    
    if (activeTool === 'draw' && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 2;
    }

    // Save history on object modifications
    const saveHistory = () => {
      const json = JSON.stringify(fabricCanvas.toJSON());
      setHistory(prev => {
        const newHistory = prev.slice(0, historyStep + 1);
        newHistory.push(json);
        return newHistory;
      });
      setHistoryStep(prev => prev + 1);
    };

    fabricCanvas.on('object:added', saveHistory);
    fabricCanvas.on('object:modified', saveHistory);
    fabricCanvas.on('object:removed', saveHistory);

    return () => {
      fabricCanvas.off('object:added', saveHistory);
      fabricCanvas.off('object:modified', saveHistory);
      fabricCanvas.off('object:removed', saveHistory);
    };
  }, [activeTool, activeColor, fabricCanvas, historyStep]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (tool === 'text') {
      const text = new IText('Click to edit', {
        left: 100,
        top: 100,
        fill: activeColor,
        fontSize: 40,
        fontFamily: 'Arial',
      });
      fabricCanvas?.add(text);
      fabricCanvas?.setActiveObject(text);
      fabricCanvas?.renderAll();
    } else if (tool === 'rectangle') {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 200,
        height: 100,
      });
      fabricCanvas?.add(rect);
      fabricCanvas?.setActiveObject(rect);
      fabricCanvas?.renderAll();
    } else if (tool === 'circle') {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 50,
      });
      fabricCanvas?.add(circle);
      fabricCanvas?.setActiveObject(circle);
      fabricCanvas?.renderAll();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgObj = new Image();
      imgObj.onload = () => {
        const fabricImg = new FabricImage(imgObj, {
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        fabricCanvas.add(fabricImg);
        fabricCanvas.setActiveObject(fabricImg);
        fabricCanvas.renderAll();
      };
      imgObj.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim() || !fabricCanvas) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a prompt',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: aiPrompt },
      });

      if (error) throw error;

      if (data.imageUrl) {
        const imgObj = new Image();
        imgObj.crossOrigin = 'anonymous';
        imgObj.onload = () => {
          const fabricImg = new FabricImage(imgObj, {
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
          });
          fabricCanvas.add(fabricImg);
          fabricCanvas.setActiveObject(fabricImg);
          fabricCanvas.renderAll();
          toast({
            title: 'Success',
            description: 'AI image added to canvas',
          });
        };
        imgObj.src = data.imageUrl;
      }
    } catch (error) {
      console.error('AI generation error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate image',
      });
    } finally {
      setIsGenerating(false);
      setAiPrompt('');
    }
  };

  const handleSaveDesign = async () => {
    if (!fabricCanvas || !user) return;

    setIsSaving(true);
    try {
      const designData = fabricCanvas.toJSON();
      const thumbnail = fabricCanvas.toDataURL({ 
        format: 'png', 
        quality: 0.8,
        multiplier: 1
      });

      const { data, error } = await supabase.from('designs').insert({
        user_id: user.id,
        name: designName,
        design_data: designData,
        thumbnail_url: thumbnail,
        is_public: false,
      }).select().single();

      if (error) throw error;

      setSavedDesignId(data.id);

      toast({
        title: 'Success',
        description: 'Design saved successfully',
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save design',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Login Required',
        description: 'Please login to add items to cart',
      });
      return;
    }

    if (!savedDesignId) {
      toast({
        variant: 'destructive',
        title: 'Save Design First',
        description: 'Please save your design before adding to cart',
      });
      return;
    }

    setShowAddToCart(true);
  };

  const handleExport = () => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
    });

    const link = document.createElement('a');
    link.download = `${designName}.png`;
    link.href = dataURL;
    link.click();

    toast({
      title: 'Success',
      description: 'Design exported successfully',
    });
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    const objects = fabricCanvas.getObjects();
    objects.forEach(obj => fabricCanvas.remove(obj));
    fabricCanvas.renderAll();
    toast({
      title: 'Canvas cleared',
      description: 'All objects removed',
    });
  };

  const handleDelete = () => {
    if (!fabricCanvas) return;
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      fabricCanvas.remove(activeObject);
      fabricCanvas.renderAll();
    }
  };

  const handleUndo = () => {
    if (!fabricCanvas || historyStep === 0) return;
    
    const newStep = historyStep - 1;
    setHistoryStep(newStep);
    
    if (history[newStep]) {
      fabricCanvas.loadFromJSON(history[newStep], () => {
        fabricCanvas.renderAll();
      });
    }
  };

  const handleRedo = () => {
    if (!fabricCanvas || historyStep >= history.length - 1) return;
    
    const newStep = historyStep + 1;
    setHistoryStep(newStep);
    
    if (history[newStep]) {
      fabricCanvas.loadFromJSON(history[newStep], () => {
        fabricCanvas.renderAll();
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Toolbar */}
      <Card className="p-4 space-y-4 lg:w-64">
        <div>
          <h3 className="font-semibold mb-3">Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={activeTool === 'select' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTool('select')}
            >
              Select
            </Button>
            <Button
              variant={activeTool === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('text')}
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === 'rectangle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('rectangle')}
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === 'circle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('circle')}
            >
              <CircleIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === 'draw' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTool('draw')}
            >
              Draw
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            type="color"
            value={activeColor}
            onChange={(e) => setActiveColor(e.target.value)}
            className="h-10 w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ai-prompt">AI Generate</Label>
          <Input
            id="ai-prompt"
            placeholder="Enter prompt..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateAI()}
          />
          <Button
            onClick={handleGenerateAI}
            disabled={isGenerating}
            size="sm"
            variant="hero"
            className="w-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={handleUndo} 
              variant="outline" 
              size="sm"
              disabled={historyStep === 0}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleRedo} 
              variant="outline" 
              size="sm"
              disabled={historyStep >= history.length - 1}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleDelete} variant="outline" size="sm" className="w-full">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm" className="w-full">
            Clear All
          </Button>
        </div>
      </Card>

      {/* Canvas */}
      <div className="flex-1 flex flex-col gap-4">
        <Card className="p-4">
          <div className="flex gap-2 items-center justify-between mb-4">
            <Input
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="max-w-xs"
              placeholder="Design name"
            />
            <div className="flex gap-2">
              <Button onClick={handleSaveDesign} disabled={isSaving} size="sm" variant="hero">
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button onClick={handleExport} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={handleAddToCart} size="sm" variant="accent">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden bg-white shadow-inner">
            <canvas ref={canvasRef} />
          </div>
        </Card>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <AddToCartDialog 
        open={showAddToCart}
        onOpenChange={setShowAddToCart}
        designId={savedDesignId}
      />
    </div>
  );
};
