"use client";

import Cookies from "js-cookie";
import { login } from "@/services/auth-service";
import { ToastAction } from "@radix-ui/react-toast";
import { useAuth } from "./use-auth";

export function useLogin() {
   const {
      username,
      setUserName,
      password,
      setPassword,
      setIsSubmitting,
      toast,
      router,
   } = useAuth();

   const handleLogin = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setIsSubmitting(true);

      try {
         console.log("hehe", username, password);
         const response = await login(username, password);
         if (response.status === 201) {
            Cookies.set("access_token", response.data.access_token, {
               expires: 7,
            });
            Cookies.set("refresh_token", response.data.refresh_token, {
               expires: 30,
            });
            toast({
               variant: "default",
               title: "Login Successfully",
               description: "Let go! to unleash your dreams.",
               action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
            router.push("/dashboard");
         }
      } catch (error: any) {
         toast({
            variant: "default",
            title: "Login Failed",
            description: "Please check your login information again.",
            action: <ToastAction altText="Retry">Retry</ToastAction>,
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleGithubLogin = () => {
      router.push(`${process.env.NEXT_PUBLIC_GITHUB}`);
   };

   return {
      username,
      password,
      setUserName,
      setPassword,
      handleLogin,
      handleGithubLogin,
   };
}
