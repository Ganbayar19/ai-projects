"use client";

import { useState, useRef } from "react";
import { pipeline } from "@xenova/transformers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

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
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles />
          <h2 className="text-xl font-bold">Image Analysis</h2>
        </div>

        <Input type="file" accept="image/*" onChange={handleFile} />

        {preview && <img src={preview} className="rounded-lg max-h-60" />}

        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Analyze"}
        </Button>

        {result && <p className="bg-muted p-3 rounded-lg">{result}</p>}
      </CardContent>
    </Card>
  );
}
