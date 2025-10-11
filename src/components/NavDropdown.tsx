"use client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { CiViewList } from "react-icons/ci";
import { FaHeadset } from "react-icons/fa";
import { IoIosCash } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { auth } from "../lib/auth";
import { useRouter } from "next/navigation";
import { logout } from "../lib/actions/authAction";
import { toast } from "react-toastify";
type Session = typeof auth.$Infer.Session;
export default function NavDropdown({ session }: { session: Session }) {
  const name: string = session.user.name.split("")[0];
  const router = useRouter();
  async function handleLogout() {
    const result = await logout();
    if (result.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(result.message);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="cursor-pointer">
          <Avatar className="border-border text-primary flex h-7 w-7 items-center justify-center rounded-sm border text-center">
            <span className="font-inter text-center text-base capitalize">
              {name}
            </span>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-main text-primary w-56" align="end">
        <DropdownMenuLabel className="truncate py-1 text-sm">
          {session.user.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-subPrimary py-0 text-sm">
          {session.user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:bg-btnBg focus:text-secondary py-2">
            <MdOutlineDashboard />
            <Link href="/dashboard"> Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-btnBg focus:text-secondary py-2">
            <IoIosCash />
            <Link href="/purchases"> My purchases</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-btnBg focus:text-secondary py-2">
            <CiViewList />
            <Link href="/wishlist">My Wishlist</Link>
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
          <button onClick={handleLogout} className="cursor-pointer">
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
