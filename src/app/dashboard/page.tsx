import { getCarStatus } from "../../lib/actions/getStatus";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { CiMoneyBill } from "react-icons/ci";
import { IoBagOutline, IoCarSport } from "react-icons/io5";
import { Badge } from "../../components/ui/badge";
import { Card, CardDescription, CardHeader } from "../../components/ui/card";
import { OverViewLoading, TableLoading } from "./_components/DashboardLoading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { carListing } from "../../lib/actions/getCarListing";
import { formatToNaria } from "../../utils/helper";
import { Suspense } from "react";
type PageProps = {
  searchParams: Promise<{ page?: string }>;
};
export default async function Overview({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const { data, pagination } = await carListing(page);
  const { totalOrders, totalRevenue, carListed, activeCars } =
    await getCarStatus();
  return (
    <section className="bg-secondary flex flex-1 flex-col gap-4 overflow-x-hidden px-6 pt-6 pb-4">
      <h1 className="text-primary text-2xl font-extrabold">Dashboard</h1>
      <Suspense fallback={<OverViewLoading />}>
        <div className="mt-1 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="bg-secondary border-border rounded-lg border py-4">
            <CardHeader>
              <CardDescription className="text-primary flex items-center justify-between">
                <p className="text-sm font-medium">Total Revenue</p>
                <span>
                  <CiMoneyBill size={"16px"} />
                </span>
              </CardDescription>
              <CardDescription>
                <p className="text-primary mt-3 text-lg font-extrabold md:text-xl lg:text-2xl">
                  {formatToNaria(totalRevenue || 0)}
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-secondary border-border rounded-lg border py-4">
            <CardHeader>
              <CardDescription className="text-primary flex items-center justify-between">
                <p className="text-sm font-medium">Active Listings</p>
                <span>
                  <IoCarSport size={"16px"} />
                </span>
              </CardDescription>
              <CardDescription>
                <p className="text-primary mt-2 text-lg font-extrabold md:text-xl lg:text-2xl">
                  {activeCars}
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-secondary border-border rounded-lg border py-4">
            <CardHeader>
              <CardDescription className="text-primary flex items-center justify-between">
                <p className="text-sm font-medium">Total Listing</p>
                <span>
                  <IoBagOutline size={"16px"} />
                </span>
              </CardDescription>
              <CardDescription>
                <p className="text-primary mt-2 text-lg font-extrabold md:text-xl lg:text-2xl">
                  {carListed}
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-secondary border-border rounded-lg border py-4">
            <CardHeader>
              <CardDescription className="text-primary flex items-center justify-between">
                <p className="text-lg font-medium">Total Sold</p>
                <span>
                  <CiMoneyBill size={"16px"} />
                </span>
              </CardDescription>
              <CardDescription>
                <p className="text-primary mt-2 text-lg font-extrabold md:text-xl lg:text-2xl">
                  {totalOrders}
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Suspense>
      <div className="mt-3">
        <h2 className="mb-1 text-xl font-semibold">Latest Car Listings</h2>
        <p className="text-subPrimary text-sm">
          Keep track of your recently added cars and their performance.
        </p>
        <div className="mt-5 w-full">
          <Suspense fallback={<TableLoading />}>
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
                    <TableRow className="text-xs" key={car.id}>
                      <TableCell>{car.id}</TableCell>
                      <TableCell>{car.make}</TableCell>
                      <TableCell>{car.model}</TableCell>
                      <TableCell className="font-medium">
                        {formatToNaria(car.price)}
                      </TableCell>
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
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Suspense>
          {pagination.totalCount > 0 && (
            <div className="mt-6 mb-4 flex items-center justify-between">
              <Link
                href={
                  pagination.hasPrevious
                    ? `/dashboard?page=${pagination.currentPage - 1}`
                    : "#"
                }
                className={`flex items-center gap-2 text-sm ${
                  pagination.hasPrevious
                    ? "text-subPrimary hover:text-primary"
                    : "cursor-not-allowed text-gray-400"
                }`}
                aria-disabled={!pagination.hasPrevious}
              >
                <span>
                  <ChevronLeftIcon size={14} />
                </span>
                <span> Previous</span>
              </Link>
              <span className="text-subPrimary text-sm">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <Link
                href={
                  pagination.hasNext
                    ? `/dashboard?page=${pagination.currentPage + 1}`
                    : "#"
                }
                className={`flex items-center gap-2 text-sm ${
                  pagination.hasNext
                    ? "text-subPrimary hover:text-primary"
                    : "cursor-not-allowed text-gray-400"
                }`}
                aria-disabled={!pagination.hasNext}
              >
                <span>Next</span>
                <span>
                  <ChevronRightIcon size={14} />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
