"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImgAnalysisTab from "./_components/tabs/ImgAnalysisTab";
import ImgCreatorTab2 from "./_components/tabs/ImgCreatorTab2";
import ChatWidget from "./_components/ChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Tabs defaultValue="analysis" className="max-w-3xl mx-auto p-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="analysis">Image Analysis</TabsTrigger>
          <TabsTrigger value="ingredient">Ingredient</TabsTrigger>
          <TabsTrigger value="creator">Image Creator</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis">
          <ImgAnalysisTab />
        </TabsContent>

        <TabsContent value="ingredient">
          <ImgAnalysisTab />
        </TabsContent>

        <TabsContent value="creator">
          <ImgCreatorTab2 />
        </TabsContent>
      </Tabs>

      <ChatWidget />
    </div>
  );
}
