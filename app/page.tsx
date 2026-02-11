"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImgCreatorTab from "./_components/tabs/ImgCreatorTab";
import ImageAnalysisTab from "./_components/tabs/ImgAnalysisTab";
import ImgCreatorTab2 from "./_components/tabs/ImgCreatorTab2";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b px-10 py-4">
        <h1 className="font-semibold text-sm">AI tools</h1>
      </header>

      {/* MAIN CENTER */}
      <main className="flex justify-center mt-10">
        <div className="w-full max-w-3xl text-center">
          {/* Tabs */}
          <Tabs defaultValue="analysis">
            <TabsList className="mx-auto bg-muted rounded-full px-2 py-1 inline-flex">
              <TabsTrigger value="analysis" className="rounded-full px-4">
                Image analysis
              </TabsTrigger>
              <TabsTrigger value="ingredient" className="rounded-full px-4">
                Ingredient recognition
              </TabsTrigger>
              <TabsTrigger value="creator" className="rounded-full px-4">
                Image creator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analysis">
              <ImageAnalysisTab />
            </TabsContent>

            <TabsContent value="creator">
              <ImgCreatorTab2 />
            </TabsContent>

            <TabsContent value="ingredient">
              <ImageAnalysisTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
