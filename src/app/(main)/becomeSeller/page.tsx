import { Metadata } from "next";
import SellerForm from "./_components/SellerForm";
export const metadata: Metadata = {
  title: "Auto Hub | Become a seller",
  description: "Your Best Automobile Marketplace",
};
export default async function Seller() {
  return <SellerForm />;
}
