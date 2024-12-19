import BoxReveal from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth/use-auth";
import { useRegister } from "@/hooks/auth/use-register";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

export default function RegisterTab() {
   const { isSubmitting, handleCancel } = useAuth();
   const {
      username,
      password,
      email,
      displayName,
      setUserName,
      setPassword,
      setEmail,
      setDisplayName,
      handleRegister,
   } = useRegister();
   return (
      <form onSubmit={handleRegister}>
         <TabsContent value="register">
            <Card className="shadow-xl ring-1 ring-gray-900/5 backdrop-blur-lg">
               <CardHeader>
                  <BoxReveal boxColor={"#64748B"} duration={0.3}>
                     <CardTitle className="mb-1">Register</CardTitle>
                  </BoxReveal>
                  <BoxReveal boxColor={"#64748B"} duration={0.3}>
                     <CardDescription>
                        Create Your Account to Unleash Your Dreams
                     </CardDescription>
                  </BoxReveal>
               </CardHeader>
               <CardContent className="space-y-2">
                  <div className="space-y-1">
                     <Label htmlFor="username">UserName</Label>
                     <Input
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                        placeholder="Enter Your UserName"
                     />
                  </div>
                  <div className="space-y-1">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter Your Email"
                     />
                  </div>
                  <div className="space-y-1">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter Your Password"
                     />
                  </div>
                  <div className="space-y-1">
                     <Label htmlFor="displayname">Display Name</Label>
                     <Input
                        type="text"
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        placeholder="Enter Your Display name"
                     />
                  </div>
               </CardContent>
               <CardFooter className="align justify-between">
                  <Button
                     variant="outline"
                     type="button"
                     onClick={handleCancel}
                  >
                     Cancel
                  </Button>
                  <Button
                     type="submit"
                     disabled={isSubmitting}
                  >
                     Register
                  </Button>
               </CardFooter>
            </Card>
         </TabsContent>
      </form>
   );
}
