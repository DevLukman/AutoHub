import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { RxDotsVertical } from "react-icons/rx";
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
                <DropDownActions id="w9imq25x2hgts8263wgnk1x1" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div></div>
    </section>
  );
}

function DropDownActions({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <button>
          <span className="sr-only">Open menu</span>
          <RxDotsVertical className="cursor-pointer" size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="bg-main">
        <DropdownMenuItem className="focus:bg-btnBg focus:text-main text-primary">
          <Link
            href={`/dashboard/updateListing/${id}`}
            className="flex items-center gap-2"
          >
            <FiEdit />
            <span className="">Edit</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-red-500 focus:bg-red-500 focus:text-white">
          <button className="flex cursor-pointer items-center gap-1">
            <span>
              <MdDelete />
            </span>
            <span>Delete</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

//  href={`/keyword/${keyword.id}-${keyword.name}`}

//  const relatedKeyword = keywordId.split("-")[1];
//   const decodeRealtedKeyword = relatedKeyword.includes("%")
//     ? decodeURIComponent(relatedKeyword)
//     : null;
//   return {
//     title: `CinePluse | ${decodeRealtedKeyword}`,
//   };
// }
