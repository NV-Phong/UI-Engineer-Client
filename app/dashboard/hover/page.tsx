import WhiteRainbowButton from "@/components/custom/white-rainbow-button";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Pagination,
   PaginationContent,
   PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   ChevronDown,
   Copy,
   CreditCard,
   MoreVertical,
   Truck,
} from "lucide-react";
import IconGrid from "../../test/isocon/icon-grid";
import IconCustomizer from "../../test/isocon/icon-customizer";
import { DialogDemo } from "@/components/form/create-uilibrary";

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
                                 Hexagon Library
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



                              {/* <WhiteRainbowButton href="/dashboard">
                                 Add Component
                              </WhiteRainbowButton> */}

                              {/* <DialogDemo/> */}




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
                           <TabsTrigger value="ui-actions">
                              All
                           </TabsTrigger>
                           <TabsTrigger value="devices">Create</TabsTrigger>
                           <TabsTrigger value="shapes">Collection</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ui-actions">
                           <IconGrid />
                        </TabsContent>
                        <TabsContent value="devices">
                           Device icons content
                        </TabsContent>
                        <TabsContent value="shapes">
                           Shape icons content
                        </TabsContent>
                     </Tabs>
                  </div>

                  <div className="aspect-video rounded-xl bg-muted/50 md:col-span-3">
                     <Card
                        className="overflow-hidden"
                        x-chunk="dashboard-05-chunk-4"
                     >
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                           <div className="grid gap-0.5">
                              <CardTitle className="group flex items-center gap-2 text-lg">
                                 Component Infomation
                                 <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                 >
                                    <Copy className="h-3 w-3" />
                                    <span className="sr-only">
                                       Copy Order ID
                                    </span>
                                 </Button>
                              </CardTitle>
                              <CardDescription>
                                 Library : UI Engineer
                              </CardDescription>
                           </div>
                           <div className="ml-auto flex items-center gap-1">
                              {/* <Button
                                 size="sm"
                                 variant="outline"
                                 className="h-8 gap-1"
                              >
                                 <Truck className="h-3.5 w-3.5" />
                                 <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                    Track Order
                                 </span>
                              </Button> */}
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button
                                       size="icon"
                                       variant="outline"
                                       className="h-8 w-8"
                                    >
                                       <MoreVertical className="h-3.5 w-3.5" />
                                       <span className="sr-only">More</span>
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Export</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Trash</DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                           <div className="grid gap-3">
                              {/* <div className="font-semibold">Order Details</div> */}

                              <IconCustomizer></IconCustomizer>
                              <Separator className="my-2" />
                              <ul className="grid gap-3"></ul>
                           </div>
                           <div className="grid gap-3">
                              <div className="font-semibold">Authors</div>
                              <dl className="grid gap-3">
                                 <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                       NV-Phong
                                    </dt>
                                    {/* <dd>NV-Phong</dd> */}
                                 </div>
                              </dl>
                           </div>
                           <Separator className="my-4" />
                           <div className="grid gap-3">
                              <div className="font-semibold">Install</div>
                              <dl className="grid gap-3">
                                 <div className="flex items-center justify-between">
                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                       <CreditCard className="h-4 w-4" />
                                       npm
                                    </dt>
                                    <dd>npx ui-engineer add button</dd>
                                 </div>
                              </dl>
                           </div>
                        </CardContent>
                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                           <div className="text-xs text-muted-foreground">
                              Updated{" "}
                              <time dateTime="2024-11-11">
                                 November 11, 2024
                              </time>
                           </div>
                           <Pagination className="ml-auto mr-0 w-auto">
                              <PaginationContent>
                                 <PaginationItem>
                                    {/* <Payment/> */}
                                 </PaginationItem>
                              </PaginationContent>
                           </Pagination>
                        </CardFooter>
                     </Card>
                  </div>
               </div>

               <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
}
