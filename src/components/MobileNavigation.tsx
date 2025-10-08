"use client";
import { auth } from "../lib/auth";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { Separator } from "../components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import NavAuth from "./NavAuth";
import SearchButton from "./Search";
const navLinks = [
  { link: "Home", href: "/" },
  { link: "Browse Cars", href: "/cars" },
  { link: "Wishlist", href: "/wishlist" },
  { link: "My Purchases", href: "/purchases" },
];
type Session = typeof auth.$Infer.Session;
export default function MobileNavigation({
  session,
}: {
  session: Session | null;
}) {
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
          <Separator orientation="vertical" className="mr-2" />
          <NavAuth session={session} />
        </div>
      </div>
    </nav>
  );
}
