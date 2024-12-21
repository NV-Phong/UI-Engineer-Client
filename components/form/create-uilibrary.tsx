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
import usePostUILibrary from "@/hooks/workspace/uilibrary/post-uilibrary";
import { usePathname, useRouter } from "next/navigation";

export function CreateUILibraryPopover() {
   const {
      postUILibrary,
      loading,
      error,
      uiLibraryName,
      uiLibraryDescription,
      style,
      IDtechStacks,
      setUiLibraryName,
      setUiLibraryDescription,
      setStyle,
      setIDtechStacks,
   } = usePostUILibrary();
   const router = useRouter();
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         await postUILibrary();
      } catch (err) {}

   };

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant="outline">Create UI Library</Button>
         </PopoverTrigger>
         <PopoverContent className="w-80 mr-4">
            <form onSubmit={handleSubmit} className="grid gap-4">
               <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                     Create New UI Library
                  </h4>
                  <p className="text-sm text-muted-foreground">
                     Create to manage components
                  </p>
               </div>
               <div className="grid gap-3">
                  <div className="items-center gap-4">
                     <Label htmlFor="name">Name</Label>
                     <Input
                        id="name"
                        value={uiLibraryName}
                        onChange={(e) => setUiLibraryName(e.target.value)}
                        placeholder="Type name"
                     />
                  </div>
                  <div className="items-center gap-4">
                     <Label htmlFor="description">Description</Label>
                     <Textarea
                        id="description"
                        value={uiLibraryDescription}
                        onChange={(e) =>
                           setUiLibraryDescription(e.target.value)
                        }
                        placeholder="Type your UI library description"
                     />
                  </div>
                  <div className="flex flex-col gap-4">
                     <Label htmlFor="techStack">Tech Stack</Label>
                     <TechStack
                        value={IDtechStacks}
                        onChange={setIDtechStacks}
                     />
                  </div>
                  <div className="flex flex-col gap-4">
                     <Label htmlFor="style">Style</Label>
                     <SelectStyle value={style} onChange={setStyle} />
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
