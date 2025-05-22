
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CatGenerator() {
  const [label, setLabel] = useState("DO");
  const [catAttribute, setCatAttribute] = useState("holding a wrench");
  const [themeColor, setThemeColor] = useState("blue");
  const [backgroundColor, setBackgroundColor] = useState("dark navy");
  const [prompt, setPrompt] = useState("");

  const generatePrompt = () => {
    const fullPrompt = `Create a glowing neon sign digital illustration in a bold, pop-art style reminiscent of Andy Warhol. The centerpiece is a peaceful yellow cat, designed with minimalist lines, a chubby shape, closed eyes, and a relaxed, slightly upright posture. The cat should have the following attribute: ${catAttribute}. It is outlined in soft, clean neon strokes and positioned inside a rounded rectangular frame. This frame emits a vibrant neon glow in ${themeColor}, contrasting against a textured or slightly gradient background in ${backgroundColor}. Below the cat, display the word "${label}" in bold, uppercase, simple sans-serif font that matches the theme color. The whole scene should glow subtly on the surface below, and the lighting should give a clean, high-contrast, slightly retro yet cyber-modern feel. Use a consistent, stylized, and unified composition across all elements. Use the uploaded sketch of a cat as visual reference for the cat's posture and vibe.`;
    setPrompt(fullPrompt);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1A1A1A]">
      <header className="border-b border-gray-200 bg-white px-8 py-6">
        <h1 className="text-2xl font-semibold">Cat Generator</h1>
      </header>

      <div className="p-4 max-w-3xl mx-auto space-y-6 mt-6">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. DONE"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catAttribute">Cat Attribute</Label>
              <Input
                id="catAttribute"
                value={catAttribute}
                onChange={(e) => setCatAttribute(e.target.value)}
                placeholder="e.g. sitting calmly with raised paw"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="themeColor">Theme Color</Label>
              <Input
                id="themeColor"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                placeholder="e.g. green"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                placeholder="e.g. dark green"
              />
            </div>
            <Button onClick={generatePrompt}>Generate Prompt</Button>
          </CardContent>
        </Card>

        {prompt && (
          <Card>
            <CardContent className="pt-6">
              <Label>Generated Prompt</Label>
              <Textarea className="mt-2" value={prompt} rows={10} readOnly />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
