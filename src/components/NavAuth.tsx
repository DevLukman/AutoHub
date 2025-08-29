"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { sellerProfile } from "../lib/actions/createSeller";
import NavigationLoading from "./NavigationLoading";
const NavDropdown = lazy(() => import("../components/NavDropdown"));
export default function NavAuth() {
  const { isSignedIn, isLoaded } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [seller, setSeller] = useState<boolean | null>(null);
  const [isCheckingSeller, setIsCheckingSeller] = useState(false);
  const sellerCache = useRef<boolean | null>(null);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function checkSellerProfile() {
      if (!isSignedIn || !isMounted || sellerCache.current !== null) {
        setSeller(sellerCache.current);
        return;
      }
      setIsCheckingSeller(true);
      try {
        const created = await sellerProfile();
        sellerCache.current = created;
        setSeller(created);
      } catch (error) {
        console.error("Error checking seller profile:", error);
        sellerCache.current = false;
        setSeller(false);
      } finally {
        setIsCheckingSeller(false);
      }
    }

    checkSellerProfile();
  }, [isSignedIn, isMounted]);
  if (!isMounted || !isLoaded) {
    return <NavigationLoading />;
  }

  if (!isSignedIn) {
    return (
      <SignInButton>
        <button className="bg-btnBg text-main font-inter cursor-pointer rounded-sm px-3 py-1.5 text-sm">
          Sign in
        </button>
      </SignInButton>
    );
  }

  if (isCheckingSeller || seller === null) {
    return <NavigationLoading />;
  }

  if (!seller) {
    return (
      <Link
        href="/becomeSeller"
        className="bg-btnBg text-main font-inter cursor-pointer rounded-sm px-3 py-1.5 text-sm"
      >
        Become a seller
      </Link>
    );
  }

  return (
    <Suspense fallback={<NavigationLoading />}>
      <NavDropdown />
    </Suspense>
  );
}
