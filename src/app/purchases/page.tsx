const purchases = [
  {
    id: "mdv5e84zzbps5obymwat2osf",
    car: "2023 Porsche Cayenne",
    price: 6800000000,
    status: "completed",
    purchaseDate: new Date().getDate(),
  },
  {
    id: 38432,
    car: "2023 Porsche Cayenne",
    price: 6800000000,
    status: "completed",
    purchaseDate: new Date().getDate(),
  },
];
import MainContainer from "@/components/MainContainer";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToNaria } from "@/utils/helper";
import { CiMoneyBill } from "react-icons/ci";
import { IoBagOutline, IoCarSport } from "react-icons/io5";

export default function Purchases() {
  return (
    <MainContainer>
      <section className="inner-container">
        <div className="mt-10">
          <h1 className="text-2xl font-extrabold">My Purchases</h1>
        </div>
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
                  {formatToNaria(23000000)}
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
                <p className="text-primary text-2xl font-extrabold">1</p>
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
                <p className="text-primary text-2xl font-semibold">0</p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="mt-8">
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
              {purchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.id}</TableCell>
                  <TableCell>{purchase.car}</TableCell>
                  <TableCell>{formatToNaria(purchase.price)}</TableCell>
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
                  <TableCell>{purchase.purchaseDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </MainContainer>
  );
}
