"use client";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { lazy, Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sellerProfile } from "../lib/actions/createSeller";
import NavigationLoading from "./NavigationLoading";
type Session = typeof auth.$Infer.Session;
const NavDropdown = lazy(() => import("../components/NavDropdown"));
export default function NavAuth({ session }: { session: Session | null }) {
  const [isMounted, setIsMounted] = useState(false);
  const [seller, setSeller] = useState<boolean | null>(null);
  const [isCheckingSeller, setIsCheckingSeller] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function checkSellerProfile() {
      if (!session?.user) {
        setSeller(null);
        return;
      }

      setIsCheckingSeller(true);
      try {
        const created = await sellerProfile();
        setSeller(created);
      } catch (error) {
        const e = error as Error;
        toast.error(e.message || "There is an error with seller profile");
        console.error("Error checking seller profile:", error);
        setSeller(false);
      } finally {
        setIsCheckingSeller(false);
      }
    }

    if (isMounted && session?.user) {
      checkSellerProfile();
    }
  }, [session?.user?.id, isMounted, session?.user]);

  if (!isMounted) {
    return <NavigationLoading />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="bg-btnBg text-main font-inter cursor-pointer rounded-sm px-3 py-1.5 text-sm"
      >
        Sign in
      </Link>
    );
  }

  if (isCheckingSeller) {
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
  if (seller) {
    return (
      <Suspense fallback={<NavigationLoading />}>
        <NavDropdown session={session} />
      </Suspense>
    );
  }
  return <NavigationLoading />;
}
