"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { toast } from "react-toastify";
import { Button } from "../../../../components/ui/button";
import { processPurchase } from "../../../../lib/actions/processPurchase";
type TypePurchase = {
  carListingId: string;
  amount: number;
  make: string;
  model: string;
};
export default function Purchase({
  carListingId,
  amount,
  make,
  model,
}: TypePurchase) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  function handlePurchase() {
    startTransition(async () => {
      try {
        const purchase = await processPurchase(
          carListingId,
          amount,
          make,
          model,
        );
        if (purchase.success) {
          router.push("/purchases");
          toast.success("You order is on it way");
        } else toast.error(purchase.error);
      } catch (error) {
        toast.error("there was error");
        console.error(error);
      }
    });
  }

  return (
    <Button
      disabled={isPending}
      onClick={handlePurchase}
      className="bg-btnBg text-secondary hover:bg-btnBg flex-grow cursor-pointer font-medium"
    >
      <CiShoppingCart />
      {isPending ? "Buying...." : " Buy Now"}
    </Button>
  );
}
