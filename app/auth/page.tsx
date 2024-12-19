"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTab from "../../components/form/login";
import RegisterTab from "../../components/form/register";
import Header from "@/components/layout/header";

export default function Auth() {
   return (
      <div>
         {/* <Header /> */}
         <div className="flex items-center justify-center mt-[75px]">
            <Tabs defaultValue="login" className="w-[400px]">
               <TabsList className="grid w-full grid-cols-2 mb-3">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
               </TabsList>
               <LoginTab />
               <RegisterTab />
            </Tabs>
         </div>
      </div>
   );
}
