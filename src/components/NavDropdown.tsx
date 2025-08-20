"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { CiViewList } from "react-icons/ci";
import { FaHeadset } from "react-icons/fa";
import { IoIosCash } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { Avatar } from "./ui/avatar";
import Link from "next/link";
export default function NavDropdown() {
  const { user } = useUser();
  const first = user?.fullName?.split(" ")[0].split("")[0];
  const second = user?.fullName?.split(" ")[1].split("")[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="cursor-pointer">
          <Avatar className="border-border text-primary flex h-7 w-7 items-center justify-center rounded-sm border text-center">
            <span className="font-inter text-center text-xs">{`${first}${second}`}</span>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-main text-primary w-56" align="end">
        <DropdownMenuLabel className="truncate py-1 text-sm">
          {user?.fullName}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-subPrimary py-0 text-sm">
          {user?.emailAddresses[0].emailAddress}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:bg-btnBg focus:text-secondary py-2">
            <MdOutlineDashboard />
            <Link href={"/dashboard"}> Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-btnBg focus:text-secondary py-2">
            <IoIosCash />
            <Link href={"/purchases"}> My purchases</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-btnBg focus:text-secondary py-2">
            <CiViewList />
            <Link href={"/wishlist"}>My Wishlist</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-btnBg focus:text-secondary py-2">
          <FaHeadset />
          Customer support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-btnBg focus:text-secondary py-2">
          <LogOut />
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
