"use client";
import { sellerProfile } from "@/lib/actions/createSeller";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoBagOutline, IoMoonOutline } from "react-icons/io5";
import NavDropdown from "../components/NavDropdown";
import { Separator } from "../components/ui/separator";
import { NavigationLoading } from "./NavLoading";
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
  // { link: "Become a seller", href: "/becomeSeller" },
  // { link: "dashboard", href: "/dashboard" },
];
export default function Navigation() {
  const pathName = usePathname();
  const [seller, setSeller] = useState<boolean | null>(null);
  const { isSignedIn, isLoaded } = useUser();
  useEffect(
    function () {
      async function sellerCreated() {
        const created = await sellerProfile();
        setSeller(created);
      }
      if (isSignedIn) {
        sellerCreated();
      }
    },
    [isSignedIn],
  );
  if (!isLoaded) return <NavigationLoading />;
  if (isSignedIn && seller === null) return <NavigationLoading />;
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
          {/* {!isLoaded && isSignedIn && seller === null ? (
            <span className="border-border bg-subPrimary text-primary h-[50px] w-[50px] rounded-full border">
            ?
          </span>
          ) : (
            <>
              {!isSignedIn && (
                <SignInButton>
                  <button className="bg-btnBg text-main font-inter cursor-pointer rounded-sm px-3 py-1.5 text-sm">
                    Sign in
                  </button>
                </SignInButton>
              )}
            </>
          )} */}
          <>
            {!isSignedIn && (
              <SignInButton>
                <button className="bg-btnBg text-main font-inter cursor-pointer rounded-sm px-3 py-1.5 text-sm">
                  Sign in
                </button>
              </SignInButton>
            )}
          </>
          {isSignedIn && !seller && (
            <Link
              href="/becomeSeller"
              className="bg-btnBg text-main font-inter cursor-pointer rounded-sm px-3 py-1.5 text-sm"
            >
              Become a seller
            </Link>
          )}
          {isSignedIn && seller && <NavDropdown />}
        </div>
      </div>
    </nav>
  );
}
