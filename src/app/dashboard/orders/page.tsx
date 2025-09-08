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
} from "../../../components/ui/table";
import { Orders } from "../../../lib/actions/getOrder";
import { formatToNaria } from "../../../utils/helper";
type PageProps = {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
};
export default async function Order({ searchParams }: PageProps) {
  const parmas = await searchParams;
  const search = parmas.query;
  const page = Math.max(1, Number(parmas.page) || 1);
  const { data, pagination } = await Orders(search, page);
  return (
    <section className="bg-secondary flex flex-1 flex-col gap-4 px-6 pt-6 pb-4">
      <h1 className="text-primary text-2xl font-[700]">Orders</h1>
      <Form
        action={"/dashboard/orders"}
        className="relative mt-6 flex w-full items-center gap-3 text-sm"
      >
        <Search className="text-subPrimary absolute left-[2%]" size={"17px"} />
        <input
          className="border-border placeholder:text-subPrimary flex-1 rounded-sm border px-11 py-2.5"
          placeholder="Search..."
          name="query"
        ></input>
        <button
          // disabled={data.length === 0}
          type="submit"
          className="bg-btnBg text-secondary cursor-pointer rounded-sm px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Search
        </button>
      </Form>

      <div className="mt-4">
        <Table className="">
          <TableHeader className="bg-main">
            <TableRow className="">
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
                    <h2 className="text-primary mb-2 text-lg font-semibold">
                      You have no orders yet
                    </h2>
                    <p className="text-subPrimary mb-6 text-center text-sm">
                      All your will show when there is an order
                    </p>
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

        {pagination.totalCount > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <Link
              href={
                pagination.hasPrevious
                  ? `/dashboard/orders?page=${pagination.currentPage - 1}`
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
                  ? `/dashboard/orders?page=${pagination.currentPage + 1}`
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
