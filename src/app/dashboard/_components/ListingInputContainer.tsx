import { ReactNode } from "react";
export default function ListingInputContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="mt-4 flex flex-col gap-2">{children}</div>;
}
