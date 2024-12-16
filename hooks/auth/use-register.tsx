"use client";

import { ToastAction } from "@radix-ui/react-toast";
import axios from "axios";
import { register } from "@/services/auth-service";
import { useAuth } from "./use-auth";

export function useRegister() {
   const {
      toast,
      setIsSubmitting,
      username,
      setUserName,
      password,
      setPassword,
      email,
      setEmail,
      displayName,
      setDisplayName,
   } = useAuth();

   const handleRegister = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setIsSubmitting(true);

      try {
         const response = await register(
            username,
            password,
            email,
            displayName
         );
         if (response.status === 201) {
            toast({
               variant: "default",
               title: "Register Successfully",
               description: "Let Login to unleash your dreams.",
               action: (
                  <ToastAction
                     altText="Login Now"
                     onClick={() => window.location.reload()}
                  >
                     Login Now
                  </ToastAction>
               ),
            });
            setTimeout(() => {
               window.location.reload();
            }, 1500);
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            toast({
               variant: "default",
               title: "Register Failed",
               description: "Please check your registration information again.",
               action: <ToastAction altText="Retry">Retry</ToastAction>,
            });
         } else {
            toast({
               variant: "destructive",
               title: "Register Error",
               description: "An error occurred. Please try again later.",
            });
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   return {
      username,
      password,
      email,
      displayName,
      setUserName,
      setPassword,
      setEmail,
      setDisplayName,
      handleRegister,
   };
}
