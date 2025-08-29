"use client";
import { SignOutButton } from "@clerk/nextjs";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { useUser } from "@clerk/nextjs";
import { Avatar } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../components/ui/sidebar";
export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, isLoaded } = useUser();
  const first = user?.fullName?.split(" ")[0].split("")[0];
  const second = user?.fullName?.split(" ")[1].split("")[0];
  if (!isLoaded)
    return (
      <div className="bg-subPrimary flex h-10 w-full animate-pulse items-center justify-center rounded-lg"></div>
    );
  return (
    <SidebarMenu className="bg-main rounded-lg">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-mainHover border-border hover:text-primary text-primary bg-main data-[state=open]:text-primary cursor-pointer border"
            >
              <Avatar className="border-border text-primary flex h-8 w-8 items-center justify-center rounded-sm border">
                <span className="font-inter">{`${first}${second}`}</span>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-primary truncate text-sm font-medium">
                  {user?.firstName}
                </span>
                <span className="text-subPrimary truncate text-sm">
                  {user?.emailAddresses[0].emailAddress}
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
                  <span className="font-inter">{`${first}${second}`}</span>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.firstName}
                  </span>
                  <span className="truncate text-xs">
                    {user?.emailAddresses[0].emailAddress}
                  </span>
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
                <SignOutButton>
                  <span className="cursor-pointer">Log out</span>
                </SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
