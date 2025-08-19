"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { MdDangerous } from "react-icons/md";

export function NavUser() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu className="bg-main rounded-lg">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-mainHover hover:text-primary text-primary bg-main data-[state=open]:text-primary"
            >
              <Avatar className="border-border text-primary flex h-8 w-8 items-center justify-center rounded-sm border">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                <span className="font-inter">LF</span>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-primary truncate text-sm font-medium">
                  Lukas Flick
                </span>
                <span className="text-subPrimary truncate text-sm">
                  Lukas@wtf
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-main text-primary w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="border-border text-primary flex h-8 w-8 items-center justify-center rounded-sm border">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                  <span className="font-inter">LF</span>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Lukas</span>
                  <span className="truncate text-xs">Lukas@wtf</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MdDangerous />
                Delete Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
