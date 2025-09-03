import { GetCarToUpdate } from "../../../../lib/actions/updateListing";
import UpdateListingForm from "../_components/UpdateListingForm";
export default async function Update({
  params,
}: {
  params: Promise<{ updatecarId: string }>;
}) {
  const { updatecarId } = await params;
  const data = await GetCarToUpdate(updatecarId);
  console.log(data.data?.images);
  return <UpdateListingForm updateData={data} />;
}
