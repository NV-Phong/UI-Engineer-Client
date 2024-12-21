"use client";

import { CreateIdeaFigmaPopover } from "@/components/form/create-figma-idea";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import useGetIdea from "@/hooks/workspace/idea/get-idea";
import React from "react";

export default function Figma() {
   const { data, loading, error } = useGetIdea();

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
            <CreateIdeaFigmaPopover />
         </div>
         {data && data.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
               {data
                  .filter((idea) => idea.ideaType === "figma")
                  .map((idea) => (
                     <Card
                        key={idea._id}
                        className="shadow-lg hover:shadow-2xl transition-all min-w-[850px] mb-5 bg-background"
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
                              <div
                                 className="text-blue-500 underline"
                                 dangerouslySetInnerHTML={{
                                    __html: `${idea.ideaURL}`,
                                 }}
                              />
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
