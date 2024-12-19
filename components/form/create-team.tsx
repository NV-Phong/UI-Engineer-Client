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
import { useState } from "react";
import useCreateTeam from "@/hooks/workspace/team/post-team";

export function CreateTeamDialog({
   isOpen,
   onClose,
}: {
   isOpen: boolean;
   onClose: () => void;
}) {
   const [teamName, setTeamName] = useState<string>("");
   const [teamDescription, setTeamDescription] = useState<string>("");
   const { createTeam, loading, error } = useCreateTeam();

   const handleCreateTeam = async () => {
      if (!teamName || !teamDescription) {
         return;
      }

      await createTeam({
         teamName,
         teamDescription,
      });

      // Reload trang sau khi tạo team thành công hoặc đóng dialog
      window.location.reload();
   };

   const handleCloseDialog = () => {
      onClose();
      // Reload trang khi đóng dialog
      window.location.reload();
   };

   return (
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
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
                     id="name"
                     placeholder="Enter your team name"
                     className="col-span-3"
                     value={teamName}
                     onChange={(e) => setTeamName(e.target.value)}
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                     Description
                  </Label>
                  <Textarea
                     id="description"
                     placeholder="Type your team description"
                     className="col-span-3"
                     value={teamDescription}
                     onChange={(e) => setTeamDescription(e.target.value)}
                  />
               </div>
            </div>
            <DialogFooter>
               <Button
                  type="button"
                  onClick={handleCreateTeam}
                  disabled={loading}
               >
                  {loading ? "Creating..." : "Create"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
