"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/auth-service";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

const usePostUILibrary = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();
   const router = useRouter();
   const pathname = usePathname();

   const [uiLibraryName, setUiLibraryName] = useState<string>("");
   const [uiLibraryDescription, setUiLibraryDescription] = useState<string>("");
   const [style, setStyle] = useState<string>("");
   const [IDtechStacks, setIDtechStacks] = useState<string[]>([]);

   const resetState = () => {
      setUiLibraryName("");
      setUiLibraryDescription("");
      setStyle("");
      setIDtechStacks([]);
   };

   const postUILibrary = async () => {
      setLoading(true);
      setError(null);

      try {
         const IDTeam = Cookies.get("IDTeam");

         if (!IDTeam) {
            throw new Error("Team ID is missing. Please log in again.");
         }

         const payload = {
            uiLibraryName,
            uiLibraryDescription,
            style,
            IDtechStacks,
         };

         console.log(payload);

         const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/workspace/ui-library`,
            { ...payload, IDTeam }
         );

         toast({
            variant: "default",
            title: "UI Library Created",
            description: "Your UI library has been successfully created.",
            action: <ToastAction altText="Ok">Ok</ToastAction>,
         });

         const formattedName = uiLibraryName.toLowerCase().replace(/\s+/g, "-");

         router.push(`/dashboard/ui-library/${formattedName}`);
         
         // Reset the state values
         resetState();

         return response.data;
      } catch (err: any) {
         console.error("Error creating UI library", err);
         setError(err.response?.data?.message || "Unknown error occurred");

         toast({
            variant: "destructive",
            title: "Error Creating UI Library",
            description: err.response?.data?.message || "Something went wrong",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
         });

         throw err;
      } finally {
         setLoading(false);
      }
   };

   return {
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
   };
};

export default usePostUILibrary;
