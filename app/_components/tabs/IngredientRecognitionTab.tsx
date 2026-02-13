"use client";

import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { pipeline } from "@xenova/transformers";
import { FileText } from "lucide-react";

export default function IngredientRecognitionTab() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const captionerRef = useRef<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    };

  const handleGenerate = async () => {
    if (!preview) return;
    setLoading(true);

    if (!captionerRef.current) {
      captionerRef.current = await pipeline(
        "image-to-text",
        "Xenova/vit-gpt2-image-captioning",
      );
    }
  }

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="w-5 h-5" />
          Ingredient recognition
        </div>

        <p className="text-sm text-gray-500">
          Describe the food, and AI will detect the ingredients.
        </p>

        <Textarea
          placeholder="Орц тодорхойлох"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px]"
        />

        <Button onClick={handleGenerate} disabled={loading} className="mt-2">
          {loading ? "Generating..." : "Generate"}
        </Button>
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Identified Ingredients
          </h3>

          {!result && (
            <p className="text-sm text-gray-500 mt-2">
              First, enter your text to recognize an ingredients.
            </p>
          )}

          {result && (
            <div className="mt-2 bg-gray-50 border rounded-lg p-3 text-sm">
              {result}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
