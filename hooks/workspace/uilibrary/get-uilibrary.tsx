"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Cookies from "js-cookie";
import axiosInstance from "@/services/auth-service";

type UILibrary = {
   _id: string;
   uiLibraryName: string;
   uiLibraryDescription: string;
   isDeleted: boolean;
   style: string;
   IDTeam: string;
   techStacks: string[];
};

const useGetUILibrary = () => {
   const [data, setData] = useState<UILibrary[] | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const IDTeam = Cookies.get("IDTeam");
            const response = await axiosInstance.get<UILibrary[]>(
               `${process.env.NEXT_PUBLIC_API_URL}/workspace/ui-library/${IDTeam}`
            );

            setData(response.data);

            toast({
               variant: "default",
               title: "UI Libraries Loaded",
               description: "Your UI libraries have been successfully loaded.",
               action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
         } catch (err: any) {
            console.error("Error fetching UI library data", err);
            setError(err.response?.data?.message || "Unknown error occurred");

            toast({
               variant: "destructive",
               title: "Error Fetching UI Libraries",
               description:
                  err.response?.data?.message || "Something went wrong",
               action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   return { data, loading, error };
};

export default useGetUILibrary;
