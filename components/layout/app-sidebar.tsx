'use client'
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: teams, loading, error } = useGetTeams();

  const data = {
    user: {
      name: "NV-Phong",
      email: "nvphong@gmail.com",
      avatar: "/The Girl [ 3 ].jpg",
    },
    teams: teams?.map((team) => ({
      name: team.teamName, // Thay teamName từ API vào name
      logo: AudioWaveform, // Tạm thời giữ logo như cũ, có thể thay đổi nếu cần
      plan: "UI / UX",     // Kế hoạch giữ nguyên hoặc thay thế nếu cần thông tin khác
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

  if (loading) return <p>Loading...</p>; // Hiển thị loading khi đang tải dữ liệu
  if (error) return <p>Error: {error}</p>; // Hiển thị lỗi nếu có

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
