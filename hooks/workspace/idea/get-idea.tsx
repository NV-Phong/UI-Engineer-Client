"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Cookies from "js-cookie";
import axiosInstance from "@/services/auth-service";

type Idea = {
   _id: string;
   ideaName: string;
   ideaDescription: string;
   ideaType: string;
   ideaURL: string;
   IDTeam: string;
   ideaImage: string;
};

const useGetIdea = () => {
   const [data, setData] = useState<Idea[] | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const IDTeam = Cookies.get("IDTeam");
            const response = await axiosInstance.get<Idea[]>(
               `${process.env.NEXT_PUBLIC_API_URL}/workspace/idea/${IDTeam}`
            );

            setData(response.data);

            toast({
               variant: "default",
               title: "Ideas Loaded",
               description: "Your ideas have been successfully loaded.",
               action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
         } catch (err: any) {
            console.error("Error fetching ideas", err);
            setError(err.response?.data?.message || "Unknown error occurred");

            toast({
               variant: "destructive",
               title: "Error Fetching Ideas",
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

export default useGetIdea;
