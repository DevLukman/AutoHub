"use client";
import { deleteWishlist } from "../../../../lib/actions/wishlist";
import { Spinner } from "../../../../components/ui/spinner";
import { useTransition } from "react";
import { CiHeart } from "react-icons/ci";
import { toast } from "react-toastify";
export default function HandleRemoveFromWish({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  async function handleDeleteWishList() {
    startTransition(async () => {
      try {
        const results = await deleteWishlist(id);
        if (results.success) {
          toast.success("Removed from wishlist");
        } else {
          toast.error(results.error || "Failed to delete");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete from wishlist");
      }
    });
  }
  return (
    <button
      onClick={handleDeleteWishList}
      className="border-border flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-1.5"
    >
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <span>
            <CiHeart size={"14px"} />
          </span>
          <span className="text-sm"> Remove</span>
        </>
      )}
    </button>
  );
}
