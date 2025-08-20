import { Search } from "lucide-react";
import Form from "next/form";
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
export default function Orders() {
  return (
    <section className="bg-secondary flex flex-1 flex-col gap-4 px-6 pt-6 pb-4">
      <h1 className="text-primary text-2xl font-[700]">Orders</h1>
      <Form
        action={"/"}
        className="relative mt-6 flex w-full items-center gap-3 text-sm"
      >
        <Search className="text-subPrimary absolute left-[2%]" size={"17px"} />
        <input
          className="border-border placeholder:text-subPrimary flex-1 rounded-sm border px-11 py-2.5"
          placeholder="Search..."
        ></input>
        <button
          type="submit"
          className="bg-btnBg text-secondary cursor-pointer rounded-sm px-4 py-2.5 text-sm"
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
            <TableRow>
              <TableCell>Lexus</TableCell>
              <TableCell>Lukas</TableCell>
              <TableCell>Lukas@wtf</TableCell>
              <TableCell className="font-semibold">
                {formatToNaria(57100000)}
              </TableCell>
              <TableCell className="font-semibold">
                {formatToNaria(100000)}
              </TableCell>
              <TableCell className="font-semibold">
                {formatToNaria(5700000)}
              </TableCell>
              <TableCell>
                <Badge variant={"sucess"}>Sold</Badge>
              </TableCell>
              <TableCell>12 August 2025</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
