"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ImgCreatorTab2() {
  const [prompt, setPrompt] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-image", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const blob = await res.blob();
    setImg(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Ingredient recognition</h2>

        <Input
          placeholder="Describe your image..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </Button>

        {img && <img src={img} className="rounded-lg border" />}
      </CardContent>
    </Card>
  );
}
