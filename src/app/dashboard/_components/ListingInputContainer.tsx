import { ReactElement } from "react";

export default function ListingInputContainer({
  children,
}: {
  children: ReactElement[];
}) {
  return <div className="mt-6 flex flex-col gap-2">{children}</div>;
}
