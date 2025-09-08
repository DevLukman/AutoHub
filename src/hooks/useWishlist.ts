import {
  createWishlist,
  deleteWishlist,
  getWishlist,
} from "@/lib/actions/wishlist";
import { TWishListSchema } from "@/lib/Types";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";

export function useWishlist(wishListData: TWishListSchema) {
  const [isPending, startTransition] = useTransition();
  const [isInWishlist, setIsInWishlist] = useState(false);

  async function handleAddtoWishList() {
    startTransition(async () => {
      try {
        const results = await createWishlist(wishListData);
        if (results.success) {
          setIsInWishlist(true);
          toast.success("Added to wishlist");
        } else {
          toast.error(results.error);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to add to wishlist");
      }
    });
  }

  useEffect(() => {
    async function checkInWishlist() {
      try {
        const { data } = await getWishlist();
        const isInList =
          data?.some(
            (item) => item.carListingId === wishListData.carListingId,
          ) || false;
        setIsInWishlist(isInList);
      } catch (error) {
        console.error("Error checking wishlist:", error);
        setIsInWishlist(false);
      }
    }

    checkInWishlist();
  }, [wishListData.carListingId]);

  async function handleDeleteWishList() {
    startTransition(async () => {
      try {
        const results = await deleteWishlist(wishListData.carListingId);
        if (results.success) {
          setIsInWishlist(false);
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

  return { isPending, isInWishlist, handleAddtoWishList, handleDeleteWishList };
}
