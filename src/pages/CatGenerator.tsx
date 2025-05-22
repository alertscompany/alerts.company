
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function CatGenerator() {
  const [label, setLabel] = useState("DO");
  const [catAttribute, setCatAttribute] = useState("holding a wrench");
  const [themeColor, setThemeColor] = useState("blue");
  const [backgroundColor, setBackgroundColor] = useState("dark navy");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Reference images paths
  const exampleImages = [
    "/lovable-uploads/f2cbe692-ad20-4bff-b421-a55eda1c8a04.png",
    "/lovable-uploads/fe44072b-b974-48a0-a39a-d2887a12f356.png",
    "/lovable-uploads/3f3a45ee-558a-42fe-8b21-1592b98d00b1.png",
    "/lovable-uploads/f454ac18-46ca-4174-857b-94f9a6b41d71.png",
    "/lovable-uploads/c0efc29f-744b-41fd-80ee-9a1cd8e8fbab.png",
    "/lovable-uploads/763991e4-ebd3-4026-a55d-f6241b3d9908.png"
  ];

  const generatePrompt = () => {
    const fullPrompt = `Create a glowing neon sign digital illustration in a bold, pop-art style reminiscent of Andy Warhol. The centerpiece is a peaceful yellow cat, designed with minimalist lines, a chubby shape, closed eyes, and a relaxed, slightly upright posture. The cat should have the following attribute: ${catAttribute}. It is outlined in soft, clean neon strokes and positioned inside a rounded rectangular frame. This frame emits a vibrant neon glow in ${themeColor}, contrasting against a textured or slightly gradient background in ${backgroundColor}. Below the cat, display the word "${label}" in bold, uppercase, simple sans-serif font that matches the theme color. The whole scene should glow subtly on the surface below, and the lighting should give a clean, high-contrast, slightly retro yet cyber-modern feel. Use a consistent, stylized, and unified composition across all elements. Reference the provided example images for style guidance.`;
    
    // Generate image directly without showing prompt
    generateImage(fullPrompt);
  };

  const generateImage = async (promptText: string) => {
    try {
      setIsGeneratingImage(true);
      setImageUrl(null);

      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt: promptText },
      });

      if (error) {
        throw new Error(error.message);
      }

      setImageUrl(data.imageUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate image");
      console.error("Image generation error:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1A1A1A]">
      <header className="border-b border-gray-200 bg-white px-8 py-6">
        <h1 className="text-2xl font-semibold">Cat Generator</h1>
      </header>

      <div className="p-4 max-w-4xl mx-auto space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. DONE"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="catAttribute">Cat Attribute</Label>
                <Input
                  id="catAttribute"
                  value={catAttribute}
                  onChange={(e) => setCatAttribute(e.target.value)}
                  placeholder="e.g. sitting calmly with raised paw"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="themeColor">Theme Color</Label>
                <Input
                  id="themeColor"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  placeholder="e.g. green"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <Input
                  id="backgroundColor"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  placeholder="e.g. dark green"
                  className="bg-white"
                />
              </div>
              <Button 
                onClick={generatePrompt} 
                disabled={isGeneratingImage}
                className="w-full"
              >
                {isGeneratingImage ? "Generating..." : "Generate Image"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Label>Style Examples</Label>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                {exampleImages.map((src, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={src} 
                      alt={`Style example ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {imageUrl ? (
          <Card>
            <CardContent className="pt-6">
              <Label>Your Generated Cat</Label>
              <div className="mt-4 flex justify-center">
                <img 
                  src={imageUrl} 
                  alt="Generated cat image" 
                  className="max-w-full rounded-lg shadow-lg" 
                />
              </div>
            </CardContent>
          </Card>
        ) : isGeneratingImage ? (
          <Card>
            <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Generating your cat image...</p>
              <p className="text-sm text-muted-foreground">This may take up to 30 seconds</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
