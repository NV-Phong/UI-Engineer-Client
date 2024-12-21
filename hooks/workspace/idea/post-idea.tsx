"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/auth-service";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type CreateIdeaPayload = {
   ideaName: string;
   ideaDescription: string;
   ideaType: string;
   ideaURL: string;
   ideaImage: string;
   IDTeam: string;
};

const useCreateIdea = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();
   const router = useRouter();

   const [ideaName, setIdeaName] = useState<string>("");
   const [ideaDescription, setIdeaDescription] = useState<string>("");
   const [ideaType, setIdeaType] = useState<string>("");
   const [ideaURL, setIdeaURL] = useState<string>("");
   const [ideaImage, setIdeaImage] = useState<string>("");

   const resetState = () => {
      setIdeaName("");
      setIdeaDescription("");
      setIdeaType("");
      setIdeaURL("");
      setIdeaImage("");
   };

   const createIdea = async () => {
      setLoading(true);
      setError(null);

      try {
         const IDTeam = Cookies.get("IDTeam");

         if (!IDTeam) {
            throw new Error("Team ID is missing. Please log in again.");
         }

         const payload: CreateIdeaPayload = {
            ideaName,
            ideaDescription,
            ideaType,
            ideaURL,
            ideaImage,
            IDTeam,
         };

         console.log(payload);

         const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/workspace/idea`,
            payload
         );

         toast({
            variant: "default",
            title: "Idea Created",
            description: "Your idea has been successfully created.",
            action: <ToastAction altText="Ok">Ok</ToastAction>,
         });

         const formattedName = ideaName.toLowerCase().replace(/\s+/g, "-");

         // router.push(`/dashboard/idea/${formattedName}`);

         // Reset the state values
         resetState();

         return response.data;
      } catch (err: any) {
         console.error("Error creating idea", err);
         setError(err.response?.data?.message || "Unknown error occurred");

         toast({
            variant: "destructive",
            title: "Error Creating Idea",
            description: err.response?.data?.message || "Something went wrong",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
         });

         throw err;
      } finally {
         setLoading(false);
      }
   };

   return {
      createIdea,
      loading,
      error,
      ideaName,
      ideaDescription,
      ideaType,
      ideaURL,
      ideaImage,
      setIdeaName,
      setIdeaDescription,
      setIdeaType,
      setIdeaURL,
      setIdeaImage,
   };
};

export default useCreateIdea;
