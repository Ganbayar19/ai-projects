"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Image as ImageIcon, RefreshCw } from "lucide-react";

export default function ImgCreatorTab2() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const loading = isGenerating;
  const [text, setText] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
        const response = await fetch("/api/generate-image",{
            method: "POST",
            body: JSON.stringify({ prompt }),
    });

    const blob = await response.blob();
    setGeneratedImage(URL.createObjectURL(blob));
    } catch (error) {
        console.error("Error generating image:", error);
    } finally {
        setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setGeneratedImage(null);
  };

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="w-5 h-5" />
          Food image creator
        </div>

        <p className="text-sm text-gray-500">
          What food image do you want? Describe it briefly.
        </p>

        <Textarea
          placeholder="Хоолны тайлбар"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px]"
        />

        <Button onClick={handleGenerate} disabled={loading} className="mt-2">
          {loading ? "Generating..." : "Generate"}
        </Button>
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold flex items-center gap-2">📄 Result</h3>
          <p className="text-sm text-gray-500 mt-2">
            First, enter your text to generate an image.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
