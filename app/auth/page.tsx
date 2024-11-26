"use client";
import BoxReveal from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import {
   checkTokenAndRedirect,
   login,
   register,
} from "@/services/Auth-Service";
import axios from "axios";

export default function Auth() {
   const [username, setuserName] = useState("");
   const [password, setpassword] = useState("");
   const [displayname, setDisplayName] = useState("");
   const [email, setEmail] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();
   const { toast } = useToast();

   useEffect(() => {
      checkTokenAndRedirect(router);
   }, [router]);

   const handleCancel = () => {
      router.push("/");
   };

   const SubmitLogin = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setIsSubmitting(true);

      try {
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
            router.push("/");
         }
      } catch (error: any) {
         if (error.response?.status === 401) {
            toast({
               variant: "default",
               title: "Login Failed",
               description: "Please check your login information again.",
               action: <ToastAction altText="Thử lại">Retry</ToastAction>,
            });
         } else {
            toast({
               variant: "destructive",
               title: "Login Error",
               description: "An error occurred. Please try again later.",
            });
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   const SubmitRegister = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setIsSubmitting(true);

      try {
         const response = await register(
            username,
            password,
            email,
            displayname
         );
         console.log("Đăng Ký Thành Công!");
         if (response.status === 201) {
            const handleLoginNowClick = () => {
               window.location.reload();
            };
            toast({
               variant: "default",
               title: "Register Successfully",
               description: "Let Login to unleash your dreams.",
               action: (
                  <ToastAction
                     altText="Login Now"
                     onClick={handleLoginNowClick}
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
         console.error(error);
         console.log("Đăng Ký Thất Bại!");

         if (axios.isAxiosError(error) && error.response?.status === 401) {
            toast({
               variant: "default",
               title: "Register Failed",
               description: "Please check your login information again.",
               action: <ToastAction altText="Thử lại">Retry</ToastAction>,
            });
         } else {
            console.error("Register Error:", error);
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

   const handleGithubClick = () => {
      window.location.href = `${process.env.NEXT_PUBLIC_GITHUB}`;
   };

   return (
      <div className="h-screen">
         <div className="flex items-center justify-center mt-[75px]">
            <Tabs defaultValue="login" className="w-[400px]">
               <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
               </TabsList>
               <form onSubmit={SubmitLogin}>
                  <TabsContent value="login">
                     <Card className="bg-[#F2F3F4] shadow-xl ring-1 ring-gray-900/5 backdrop-blur-lg">
                        <CardHeader>
                           <BoxReveal boxColor={"#64748B"} duration={0.3}>
                              <CardTitle className="mb-1">Login</CardTitle>
                           </BoxReveal>
                           <BoxReveal boxColor={"#64748B"} duration={0.3}>
                              <CardDescription>
                                 Make changes to your account here. Click save
                                 when you&apos;re done.
                              </CardDescription>
                           </BoxReveal>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <div className="space-y-1">
                              <Label htmlFor="name">Email or UserName</Label>
                              <Input
                                 className="bg-[#F2F3F4]"
                                 id="name"
                                 value={username}
                                 onChange={(event) =>
                                    setuserName(event.target.value)
                                 }
                                 placeholder="Enter Your UserName"
                              />
                           </div>
                           <div className="space-y-1">
                              <Label htmlFor="username">Password</Label>
                              <Input
                                 type="password"
                                 value={password}
                                 onChange={(event) =>
                                    setpassword(event.target.value)
                                 }
                                 className="bg-[#F2F3F4]"
                                 placeholder="Enter Your Password"
                                 id="username"
                              />
                           </div>

                           <div className="relative flex justify-center text-xs uppercase">
                              <span className=" tranparent px-2 text-muted-foreground borinput bg-transparent">
                                 Or continue with
                              </span>
                           </div>

                           <div className="grid grid-cols-2 gap-6">
                              <button
                                 type="button"
                                 onClick={handleGithubClick}
                                 className="bg-[#F2F3F4] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                              >
                                 <svg
                                    viewBox="0 0 438.549 438.549"
                                    className="mr-2 h-4 w-4"
                                 >
                                    <path
                                       fill="currentColor"
                                       d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                                    ></path>
                                 </svg>
                                 Github
                              </button>
                              <button
                                 // onClick={handleGoogleClick}
                                 className="bg-[#F2F3F4] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                              >
                                 <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    className="mr-2 h-4 w-4"
                                 >
                                    <path
                                       fill="currentColor"
                                       d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    ></path>
                                 </svg>
                                 Google
                              </button>
                           </div>
                        </CardContent>
                        <CardFooter className="align justify-between">
                           <Button
                              className="bg-[#F2F3F4] "
                              variant="outline"
                              onClick={handleCancel}
                              type="button"
                           >
                              Cancel
                           </Button>
                           <Button
                              className="shadow-xl bg-slate-500"
                              type="submit"
                              disabled={isSubmitting}
                           >
                              Login now
                           </Button>
                        </CardFooter>
                     </Card>
                  </TabsContent>
               </form>

               <form onSubmit={SubmitRegister}>
                  <TabsContent value="register">
                     <Card className="bg-[#F2F3F4] shadow-xl ring-1 ring-gray-900/5 backdrop-blur-lg">
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
                              <Label htmlFor="current">UserName</Label>
                              <Input
                                 className="bg-[#F2F3F4]"
                                 id="name"
                                 value={username}
                                 onChange={(event) =>
                                    setuserName(event.target.value)
                                 }
                                 placeholder="Enter Your UserName"
                              />
                           </div>
                           <div className="space-y-1">
                              <Label htmlFor="current">Email</Label>
                              <Input
                                 className="bg-[#F2F3F4]"
                                 id="name"
                                 type="email"
                                 value={email}
                                 onChange={(event) =>
                                    setEmail(event.target.value)
                                 }
                                 placeholder="Enter Your Email"
                              />
                           </div>
                           <div className="space-y-1">
                              <Label htmlFor="current">Password</Label>
                              <Input
                                 className="bg-[#F2F3F4]"
                                 id="current"
                                 type="password"
                                 value={password}
                                 onChange={(event) =>
                                    setpassword(event.target.value)
                                 }
                                 placeholder="Enter Your Password"
                              />
                           </div>
                           <div className="space-y-1">
                              <Label htmlFor="new">Display Name</Label>
                              <Input
                                 className="bg-[#F2F3F4]"
                                 id="new"
                                 type="text"
                                 value={displayname}
                                 onChange={(event) =>
                                    setDisplayName(event.target.value)
                                 }
                                 placeholder="Enter Your Display name"
                              />
                           </div>
                        </CardContent>
                        <CardFooter className="align justify-between">
                           <Button
                              variant="outline"
                              className="bg-[#F2F3F4]"
                              type="button"
                              onClick={handleCancel}
                           >
                              Cancel
                           </Button>
                           <Button
                              className="bg-slate-500 shadow-xl"
                              type="submit"
                              disabled={isSubmitting}
                           >
                              Register
                           </Button>
                        </CardFooter>
                     </Card>
                  </TabsContent>
               </form>
            </Tabs>
         </div>
      </div>
   );
}
