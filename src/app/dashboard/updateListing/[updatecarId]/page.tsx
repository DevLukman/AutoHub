import UpdateListingForm from "../_components/UpdateListingForm";
export default async function Update({
  params,
}: {
  params: Promise<{ updatecarId: string }>;
}) {
  const { updatecarId } = await params;
  return <UpdateListingForm />;
}
