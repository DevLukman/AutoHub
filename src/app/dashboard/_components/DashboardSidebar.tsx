"use client";
import * as React from "react";
import { NavUser } from "../../../components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../../components/ui/sidebar";
import { auth } from "../../../lib/auth";
import { DashboardLogo } from "../_components/DashboardLogo";
import { DashboardNavigation } from "../_components/DashboardNavigation";
type Session = typeof auth.$Infer.Session;
type DashboardSide = {
  session: Session | null;
  props?: React.ComponentProps<typeof Sidebar>;
};

export function DashboardSidebar({ session, ...props }: DashboardSide) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-4">
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent className="bg-main">
        <DashboardNavigation />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session || null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
