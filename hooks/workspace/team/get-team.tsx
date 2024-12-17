"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/auth-service";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

// Định nghĩa kiểu dữ liệu Team
type Team = {
   _id: string;
   teamName: string;
   teamDescription: string;
   isDeleted: boolean;
   members: {
      IDUser: string;
      leader: boolean;
      joinedAt: string;
      _id: string;
   }[];
};

const useGetTeams = () => {
   const [data, setData] = useState<Team[] | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axiosInstance.get<Team[]>(
               `${process.env.NEXT_PUBLIC_API_URL}/workspace/team`
            );

            toast({
               variant: "default",
               title: "Get Teams Successfully",
               description: "Let go! to unleash your dreams.",
               action: <ToastAction altText="Ok">Ok</ToastAction>,
            });

            setData(response.data); // Dữ liệu được định kiểu là Team[]
         } catch (err: any) {
            console.error("Error fetching team data", err);
            setError(err.response?.data?.message || "Unknown error occurred");
            toast({
               variant: "destructive",
               title: "Error Fetching Teams",
               description: err.response?.data?.message || "Something went wrong",
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

export default useGetTeams;
