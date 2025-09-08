import { GetCarToUpdate } from "../../../../lib/actions/updateListing";
import UpdateListingForm from "../_components/UpdateListingForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ updatecarId: string }>;
}) {
  const { updatecarId } = await params;
  const { data } = await GetCarToUpdate(updatecarId);
  return {
    title: `AutoHub | ${data.model || "AutoHub"}-${data.model || "AutoHub"}`,
  };
}
export default async function Update({
  params,
}: {
  params: Promise<{ updatecarId: string }>;
}) {
  const { updatecarId } = await params;
  const data = await GetCarToUpdate(updatecarId);
  return <UpdateListingForm updateData={data} />;
}
