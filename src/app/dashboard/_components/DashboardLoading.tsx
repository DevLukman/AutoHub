import { CiMoneyBill } from "react-icons/ci";
import { IoBagOutline, IoCarSport } from "react-icons/io5";
import { Card, CardDescription, CardHeader } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
//For the over veiw on the main dashboard
export function OverViewLoading() {
  return (
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
              <Skeleton className="bg-subPrimary h-8 w-full animate-pulse" />
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
              <Skeleton className="bg-subPrimary h-8 w-full animate-pulse" />
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
              <Skeleton className="bg-subPrimary h-8 w-full animate-pulse" />
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
              <Skeleton className="bg-subPrimary h-8 w-full animate-pulse" />
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

//For the table
export function TableLoading() {
  return (
    <Table>
      <TableHeader className="bg-main">
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Make</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Listed At</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      {"abcd1".split("").map((i) => (
        <SkeletonTable key={i} />
      ))}
    </Table>
  );
}

function SkeletonTable() {
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

export function OrderLoading() {
  return (
    <Table>
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
      {"abcd1".split("").map((i) => (
        <SkeletonOrder key={i} />
      ))}
    </Table>
  );
}

function SkeletonOrder() {
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
