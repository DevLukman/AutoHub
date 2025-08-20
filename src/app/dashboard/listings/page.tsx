import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { formatToNaria } from "../../../utils/helper";
import Link from "next/link";
import { RxDotsVertical } from "react-icons/rx";
export default function Overview() {
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
            <TableRow className="">
              <TableHead> Id</TableHead>
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
            <TableRow>
              <TableCell>w9imq25x2hgts8263wgnk1x1</TableCell>
              <TableCell className="font-semibold">
                {formatToNaria(57100000)}
              </TableCell>
              <TableCell>Lexus</TableCell>
              <TableCell>Lx 700</TableCell>
              <TableCell> 2024</TableCell>
              <TableCell>
                <Badge variant={"sucess"}>Active</Badge>
              </TableCell>
              <TableCell>12 August 2025</TableCell>
              <TableCell>
                <RxDotsVertical className="cursor-pointer" size={"20px"} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div></div>
    </section>
  );
}
