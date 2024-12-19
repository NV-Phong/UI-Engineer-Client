"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/auth-service";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

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

            const token = Cookies.get("access_token");

            if (token) {
               const decoded: any = jwt.decode(token);

               const username = decoded?.username;

               if (username) {
                  toast({
                     variant: "default",
                     title: `Wellcom Back ${username}`,
                     description: "Let go! to unleash your dreams.",
                     action: <ToastAction altText="Ok">Ok</ToastAction>,
                  });
               } else {
                  toast({
                     variant: "destructive",
                     title: "Error",
                     description: "Username is not available in the token.",
                     action: <ToastAction altText="Retry">Retry</ToastAction>,
                  });
               }
            } else {
               toast({
                  variant: "destructive",
                  title: "Error",
                  description: "No access token found.",
                  action: <ToastAction altText="Retry">Retry</ToastAction>,
               });
            }

            setData(response.data);
         } catch (err: any) {
            console.error("Error fetching team data", err);
            setError(err.response?.data?.message || "Unknown error occurred");
            toast({
               variant: "destructive",
               title: "Error Fetching Teams",
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

export default useGetTeams;
