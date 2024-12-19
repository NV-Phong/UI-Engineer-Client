import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

export function CreateTeamDialog({
   isOpen,
   onClose,
}: {
   isOpen: boolean;
   onClose: () => void;
}) {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Create New Team</DialogTitle>
               <DialogDescription>
                  Create new teams to collaborate easily.
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Team Name
                  </Label>
                  <Input
                     placeholder="Enter your team name"
                     className="col-span-3"
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                     Description
                  </Label>

                  <Textarea
                     placeholder="Type your team description"
                     className="col-span-3"
                  />
               </div>
            </div>
            <DialogFooter>
               <Button type="submit">Create</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
