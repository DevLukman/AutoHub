import { carListing } from "../../../lib/actions/getCarListing";
import Link from "next/link";
import { Badge } from "../../../components/ui/badge";
import DropDownAction from "./components/DropDownActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { formatToNaria } from "../../../utils/helper";

export default async function Page() {
  const { data } = await carListing();
  return (
    <section className="bg-secondary flex flex-1 flex-col gap-4 px-6 pt-6 pb-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-primary text-2xl font-[700]">Listings</h1>
        <Link
          href={"/dashboard/newlisting"}
          className="bg-btnBg text-secondary rounded-sm px-3 py-2 text-sm"
        >
          Add new listing
        </Link>
      </div>

      <div className="mt-10 w-full">
        <Table>
          <TableHeader className="bg-main">
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Make</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Listed At</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-64 text-center">
                  <div className="flex w-full flex-col items-center justify-center py-8">
                    <div className="mb-4">
                      <svg
                        className="text-subPrimary mx-auto h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0"
                        />
                      </svg>
                    </div>
                    <h2 className="text-primary mb-2 text-lg font-semibold">
                      No car listings yet
                    </h2>
                    <p className="text-subPrimary mb-6 text-center text-sm">
                      Get started by creating your first car listing.
                    </p>
                    <Link
                      href={"/dashboard/newlisting"}
                      className="bg-btnBg text-secondary hover:bg-opacity-90 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    >
                      Create your listing
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.id}</TableCell>
                  <TableCell className="font-medium">
                    {formatToNaria(car.price)}
                  </TableCell>
                  <TableCell>{car.make}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>
                    <Badge
                      variant={`${
                        car.status === "pending"
                          ? "pending"
                          : car.status === "active"
                            ? "sucess"
                            : car.status === "sold"
                              ? "secondary"
                              : "destructive"
                      }`}
                    >
                      {car.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {car.createdAt.toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {car.status === "sold" ? (
                      ""
                    ) : (
                      <DropDownAction id={car.id} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
