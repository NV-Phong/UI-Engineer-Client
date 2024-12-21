"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Cookies from "js-cookie";
import axiosInstance from "@/services/auth-service";

type Component = {
   _id: string;
   componentName: string;
   componentDescription: string;
   language: string;
   codeHTML: string;
   codeCSS: string;
   idea: string[];
   IDUILibrary: string;
};

const useGetComponentsByUILibrary = (IDUILibrary: string) => {
   const [data, setData] = useState<Component[] | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const IDUILibrary = Cookies.get("IDUILibrary");

            if (!IDUILibrary) {
               throw new Error("ID UILibrary is missing. Please log in again.");
            }
            const response = await axiosInstance.get<Component[]>(
               `${process.env.NEXT_PUBLIC_API_URL}/workspace/component/${IDUILibrary}`
            );

            setData(response.data);

            toast({
               variant: "default",
               title: "Components Loaded",
               description: "Your components have been successfully loaded.",
               action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
         } catch (err: any) {
            console.error("Error fetching components data", err);
            setError(err.response?.data?.message || "Unknown error occurred");

            toast({
               variant: "destructive",
               title: "Error Fetching Components",
               description:
                  err.response?.data?.message || "Something went wrong",
               action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
         } finally {
            setLoading(false);
         }
      };

      if (IDUILibrary) {
         fetchData();
      }
   }, [IDUILibrary]);

   return { data, loading, error };
};

export default useGetComponentsByUILibrary;
