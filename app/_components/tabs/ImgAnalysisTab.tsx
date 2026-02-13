"use client";

import { useState, useRef } from "react";
import { pipeline } from "@xenova/transformers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { FileText } from "lucide-react";

export default function ImgAnalysisTab() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const captionerRef = useRef<any>(null);

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

    const out = await captionerRef.current(preview);
    setResult(out[0].generated_text);
    setLoading(false);
  };

return (
  <Card className="border border-gray-200 bg-white shadow-sm">
    <CardContent className="p-6 space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Sparkles className="w-5 h-5" />
        Image analysis
      </div>

      <p className="text-sm text-gray-500">
        Upload a food photo, and AI will detect the ingredients.
      </p>
      <div className="flex items-center gap-3">
        <Input type="file" accept="image/*" onChange={handleFile} />
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Generate"}
        </Button>
      </div>
      {preview && <img src={preview} className="rounded-lg border max-h-60" />}
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Here is the summary
        </h3>

        {!result && (
          <p className="text-sm text-gray-500 mt-2">
            First, enter your image to recognize ingredients.
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
