import { TechStack } from "@/components/custom/tech-stack";
import WhiteRainbowButton from "@/components/custom/white-rainbow-button";
import { CreateUILibraryPopover } from "@/components/form/create-uilibrary";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";

export default function Dashboard() {
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
                                    <DropdownMenuItem>Devices</DropdownMenuItem>
                                    <DropdownMenuItem>Shapes</DropdownMenuItem>
                                    <DropdownMenuItem>Tools</DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </div>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                           <BreadcrumbPage>
                              
                              <CreateUILibraryPopover/>

                           </BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
               </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
               <div className="grid gap-4 md:grid-cols-10">
                  <div className="aspect-video rounded-xl bg-muted/20 w-full md:col-span-7">
                     <Tabs defaultValue="ui-actions" className="m-3">
                        <TabsList>
                           <TabsTrigger value="ui-actions">All</TabsTrigger>
                           <TabsTrigger value="devices">Create</TabsTrigger>
                           <TabsTrigger value="shapes">Collection</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ui-actions">
                           {/* <IconGrid /> */}
                        </TabsContent>
                        <TabsContent value="devices">
                           Device icons content
                        </TabsContent>
                        <TabsContent value="shapes">
                           Shape icons content
                        </TabsContent>
                     </Tabs>
                  </div>

                  <div className="aspect-video rounded-xl bg-muted/50 md:col-span-3"></div>
               </div>

               <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
}
