"use client";
import * as React from "react";
import {
   AudioWaveform,
   BookOpen,
   Bot,
   Command,
   Frame,
   GalleryVerticalEnd,
   Map,
   PieChart,
   Settings2,
   SquareTerminal,
} from "lucide-react";

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import useGetTeams from "@/hooks/workspace/team/get-team";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const { data: teams, loading, error } = useGetTeams();
   const token = Cookies.get("access_token");

   if (token) {
      const decoded: any = jwt.decode(token);
      var username = decoded?.username;
      var email = decoded?.email;
   }

   const data = {
      user: {
         name: username,
         email: email,
         avatar: "/The Girl [ 3 ].jpg",
      },
      teams:
         teams?.map((team) => ({
            name: team.teamName,
            logo: AudioWaveform,
            plan: team.teamDescription,
            idteam: team._id,
         })) || [],
      navMain: [
         {
            title: "UI Library",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
               {
                  title: "Hexagon",
                  url: "/dashboard",
               },
               // { title: "Shadcn", url: "/dashboard" },
               // { title: "Magic UI", url: "/dashboard" },
            ],
         },
         {
            title: "Lab",
            url: "#",
            icon: Bot,
            items: [
               { title: "Shadcn", url: "https://ui.shadcn.com/" },
               { title: "v0.dev", url: "#" },
               { title: "Quantum", url: "#" },
            ],
         },
         {
            title: "Collection",
            url: "#",
            icon: BookOpen,
            items: [
               { title: "Introduction", url: "#" },
               { title: "Get Started", url: "#" },
               { title: "Tutorials", url: "#" },
               { title: "Changelog", url: "#" },
            ],
         },
         {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
               { title: "General", url: "#" },
               { title: "Team", url: "#" },
               { title: "Billing", url: "#" },
               { title: "Limits", url: "#" },
               { title: "Home", url: "/" },
            ],
         },
      ],
      projects: [
         {
            name: "React Code Preview",
            url: "/test/editor",
            icon: Frame,
         },
         // { name: "Sales & Marketing", url: "#", icon: PieChart },
         // { name: "Travel", url: "#", icon: Map },
      ],
   };

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <Sidebar collapsible="icon" {...props}>
         <SidebarHeader>
            <TeamSwitcher teams={data.teams} />
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
            <NavProjects projects={data.projects} />
         </SidebarContent>
         <SidebarFooter>
            <NavUser user={data.user} />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   );
}
