import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Card, CardDescription, CardHeader } from "../components/ui/card";
import { CiMoneyBill } from "react-icons/ci";
import { IoBagOutline, IoCarSport } from "react-icons/io5";
import { Skeleton } from "./ui/skeleton";
// for purchase
export function PurchaseLoading() {
  return (
    <Table>
      <TableHeader className="bg-main">
        <TableRow>
          <TableHead>Order Id</TableHead>
          <TableHead>Car</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Purchase Date</TableHead>
        </TableRow>
      </TableHeader>
      {"abcd1".split("").map((i) => (
        <SkeletonPurchase key={i} />
      ))}
    </Table>
  );
}

function SkeletonPurchase() {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Skeleton className="bg-subPrimary h-7 w-full animate-pulse" />
        </TableCell>
        <TableCell>
          <Skeleton className="bg-subPrimary h-7 w-full animate-pulse" />
        </TableCell>
        <TableCell>
          <Skeleton className="bg-subPrimary h-7 w-full animate-pulse" />
        </TableCell>
        <TableCell>
          <Skeleton className="bg-subPrimary h-7 w-full animate-pulse" />
        </TableCell>
        <TableCell>
          <Skeleton className="bg-subPrimary h-7 w-full animate-pulse" />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export function PurchaseOverview() {
  return (
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
            <p>
              <Skeleton className="bg-subPrimary h-8 w-full animate-pulse" />
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
            <p>
              <Skeleton className="bg-subPrimary h-8 w-full animate-pulse" />
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
            <p>
              <Skeleton className="bg-subPrimary h-8 w-full animate-pulse" />
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

//Featured Loading
export function FeaturedLoading() {
  return (
    <main>
      <div className="relative mt-[30px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {"abcd1234".split("").map((i) => (
          <FeaturedCard key={i} />
        ))}
      </div>
    </main>
  );
}

function FeaturedCard() {
  return (
    <div>
      <div>
        <Skeleton className="h-[12.5rem] w-full animate-pulse" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
      </div>
    </div>
  );
}

// all cars loading
export function CarsLoading() {
  return (
    <main>
      <div className="relative mt-[30px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {"123456789abc".split("").map((i) => (
          <CarsCard key={i} />
        ))}
      </div>
    </main>
  );
}

function CarsCard() {
  return (
    <div>
      <div>
        <Skeleton className="h-[13.5rem] w-full animate-pulse" />
      </div>
      <div className="flex flex-col gap-2 px-4 py-4">
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
      </div>
    </div>
  );
}
