"use client";
import { IoBagOutline, IoMoonOutline } from "react-icons/io5";
import { Separator } from "../components/ui/separator";
import SearchButton from "./Search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
type Links = {
  link: string;
  href: string;
};
const navLinks: Links[] = [
  { link: "Home", href: "/" },
  { link: "Browse Cars", href: "/cars" },
  { link: "Wishlist", href: "/wishlist" },
  { link: "My Purchases", href: "/purchases" },
];
export function NavigationLoading() {
  const pathName = usePathname();
  return (
    <nav className="inner-container mt-4 hidden w-full items-center justify-between md:flex">
      <div>
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/" className="">
              AutoHub
            </Link>
          </li>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={`hover:text-primary text-sm transition-all duration-300 ${
                  pathName === link.href ? "text-primary" : "text-subPrimary"
                }`}
              >
                {link.link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-subPrimary flex h-5 items-center gap-3">
          <SearchButton />
          <Link
            href="/purchases"
            className="hover:bg-main hover:text-primary cursor-pointer rounded-sm px-2 py-2 transition-all duration-300 ease-in-out"
          >
            <IoBagOutline size={16} />
          </Link>

          <button className="hover:bg-main hover:text-primary cursor-pointer rounded-sm px-2 py-2 transition-all duration-300 ease-in-out">
            <IoMoonOutline size={16} />
          </button>

          <Separator orientation="vertical" className="mr-2" />

          <button
            disabled
            className="bg-btnBg text-main font-inter cursor-pointer rounded-sm px-3 py-1.5 text-sm"
          >
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}

export function MobileNavLoading() {
  return (
    <nav className="inner-container mt-4 flex w-full items-center justify-between md:hidden">
      <div>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <FaBars size={18} className="text-subPrimary ml-2 cursor-pointer" />

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
          <button className="bg-btnBg text-main font-inter cursor-pointer rounded-sm px-3 py-1.5 text-sm">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}
