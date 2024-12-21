"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import WhiteRainbowButton from "../custom/white-rainbow-button";
import { TechStack } from "../custom/tech-stack";
import { Textarea } from "../ui/textarea";
import { SelectStyle } from "../custom/select-style";
import { useRouter } from "next/navigation";
import useCreateIdea from "@/hooks/workspace/idea/post-idea";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FileUpload } from "../ui/file-upload";

export function CreateIdeaGraphicsPopover() {
   const router = useRouter();
   const pathname = usePathname(); // Get the full URL path
   const searchParams = useSearchParams();

   const [files, setFiles] = useState<File[]>([]);
   const handleFileUpload = (files: File[]) => {
      setFiles(files);
      console.log(files);
   };

   // Extract 'ideaType' from the pathname, assuming it's the last part of the URL
   const pathParts = pathname.split("/");
   const ideaType = pathParts[pathParts.length - 1]; // e.g., 'figma' from /dashboard/idea/figma

   const {
      createIdea,
      loading,
      error,
      ideaName,
      ideaDescription,
      ideaURL,
      ideaImage,
      setIdeaName,
      setIdeaDescription,
      setIdeaURL,
      setIdeaImage,
   } = useCreateIdea();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         await createIdea();
      } catch (err) {}
   };

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant="outline">Create Idea</Button>
         </PopoverTrigger>
         <PopoverContent side="left" align="center" className="bg-background w-80 ml-2 mt-32 overflow-y-auto max-h-[650px] scrollbar-hide">
            <form onSubmit={handleSubmit} className="grid gap-4">
               <div className="space-y-2">
                  <h4 className="font-medium leading-none">Create New Idea</h4>
                  <p className="text-sm text-muted-foreground">
                     Create to manage your ideas
                  </p>
               </div>
               <div className="grid gap-3">
                  <div className="items-center gap-4">
                     <Label htmlFor="name">Name</Label>
                     <Input
                        id="name"
                        value={ideaName}
                        onChange={(e) => setIdeaName(e.target.value)}
                        placeholder="Type name"
                     />
                  </div>
                  <div className="items-center gap-4">
                     <Label htmlFor="description">Description</Label>
                     <Textarea
                        id="description"
                        value={ideaDescription}
                        onChange={(e) => setIdeaDescription(e.target.value)}
                        placeholder="Type your idea description"
                     />
                  </div>
                  <div className="items-center gap-4 hidden">
                     <Label htmlFor="type">Type</Label>
                     <Input
                        id="type"
                        value={ideaType}
                        readOnly
                        placeholder="Type of idea"
                     />
                  </div>
                  <div className="items-center gap-4">
                     <Label htmlFor="url">Upload Graphics</Label>
                     <FileUpload onChange={handleFileUpload} />
                  </div>
                  <div className="items-center gap-4 hidden">
                     <Label htmlFor="image">Image</Label>
                     <Input
                        id="image"
                        value={ideaImage}
                        onChange={(e) => setIdeaImage(e.target.value)}
                        placeholder="Type idea image URL"
                     />
                  </div>
                  <Button type="submit" disabled={loading}>
                     {loading ? "Creating..." : "Create"}
                  </Button>
               </div>
               {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
         </PopoverContent>
      </Popover>
   );
}
