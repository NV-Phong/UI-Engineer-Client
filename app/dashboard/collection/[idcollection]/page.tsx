"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import useGetUILibrary from "@/hooks/workspace/uilibrary/get-uilibrary";
import { useToast } from "@/hooks/use-toast";
import { FaReact, FaVuejs, FaAngular } from "react-icons/fa";
import { SiFlutter, SiTailwindcss, SiCss3, SiBootstrap } from "react-icons/si";
import { Button } from "@/components/ui/button";

type UILibrary = {
   _id: string;
   uiLibraryName: string;
   uiLibraryDescription: string;
   isDeleted: boolean;
   style: string;
   IDTeam: string;
   techStacks: string[];
};

const frameworks = [
   {
      value: "Next.JS",
      label: "Next.JS",
      icon: <FaReact className="text-[#61DAFB]" />,
   },
   {
      value: "Flutter",
      label: "Flutter",
      icon: <SiFlutter className="text-[#02569B]" />,
   },
   {
      value: "Vue.JS",
      label: "Vue.JS",
      icon: <FaVuejs className="text-[#42B883]" />,
   },
   {
      value: "Angular",
      label: "Angular",
      icon: <FaAngular className="text-[#DD0031]" />,
   },
];

const styles = [
   {
      value: "Tailwind",
      label: "Tailwind",
      icon: <SiTailwindcss className="text-[#38B2AC]" />,
   },
   {
      value: "CSS",
      label: "CSS",
      icon: <SiCss3 className="text-[#1572B6]" />,
   },
   {
      value: "Bootstrap",
      label: "Bootstrap",
      icon: <SiBootstrap className="text-[#7952B3]" />,
   },
];

export default function Page({
   params,
}: {
   params: Promise<{ idcollection: string }>;
}) {
   const router = useRouter();
   const [idcollection, setIdcollection] = useState<string | null>(null);
   const { toast } = useToast();

   useEffect(() => {
      const getParams = async () => {
         const { idcollection } = await params;
         setIdcollection(idcollection);
      };
      getParams();
   }, [params]);

   const { data, loading, error } = useGetUILibrary();

   useEffect(() => {
      if (error) {
         toast({
            variant: "destructive",
            title: "Error",
            description: error,
         });
      }
   }, [error, toast]);

   if (loading) {
      return (
         <div className="space-y-4">
            <Skeleton className="h-8 w-[250px]" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[200px]" />
               ))}
            </div>
         </div>
      );
   }

   const getFrameworkIcon = (framework: string) =>
      frameworks.find((f) => f.value === framework)?.icon || null;

   const getStyleIcon = (style: string) =>
      styles.find((s) => s.value === style)?.icon || null;

   return (
      <div className="space-y-4">
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((library: UILibrary) => (
               <Card
                  key={library._id}
                  className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                  onClick={() =>
                     router.push(`/dashboard/ui-library/${library._id}`)
                  }
               >
                  <CardHeader>
                     <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold">
                           {library.uiLibraryName}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                           {library.techStacks[0]}
                        </Badge>
                     </div>
                     <CardDescription className="mt-2 line-clamp-2">
                        {library.uiLibraryDescription}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                           <span className="font-medium">Frameworks:</span>
                           <div className="flex flex-wrap gap-2">
                              {library.techStacks.map((tech) => (
                                 <span
                                    key={tech}
                                    className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md"
                                 >
                                    {getFrameworkIcon(tech)}
                                    <span className="text-xs">{tech}</span>
                                 </span>
                              ))}
                           </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                           <span className="font-medium">Style:</span>
                           <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md">
                              {getStyleIcon(library.style)}
                              <span className="text-xs">{library.style}</span>
                           </span>
                           {/* <Button variant={"outline"}>View</Button> */}
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}
