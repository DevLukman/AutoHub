export const metadata: Metadata = {
  title: "Auto Hub | Purchases",
  description: "Your Best Automobile Marketplace",
};
import { Metadata } from "next";
import { Suspense } from "react";
import { CiMoneyBill } from "react-icons/ci";
import { IoBagOutline, IoCarSport } from "react-icons/io5";
import {
  PurchaseLoading,
  PurchaseOverview,
} from "../../../components/LoadingSkeleton";
import { Badge } from "../../../components/ui/badge";
import { Card, CardDescription, CardHeader } from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Purchase } from "../../../lib/actions/purchase";
import { formatToNaria } from "../../../utils/helper";

export default async function Purchases() {
  const { data, count, spent, orderStatus } = await Purchase();
  return (
    <>
      <section className="inner-container">
        <div className="mt-10">
          <h1 className="text-2xl font-extrabold">My Purchases</h1>
        </div>
        <Suspense fallback={<PurchaseOverview />}>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="bg-secondary border-border rounded-lg border py-6">
              <CardHeader>
                <CardDescription className="text-primary flex items-center justify-between">
                  <p className="text-lg font-medium">Total Spent</p>
                  <span>
                    <CiMoneyBill size={"16px"} />
                  </span>
                </CardDescription>
                <CardDescription>
                  <p className="text-primary text-2xl font-semibold">
                    {formatToNaria(spent)}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-secondary border-border rounded-lg border py-6">
              <CardHeader>
                <CardDescription className="text-primary flex items-center justify-between">
                  <p className="text-lg font-medium">Car Purchased</p>
                  <span>
                    <IoCarSport size={"16px"} />
                  </span>
                </CardDescription>
                <CardDescription>
                  <p className="text-primary text-2xl font-extrabold">
                    {count}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-secondary border-border rounded-lg border py-6">
              <CardHeader>
                <CardDescription className="text-primary flex items-center justify-between">
                  <p className="text-lg font-medium">Active Orders</p>
                  <span>
                    <IoBagOutline size={"16px"} />
                  </span>
                </CardDescription>
                <CardDescription>
                  <p className="text-primary text-2xl font-semibold">
                    {orderStatus}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Suspense>
        <div className="mt-8">
          <Suspense fallback={<PurchaseLoading />}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Id</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Purchase Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {count === 0 ? (
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
                          No car purchase yet
                        </h2>
                        <p className="text-subPrimary mb-6 text-center text-sm">
                          Make a purchase and see all the listings here
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {data.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>{purchase.id}</TableCell>
                        <TableCell>{`${purchase.make}${purchase.model}`}</TableCell>
                        <TableCell>{formatToNaria(purchase.amount)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              purchase.status === "completed"
                                ? "sucess"
                                : "destructive"
                            }
                          >
                            {purchase.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {purchase.createdAt.toLocaleDateString("en-NG", {
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
        </div>
      </section>
    </>
  );
}
