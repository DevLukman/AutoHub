"use client";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";
import { Separator } from "../components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import SearchButton from "./Search";
import NavAuth from "./NavAuth";
const navLinks = [
  { link: "Home", href: "/" },
  { link: "Browse Cars", href: "/cars" },
  { link: "Wishlist", href: "/wishlist" },
  { link: "My Purchases", href: "/purchases" },
];
export default function MobileNavigation() {
  const pathName = usePathname();

  return (
    <nav className="inner-container mt-4 flex w-full items-center justify-between md:hidden">
      <div>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Sheet>
            <SheetTrigger asChild>
              <FaBars
                size={"18px"}
                className="text-subPrimary ml-2 cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-secondary border-border border pt-[30px]"
            >
              <SheetHeader>
                <SheetTitle className="text-primary">
                  <Link href="/" className="text-primary font-inter">
                    AutoHub
                  </Link>
                </SheetTitle>
                <VisuallyHidden>
                  <SheetDescription>
                    This is the Mobile Naviagation Links
                  </SheetDescription>
                </VisuallyHidden>
              </SheetHeader>
              <ul className="inner-container flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`hover:text-primary text-lg transition-all duration-300 ${
                        pathName === link.href
                          ? "text-primary"
                          : "text-subPrimary"
                      }`}
                    >
                      {link.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>

          <Separator orientation="vertical" />
          <Link href="/" className="text-xl">
            Auto
          </Link>
        </div>
      </div>
      <div>
        <div className="flex h-5 items-center gap-2">
          <SearchButton />
          <button className="hover:bg-main cursor-pointer rounded-sm px-2 py-2 transition-all duration-300 ease-in-out">
            <IoMoonOutline size={16} />
          </button>
          <Separator orientation="vertical" className="mr-2" />
          <NavAuth />
        </div>
      </div>
    </nav>
  );
}
