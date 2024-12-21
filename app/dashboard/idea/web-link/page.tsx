"use client";
import { CreateWebLinkPopover } from "@/components/form/create-weblink-idea";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import useGetIdea from "@/hooks/workspace/idea/get-idea";
import React, { useState } from "react";

export default function WebLink() {
   const { data, loading, error } = useGetIdea();
   const [maximizedImage, setMaximizedImage] = useState<string | null>(null);

   const toggleCollapse = (imageUrl: string) => {
      setMaximizedImage((prev) => (prev === imageUrl ? null : imageUrl));
   };

   if (loading) {
      return (
         <div className="flex justify-center items-center h-screen text-xl">
            Loading...
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex justify-center items-center h-screen text-red-500 text-xl">
            Error: {error}
         </div>
      );
   }

   return (
      <div className="container mx-auto p-4">
         <div className="mb-6 flex justify-between items-center">
            <CreateWebLinkPopover />
         </div>
         {data && data.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
               {data
                  .filter((idea) => idea.ideaType === "web-link")
                  .map((idea) => (
                     <Card
                        key={idea._id}
                        className="shadow-lg hover:shadow-2xl transition-all mb-96 bg-background"
                     >
                        <CardHeader>
                           <CardTitle className="text-xl font-bold">
                              {idea.ideaName}
                           </CardTitle>
                           <CardDescription className="text-sm text-gray-600">
                              {idea.ideaDescription}
                           </CardDescription>
                        </CardHeader>
                        {idea.ideaURL && (
                           <CardContent>
                              <div className="relative">
                                 <img
                                    src={idea.ideaURL}
                                    alt={idea.ideaName}
                                    className={`transition-all duration-300 rounded ${
                                       maximizedImage === idea.ideaURL
                                          ? "w-[400px] h-auto"
                                          : "w-52 h-auto"
                                    }`}
                                 />
                                 <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => toggleCollapse(idea.ideaURL)}
                                    className="absolute top-2 right-2"
                                 >
                                    <Maximize2 className="h-3 w-3" />
                                 </Button>
                              </div>
                           </CardContent>
                        )}
                     </Card>
                  ))}
            </div>
         ) : (
            <div className="text-center text-lg text-gray-500">
               No Figma ideas created
            </div>
         )}
      </div>
   );
}
