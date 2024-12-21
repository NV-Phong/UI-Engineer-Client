"use client";

import { useState } from "react";
import axiosInstance from "@/services/auth-service";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type CreateComponentPayload = {
   componentName: string;
   componentDescription: string;
   language: string;
   codeHTML: string;
   codeCSS: string;
   idea: string[];
   IDUILibrary: string;
};

const useCreateComponent = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();
   const router = useRouter();

   const [componentName, setComponentName] = useState<string>("");
   const [componentDescription, setComponentDescription] = useState<string>("");
   const [language, setLanguage] = useState<string>("");
   const [codeHTML, setCodeHTML] = useState<string>("");
   const [codeCSS, setCodeCSS] = useState<string>("");
   const [idea, setIdea] = useState<string[]>([]);
   const [IDUILibrary, setIDUILibrary] = useState<string>("");

   const resetState = () => {
      setComponentName("");
      setComponentDescription("");
      setLanguage("");
      setCodeHTML("");
      setCodeCSS("");
      setIdea([]);
      setIDUILibrary("");
   };

   const createComponent = async () => {
      setLoading(true);
      setError(null);

      try {
         const IDUILibraryFromCookies = Cookies.get("IDUILibrary");

         if (!IDUILibraryFromCookies) {
            throw new Error("UI Library ID is missing. Please log in again.");
         }

         const payload: CreateComponentPayload = {
            componentName,
            componentDescription,
            language,
            codeHTML,
            codeCSS,
            idea,
            IDUILibrary: IDUILibraryFromCookies,
         };

         console.log(payload);

         const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/workspace/component`,
            payload
         );

         toast({
            variant: "default",
            title: "Component Created",
            description: "Your component has been successfully created.",
            action: <ToastAction altText="Ok">Ok</ToastAction>,
         });

         const formattedName = componentName.toLowerCase().replace(/\s+/g, "-");

         // router.push(`/dashboard/component/${formattedName}`);
         window.location.reload();
         console.log(`Component created with language: ${language}`);

         // Reset the state values
         resetState();

         return response.data;
      } catch (err: any) {
         console.error("Error creating component", err);
         setError(err.response?.data?.message || "Unknown error occurred");

         toast({
            variant: "destructive",
            title: "Error Creating Component",
            description: err.response?.data?.message || "Something went wrong",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
         });

         throw err;
      } finally {
         setLoading(false);
      }
   };

   return {
      createComponent,
      loading,
      error,
      componentName,
      componentDescription,
      language,
      codeHTML,
      codeCSS,
      idea,
      IDUILibrary,
      setComponentName,
      setComponentDescription,
      setLanguage,
      setCodeHTML,
      setCodeCSS,
      setIdea,
      setIDUILibrary,
   };
};

export default useCreateComponent;
