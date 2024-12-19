"use client";

import { useState } from "react";
import axiosInstance from "@/services/auth-service";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

type Team = {
   teamName: string;
   teamDescription: string;
   members: {
      IDUser: string;
      leader: boolean;
      joinedAt: string;
      _id: string;
   }[];
};

const useCreateTeam = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();

   const createTeam = async (teamData: {
      teamName: string;
      teamDescription: string;
   }) => {
      try {
         setLoading(true);
         const response = await axiosInstance.post<Team>(
            `${process.env.NEXT_PUBLIC_API_URL}/workspace/team`,
            teamData
         );

         toast({
            variant: "default",
            title: "Team Created Successfully",
            description: `Team ${teamData.teamName} has been created.`,
            action: <ToastAction altText="Ok">Ok</ToastAction>,
         });

         return response.data; // Trả về dữ liệu đội vừa được tạo
      } catch (err: any) {
         console.error("Error creating team", err);
         setError(err.response?.data?.message || "Unknown error occurred");
         toast({
            variant: "destructive",
            title: "Error Creating Team",
            description: err.response?.data?.message || "Something went wrong",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
         });
      } finally {
         setLoading(false);
      }
   };

   return { createTeam, loading, error };
};

export default useCreateTeam;
