"use client"

import * as React from "react"
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
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  user: {
     name: "NV-Phong",
     email: "nvphong@gmail.com",
     avatar: "/The Girl [ 3 ].jpg",
  },
  teams: [
     {
        name: "UI Engineer",
        logo: AudioWaveform,
        plan: "UI / UX",
     },
     {
        name: "HealthCare",
        logo: GalleryVerticalEnd,
        plan: "UI / UX",
     },
     {
        name: "Task Manager",
        logo: Command,
        plan: "UI / UX",
     },
  ],
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
           // {
           //    title: "Shadcn",
           //    url: "/dashboard",
           // },
           // {
           //    title: "Magic UI",
           //    url: "/dashboard",
           // },
        ],
     },

     {
        title: "Lab",
        url: "#",
        icon: Bot,
        items: [
           {
              title: "Shadcn",
              url: "https://ui.shadcn.com/",
           },
           {
              title: "v0.dev",
              url: "#",
           },
           {
              title: "Quantum",
              url: "#",
           },
        ],
     },

     {
        title: "Collection",
        url: "#",
        icon: BookOpen,
        items: [
           {
              title: "Introduction",
              url: "#",
           },
           {
              title: "Get Started",
              url: "#",
           },
           {
              title: "Tutorials",
              url: "#",
           },
           {
              title: "Changelog",
              url: "#",
           },
        ],
     },
     {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
           {
              title: "General",
              url: "#",
           },
           {
              title: "Team",
              url: "#",
           },
           {
              title: "Billing",
              url: "#",
           },
           {
              title: "Limits",
              url: "#",
           },
        ],
     },
  ],
  projects: [
     {
        name: "React Code Preview",
        url: "/test/editor",
        icon: Frame,
     },
     // {
     //    name: "Sales & Marketing",
     //    url: "#",
     //    icon: PieChart,
     // },
     // {
     //    name: "Travel",
     //    url: "#",
     //    icon: Map,
     // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
  )
}
