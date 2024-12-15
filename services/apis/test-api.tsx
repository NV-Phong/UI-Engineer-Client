'use client'
import { useEffect, useState } from "react";
import axiosInstance from "@/services/auth-service";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const GetTeams = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axiosInstance.get(
               `${process.env.NEXT_PUBLIC_API_URL}/workspace/team`
            );


            toast({
               variant: "default",
               title: "Get Teams Successfully",
               description: "Let go! to unleash your dreams.",
               action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
            

            setData(response.data);
         } catch (err: any) {
            console.error("Error fetching dashboard data", err);
            setError(err.message || "Unknown error");
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   return { data, loading, error };
};

export default GetTeams;
