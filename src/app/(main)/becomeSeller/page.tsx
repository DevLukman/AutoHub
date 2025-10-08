export const dynamic = "force-dynamic";
import { Metadata } from "next";
import SellerForm from "./_components/SellerForm";
import { getUserSession } from "../../../lib/actions/getSession";
import { redirect } from "next/navigation";
import { sellerProfile } from "../../../lib/actions/createSeller";
export const metadata: Metadata = {
  title: "Auto Hub | Become a seller",
  description: "Your Best Automobile Marketplace",
};
export default async function Seller() {
  const session = await getUserSession();
  const seller = await sellerProfile();
  if (!session) {
    redirect("/login");
  } else if (seller) {
    redirect("/dashboard");
  }
  return <SellerForm email={session.user.email} />;
}
