import { Metadata } from "next";
import CreatingListingForm from "./_components/CreatingListingForm";
export const metadata: Metadata = {
  title: "Auto Hub | New Listing",
  description: "Your Best Automobile Marketplace",
};
export default function Page() {
  return <CreatingListingForm />;
}
