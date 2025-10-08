export const metadata: Metadata = {
  title: "Auto Hub | Orders",
  description: "Your Best Automobile Marketplace",
};
import { ChevronLeftIcon, ChevronRightIcon, Search } from "lucide-react";
import { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "../../../components/ui/table";
import { Orders } from "../../../lib/actions/getOrder";
import { formatToNaria } from "../../../utils/helper";
import { Suspense } from "react";
import { OrderLoading } from "../_components/DashboardLoading";
type PageProps = {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
};

export default async function Order({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.query;
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const { data, pagination } = await Orders(search, page);
  return (
    <section className="bg-secondary flex flex-1 flex-col gap-4 px-6 pt-6 pb-4">
      <h1 className="text-primary text-2xl font-bold">Orders</h1>
      <Form
        action={"/dashboard/orders"}
        className="relative mt-6 flex w-full items-center gap-3 text-sm"
        role="search"
        aria-label="Search orders"
      >
        <Search
          className="text-subPrimary absolute top-1/2 left-3 -translate-y-1/2"
          size={17}
          aria-hidden="true"
        />

        <input
          className="border-border placeholder:text-subPrimary w-full rounded-sm border py-2.5 pr-4 pl-11 focus:ring-2 focus:outline-none"
          placeholder="Search by vehicle, buyer name, or email..."
          name="query"
          type="search"
          defaultValue={search}
          aria-label="Search orders"
        />
        <button
          type="submit"
          className="bg-btnBg text-secondary hover:bg-opacity-90 cursor-pointer rounded-sm px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-colors"
        >
          Search
        </button>
      </Form>

      <div className="mt-4">
        <Suspense fallback={<OrderLoading />}>
          <Table>
            <TableCaption className="sr-only">List of your orders</TableCaption>
            <TableHeader className="bg-main">
              <TableRow>
                <TableHead> Vehicle</TableHead>
                <TableHead>Buyer Name</TableHead>
                <TableHead>Buyer Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Platform fee</TableHead>
                <TableHead>Net Amount</TableHead>
                <TableHead>status</TableHead>
                <TableHead>Date</TableHead>
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
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-primary mb-2 text-lg font-semibold">
                        {search ? "No orders found" : "You have no orders yet"}
                      </p>
                      <p className="text-subPrimary mb-6 max-w-md text-center text-sm">
                        {search
                          ? "Try adjusting your search terms"
                          : "All your orders will show here when there is an order"}
                      </p>
                      {search && (
                        <Link
                          href="/dashboard/orders"
                          className="text-subPrimary hover:text-subPrimary text-sm font-medium underline"
                        >
                          Clear search
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.carListing.make}</TableCell>
                      <TableCell>{order.user.name}</TableCell>
                      <TableCell>{order.user.email}</TableCell>
                      <TableCell className="font-semibold">
                        {formatToNaria(order.amount)}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatToNaria(order.platformFee)}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatToNaria(order.netAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={"secondary"}>
                          {order.carListing.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.createdAt.toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </Suspense>

        {pagination.totalCount > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <Link
              href={
                pagination.hasPrevious
                  ? `/dashboard/orders?page=${pagination.currentPage - 1}${search ? `&query=${search}` : ""}`
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
                  ? `/dashboard/orders?page=${pagination.currentPage + 1}${search ? `&query=${search}` : ""}`
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
    </section>
  );
}
