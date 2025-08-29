"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavAuth from "./NavAuth";
import { IoBagOutline, IoMoonOutline } from "react-icons/io5";
import { Separator } from "../components/ui/separator";
import SearchButton from "./Search";
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

export default function Navigation() {
  const pathName = usePathname();
  return (
    <nav
      aria-label="Main-navigation"
      className="inner-container mt-4 hidden w-full items-center justify-between md:flex"
    >
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
            <IoBagOutline size={16} aria-label="View your purchases" />
          </Link>

          <button className="hover:bg-main hover:text-primary cursor-pointer rounded-sm px-2 py-2 transition-all duration-300 ease-in-out">
            <IoMoonOutline size={16} aria-label="Toggle dark mode" />
          </button>

          <Separator orientation="vertical" className="mr-2" />
          <NavAuth />
        </div>
      </div>
    </nav>
  );
}
