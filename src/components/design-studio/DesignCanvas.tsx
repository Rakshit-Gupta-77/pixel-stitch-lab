import { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Rect, IText, FabricImage, Triangle, Line, Polygon } from 'fabric';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Triangle as TriangleIcon,
  Star,
  Minus,
  Bold,
  Italic,
  Underline,
  ArrowUp,
  ArrowDown,
  Layers,
  Hexagon,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { AddToCartDialog } from './AddToCartDialog';

const FONTS = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Comic Sans MS', label: 'Comic Sans' },
  { value: 'Trebuchet MS', label: 'Trebuchet' },
  { value: 'Palatino Linotype', label: 'Palatino' },
  { value: 'Lucida Console', label: 'Lucida Console' },
];

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 96];

export const DesignCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState('#000000');
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'rectangle' | 'circle' | 'draw' | 'triangle' | 'star' | 'line' | 'hexagon'>('select');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [designName, setDesignName] = useState('My Design');
  const [history, setHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(0);
  const [savedDesignId, setSavedDesignId] = useState<string | null>(null);
  const [showAddToCart, setShowAddToCart] = useState(false);
  
  // Text formatting state
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [selectedFontSize, setSelectedFontSize] = useState(40);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  
  // Object properties
  const [opacity, setOpacity] = useState(100);
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [strokeColor, setStrokeColor] = useState('#000000');
  
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
      fabricCanvas.freeDrawingBrush.width = strokeWidth || 2;
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

    // Update UI when selection changes
    const handleSelection = () => {
      const activeObj = fabricCanvas.getActiveObject();
      if (activeObj) {
        setOpacity(Math.round((activeObj.opacity || 1) * 100));
        setStrokeWidth(activeObj.strokeWidth || 0);
        setStrokeColor(activeObj.stroke as string || '#000000');
        
        if (activeObj instanceof IText) {
          setSelectedFont(activeObj.fontFamily || 'Arial');
          setSelectedFontSize(activeObj.fontSize || 40);
          setIsBold(activeObj.fontWeight === 'bold');
          setIsItalic(activeObj.fontStyle === 'italic');
          setIsUnderline(activeObj.underline || false);
        }
      }
    };

    fabricCanvas.on('object:added', saveHistory);
    fabricCanvas.on('object:modified', saveHistory);
    fabricCanvas.on('object:removed', saveHistory);
    fabricCanvas.on('selection:created', handleSelection);
    fabricCanvas.on('selection:updated', handleSelection);

    return () => {
      fabricCanvas.off('object:added', saveHistory);
      fabricCanvas.off('object:modified', saveHistory);
      fabricCanvas.off('object:removed', saveHistory);
      fabricCanvas.off('selection:created', handleSelection);
      fabricCanvas.off('selection:updated', handleSelection);
    };
  }, [activeTool, activeColor, fabricCanvas, historyStep, strokeWidth]);

  const createStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    const points = [];
    const step = Math.PI / spikes;
    
    for (let i = 0; i < 2 * spikes; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step - Math.PI / 2;
      points.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      });
    }
    return points;
  };

  const createHexagon = (cx: number, cy: number, size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60 - 30) * Math.PI / 180;
      points.push({
        x: cx + Math.cos(angle) * size,
        y: cy + Math.sin(angle) * size,
      });
    }
    return points;
  };

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    if (tool === 'text') {
      const text = new IText('Click to edit', {
        left: 100,
        top: 100,
        fill: activeColor,
        fontSize: selectedFontSize,
        fontFamily: selectedFont,
        fontWeight: isBold ? 'bold' : 'normal',
        fontStyle: isItalic ? 'italic' : 'normal',
        underline: isUnderline,
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      fabricCanvas.renderAll();
    } else if (tool === 'rectangle') {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 200,
        height: 100,
        stroke: strokeWidth > 0 ? strokeColor : undefined,
        strokeWidth: strokeWidth,
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
      fabricCanvas.renderAll();
    } else if (tool === 'circle') {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 50,
        stroke: strokeWidth > 0 ? strokeColor : undefined,
        strokeWidth: strokeWidth,
      });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
      fabricCanvas.renderAll();
    } else if (tool === 'triangle') {
      const triangle = new Triangle({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 100,
        height: 100,
        stroke: strokeWidth > 0 ? strokeColor : undefined,
        strokeWidth: strokeWidth,
      });
      fabricCanvas.add(triangle);
      fabricCanvas.setActiveObject(triangle);
      fabricCanvas.renderAll();
    } else if (tool === 'star') {
      const starPoints = createStar(0, 0, 5, 50, 25);
      const star = new Polygon(starPoints, {
        left: 100,
        top: 100,
        fill: activeColor,
        stroke: strokeWidth > 0 ? strokeColor : undefined,
        strokeWidth: strokeWidth,
      });
      fabricCanvas.add(star);
      fabricCanvas.setActiveObject(star);
      fabricCanvas.renderAll();
    } else if (tool === 'hexagon') {
      const hexPoints = createHexagon(0, 0, 50);
      const hexagon = new Polygon(hexPoints, {
        left: 100,
        top: 100,
        fill: activeColor,
        stroke: strokeWidth > 0 ? strokeColor : undefined,
        strokeWidth: strokeWidth,
      });
      fabricCanvas.add(hexagon);
      fabricCanvas.setActiveObject(hexagon);
      fabricCanvas.renderAll();
    } else if (tool === 'line') {
      const line = new Line([0, 0, 200, 0], {
        left: 100,
        top: 100,
        stroke: activeColor,
        strokeWidth: strokeWidth || 2,
      });
      fabricCanvas.add(line);
      fabricCanvas.setActiveObject(line);
      fabricCanvas.renderAll();
    }
  };

  const updateTextStyle = (property: string, value: any) => {
    if (!fabricCanvas) return;
    const activeObj = fabricCanvas.getActiveObject();
    if (activeObj instanceof IText) {
      activeObj.set(property as keyof IText, value);
      fabricCanvas.renderAll();
    }
  };

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    updateTextStyle('fontFamily', font);
  };

  const handleFontSizeChange = (size: string) => {
    const sizeNum = parseInt(size);
    setSelectedFontSize(sizeNum);
    updateTextStyle('fontSize', sizeNum);
  };

  const toggleBold = () => {
    const newValue = !isBold;
    setIsBold(newValue);
    updateTextStyle('fontWeight', newValue ? 'bold' : 'normal');
  };

  const toggleItalic = () => {
    const newValue = !isItalic;
    setIsItalic(newValue);
    updateTextStyle('fontStyle', newValue ? 'italic' : 'normal');
  };

  const toggleUnderline = () => {
    const newValue = !isUnderline;
    setIsUnderline(newValue);
    updateTextStyle('underline', newValue);
  };

  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0];
    setOpacity(newOpacity);
    if (!fabricCanvas) return;
    const activeObj = fabricCanvas.getActiveObject();
    if (activeObj) {
      activeObj.set('opacity', newOpacity / 100);
      fabricCanvas.renderAll();
    }
  };

  const handleStrokeWidthChange = (value: number[]) => {
    const newWidth = value[0];
    setStrokeWidth(newWidth);
    if (!fabricCanvas) return;
    const activeObj = fabricCanvas.getActiveObject();
    if (activeObj) {
      activeObj.set('strokeWidth', newWidth);
      if (newWidth > 0 && !activeObj.stroke) {
        activeObj.set('stroke', strokeColor);
      }
      fabricCanvas.renderAll();
    }
  };

  const handleStrokeColorChange = (color: string) => {
    setStrokeColor(color);
    if (!fabricCanvas) return;
    const activeObj = fabricCanvas.getActiveObject();
    if (activeObj) {
      activeObj.set('stroke', color);
      fabricCanvas.renderAll();
    }
  };

  const bringToFront = () => {
    if (!fabricCanvas) return;
    const activeObj = fabricCanvas.getActiveObject();
    if (activeObj) {
      fabricCanvas.bringObjectToFront(activeObj);
      fabricCanvas.renderAll();
    }
  };

  const sendToBack = () => {
    if (!fabricCanvas) return;
    const activeObj = fabricCanvas.getActiveObject();
    if (activeObj) {
      fabricCanvas.sendObjectToBack(activeObj);
      fabricCanvas.renderAll();
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
      <Card className="p-4 space-y-4 lg:w-72">
        <div>
          <h3 className="font-semibold mb-3">Shapes & Tools</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={activeTool === 'select' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTool('select')}
              title="Select"
            >
              Select
            </Button>
            <Button
              variant={activeTool === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('text')}
              title="Text"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === 'draw' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTool('draw')}
              title="Draw"
            >
              Draw
            </Button>
            <Button
              variant={activeTool === 'rectangle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('rectangle')}
              title="Rectangle"
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === 'circle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('circle')}
              title="Circle"
            >
              <CircleIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === 'triangle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('triangle')}
              title="Triangle"
            >
              <TriangleIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === 'star' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('star')}
              title="Star"
            >
              <Star className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === 'hexagon' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('hexagon')}
              title="Hexagon"
            >
              <Hexagon className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTool === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolClick('line')}
              title="Line"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} title="Upload Image">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Text Formatting */}
        <div className="space-y-2">
          <h3 className="font-semibold">Text Style</h3>
          <Select value={selectedFont} onValueChange={handleFontChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {FONTS.map(font => (
                <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedFontSize.toString()} onValueChange={handleFontSizeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {FONT_SIZES.map(size => (
                <SelectItem key={size} value={size.toString()}>
                  {size}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-1">
            <Button
              variant={isBold ? 'default' : 'outline'}
              size="sm"
              onClick={toggleBold}
              className="flex-1"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={isItalic ? 'default' : 'outline'}
              size="sm"
              onClick={toggleItalic}
              className="flex-1"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={isUnderline ? 'default' : 'outline'}
              size="sm"
              onClick={toggleUnderline}
              className="flex-1"
            >
              <Underline className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-2">
          <h3 className="font-semibold">Colors</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="fill-color" className="text-xs">Fill</Label>
              <Input
                id="fill-color"
                type="color"
                value={activeColor}
                onChange={(e) => setActiveColor(e.target.value)}
                className="h-8 w-full"
              />
            </div>
            <div>
              <Label htmlFor="stroke-color" className="text-xs">Stroke</Label>
              <Input
                id="stroke-color"
                type="color"
                value={strokeColor}
                onChange={(e) => handleStrokeColorChange(e.target.value)}
                className="h-8 w-full"
              />
            </div>
          </div>
        </div>

        {/* Object Properties */}
        <div className="space-y-3">
          <h3 className="font-semibold">Properties</h3>
          <div>
            <Label className="text-xs">Opacity: {opacity}%</Label>
            <Slider
              value={[opacity]}
              onValueChange={handleOpacityChange}
              max={100}
              step={1}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Stroke Width: {strokeWidth}px</Label>
            <Slider
              value={[strokeWidth]}
              onValueChange={handleStrokeWidthChange}
              max={20}
              step={1}
              className="mt-1"
            />
          </div>
        </div>

        {/* Layer Controls */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Layers className="h-4 w-4" /> Layers
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={bringToFront}>
              <ArrowUp className="h-4 w-4 mr-1" /> Front
            </Button>
            <Button variant="outline" size="sm" onClick={sendToBack}>
              <ArrowDown className="h-4 w-4 mr-1" /> Back
            </Button>
          </div>
        </div>

        {/* AI Generate */}
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

        {/* History & Actions */}
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
          <div className="flex gap-2 items-center justify-between mb-4 flex-wrap">
            <Input
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="max-w-xs"
              placeholder="Design name"
            />
            <div className="flex gap-2 flex-wrap">
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
