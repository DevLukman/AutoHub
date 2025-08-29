import { CiMoneyBill } from "react-icons/ci";
import { IoBagOutline, IoCarSport } from "react-icons/io5";
import { Badge } from "../../components/ui/badge";
import { Card, CardDescription, CardHeader } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { formatToNaria } from "../../utils/helper";
export default async function Overview() {
  return (
    <section className="bg-secondary flex flex-1 flex-col gap-4 overflow-x-hidden px-6 pt-6 pb-4">
      <h1 className="text-primary text-2xl font-extrabold">Dashboard</h1>
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
                {formatToNaria(23000000)}
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
                0
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
                0
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
                0
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="mt-3">
        <h2 className="mb-1 text-xl font-semibold">Latest Car Listings</h2>
        <p className="text-subPrimary text-sm">
          Keep track of your recently added cars and their performance.
        </p>
        <Table className="mt-5">
          <TableHeader className="bg-main">
            <TableRow className="">
              <TableHead> Id</TableHead>
              <TableHead>Make</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Listed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>w9imq25x2hgts8263wgnk1x1</TableCell>
              <TableCell>Lexus</TableCell>
              <TableCell>Lx 700</TableCell>
              <TableCell>{formatToNaria(57100000)}</TableCell>
              <TableCell> 2024</TableCell>
              <TableCell>
                <Badge variant={"sucess"}>Active</Badge>
              </TableCell>
              <TableCell>12 August 2025</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
