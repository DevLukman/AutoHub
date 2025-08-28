"use client";

import { DashboardLogo } from "@/app/dashboard/_components/DashboardLogo";
import { DashboardNavigation } from "@/app/dashboard/_components/DashboardNavigation";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import * as React from "react";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-4">
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent className="bg-main">
        <DashboardNavigation />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
