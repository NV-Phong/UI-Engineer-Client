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

export function CreateUILibraryPopover() {
   return (
      <Popover>
         <PopoverTrigger asChild>
            {/* <Button variant="outline">Open popover</Button> */}
            <WhiteRainbowButton>Create UI Library</WhiteRainbowButton>
         </PopoverTrigger>
         <PopoverContent className="w-80 mr-4">
            <div className="grid gap-4">
               <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                     Create New UI Library
                  </h4>
                  <p className="text-sm text-muted-foreground">
                     Create to manage components
                  </p>
               </div>
               <div className="grid gap-3">
                  {/* <div className="grid grid-cols-3 items-center gap-4"> */}
                  <div className="items-center gap-4">
                     <Label htmlFor="width">Name</Label>
                     <Input placeholder="Type name" />
                  </div>
                  <div className="items-center gap-4">
                     <Label htmlFor="maxWidth">Description</Label>
                     <Textarea placeholder="Type your team description" />
                  </div>
                  <div className="flex flex-col gap-4">
                     <Label htmlFor="maxHeight">FrameWork</Label>
                     <TechStack />
                  </div>
                  <div className="flex flex-col gap-4">
                     <Label htmlFor="maxHeight">Style</Label>
                     <SelectStyle />
                  </div>
                  <Button>Create</Button>
               </div>
            </div>
         </PopoverContent>
      </Popover>
   );
}
