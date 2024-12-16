"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "../use-toast";
import { checkTokenAndRedirect } from "@/services/auth-service";

export function useAuth() {
   const router = useRouter();
   const { toast } = useToast();

   const [username, setUserName] = useState("");
   const [password, setPassword] = useState("");
   const [displayName, setDisplayName] = useState("");
   const [email, setEmail] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleCancel = () => {
      router.push("/");
   };

   useEffect(() => {
      checkTokenAndRedirect(router);
   }, [router]);

   return {
      router,
      toast,
      username,
      setUserName,
      password,
      setPassword,
      displayName,
      setDisplayName,
      email,
      setEmail,
      isSubmitting,
      setIsSubmitting,
      handleCancel,
   };
}
