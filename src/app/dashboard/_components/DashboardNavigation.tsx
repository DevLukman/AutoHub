"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiShoppingBag } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";

const dashboardLinks = [
  { id: 1, name: "overview", href: "/dashboard", icon: <GrOverview /> },
  {
    id: 2,
    name: "Listings",
    href: "/dashboard/listings",
    icon: <FaClipboardList />,
  },
  { id: 3, name: "Orders", href: "/dashboard/orders", icon: <BiShoppingBag /> },
  {
    id: 4,
    name: "Add new listings",
    href: "/dashboard/newlisting",
    icon: <MdOutlineCreateNewFolder />,
  },
];

export function DashboardNavigation() {
  const pathName = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <span className="text-subPrimary mb-2 text-sm font-medium">
          Overview
        </span>
      </SidebarGroupLabel>
      <SidebarMenu>
        {dashboardLinks.map((item) => (
          <SidebarMenuItem key={item.id}>
            <Link href={item.href} className="w-full">
              <SidebarMenuButton
                tooltip={item.name}
                className={`cursor-pointer ${pathName === item.href ? "text-secondary" : "text-subPrimary"} ${
                  pathName === item.href ? "bg-btnBg" : ""
                } ${pathName === item.href ? "hover:bg-btnBg" : "hover:bg-mainHover"} ${
                  pathName === item.href ? "" : "hover:text-primary"
                } flex items-center gap-2 rounded-sm px-3 py-5 text-sm capitalize transition-all duration-300 ease-in-out`}
              >
                {item.icon}
                {item.name}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
