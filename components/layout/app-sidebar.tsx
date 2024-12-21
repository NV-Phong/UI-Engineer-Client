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
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import useGetTeams from "@/hooks/workspace/team/get-team";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import useGetUILibrary from "@/hooks/workspace/uilibrary/get-uilibrary";
import { TeamSwitcher } from "./team-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const {
      data: teams,
      loading: teamsLoading,
      error: teamsError,
   } = useGetTeams();
   const {
      data: uiLibraries,
      loading: librariesLoading,
      error: librariesError,
   } = useGetUILibrary();
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
            items: uiLibraries
               ? uiLibraries.map((lib) => ({
                    title: lib.uiLibraryName,
                    url: `/dashboard/${lib.uiLibraryName
                       .replace(/\s+/g, "-")
                       .toLowerCase()}`,
                 }))
               : [],
         },
         {
            title: "Lab",
            url: "#",
            icon: Bot,
            items: [
               { title: "Get Team", url: "/test/team" },
               { title: "Get UI Library", url: "test/ui-library" },
               { title: "Quantum", url: "#" },
            ],
         },
         {
            title: "Idea",
            url: "#",
            icon: BookOpen,
            items: [
               { title: "Figma", url: "/dashboard/idea/figma" },
               // { title: "Graphics", url: "/dashboard/idea/graphics" },
               { title: "Web Link", url: "/dashboard/idea/web-link" },
            ],
         },
         {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
               { title: "component", url: "/test/render" },
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

   if (teamsLoading || librariesLoading) return <p>Loading...</p>;
   if (teamsError || librariesError)
      return <p>Error: {teamsError || librariesError}</p>;

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
