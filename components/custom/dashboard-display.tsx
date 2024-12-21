"use client";

import { usePathname } from "next/navigation";
import Dashboard from "@/app/dashboard/page";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../layout/app-sidebar";
import { Separator } from "../ui/separator";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
} from "../ui/breadcrumb";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { CreateUILibraryPopover } from "../form/create-uilibrary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const DashboardDisplay = ({ children }: { children: React.ReactNode }) => {
   const pathname = usePathname();

   if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/test")) {
      return (
         <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
               <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4 w-full">
                     <SidebarTrigger className="-ml-1" />
                     <Separator orientation="vertical" className="mr-2 h-4" />
                     <Breadcrumb className="w-full">
                        <BreadcrumbList className="w-full items-center justify-between">
                           <BreadcrumbItem className="flex items-center justify-between">
                              <BreadcrumbLink href="#">
                                 <Label className="text-lg mr-10">
                                    UI Library
                                 </Label>
                              </BreadcrumbLink>
                              <div className="flex">
                                 <Input
                                    placeholder="Search ..."
                                    // value={
                                    //    (table
                                    //       .getColumn("email")
                                    //       ?.getFilterValue() as string) ?? ""
                                    // }
                                    // onChange={(event) =>
                                    //    table
                                    //       .getColumn("email")
                                    //       ?.setFilterValue(event.target.value)
                                    // }
                                    className="w-96 mr-3"
                                 />
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                       <Button
                                          variant="outline"
                                          className="w-fix justify-between"
                                       >
                                          Categories
                                          <ChevronDown className="h-4 w-4 opacity-50" />
                                       </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-10">
                                       <DropdownMenuItem>All</DropdownMenuItem>
                                       <DropdownMenuItem>
                                          Devices
                                       </DropdownMenuItem>
                                       <DropdownMenuItem>
                                          Shapes
                                       </DropdownMenuItem>
                                       <DropdownMenuItem>
                                          Tools
                                       </DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              </div>
                           </BreadcrumbItem>

                           <BreadcrumbItem>
                              <BreadcrumbPage>
                                 <CreateUILibraryPopover />
                              </BreadcrumbPage>
                           </BreadcrumbItem>
                        </BreadcrumbList>
                     </Breadcrumb>
                  </div>
               </header>

               <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                  <div className="grid gap-4 md:grid-cols-10">
                     <div className="aspect-video rounded-xl bg-muted/20 w-full md:col-span-7">
                        <Tabs defaultValue="all" className="m-3">
                           <TabsList>
                              <TabsTrigger value="all">All</TabsTrigger>
                              <TabsTrigger value="create">Create</TabsTrigger>
                              <TabsTrigger value="shapes">
                                 Collection
                              </TabsTrigger>
                           </TabsList>
                           <TabsContent value="all">{children}</TabsContent>
                           <TabsContent value="create">
                              Device icons content
                           </TabsContent>
                           <TabsContent value="shapes">
                              Shape icons content
                           </TabsContent>
                        </Tabs>
                     </div>
                  </div>
               </div>
            </SidebarInset>
         </SidebarProvider>
      );
   }
   return children;
};

export default DashboardDisplay;
