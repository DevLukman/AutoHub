import { GetCarToUpdate } from "../../../../lib/actions/updateListing";
import UpdateListingForm from "../_components/UpdateListingForm";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ updatecarId: string }>;
}) {
  const { updatecarId } = await params;
  const result = await GetCarToUpdate(updatecarId);

  if (!result.success || !result.data) {
    return {
      title: "AutoHub | Car Not Found",
    };
  }

  return {
    title: `AutoHub | ${result.data.make} ${result.data.model}`,
  };
}

export default async function Update({
  params,
}: {
  params: Promise<{ updatecarId: string }>;
}) {
  const { updatecarId } = await params;
  const result = await GetCarToUpdate(updatecarId);

  if (!result.success || !result.data) {
    notFound();
  }

  return <UpdateListingForm updateData={result} />;
}
