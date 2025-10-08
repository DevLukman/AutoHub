"use client";
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
} from "@/lib/actions/wishlist";
import { TWishListSchema } from "@/lib/Types";
import { useTransition } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export function useWishlist(wishListData: TWishListSchema) {
  const [isPending, startTransition] = useTransition();
  const { data: wishlistData, mutate } = useSWR(
    "wishlist",
    async () => {
      const { data } = await getWishlist();
      return data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const isInWishlist =
    wishlistData?.some(
      (item) => item.carListingId === wishListData.carListingId,
    ) || false;

  async function handleAddtoWishList() {
    startTransition(async () => {
      try {
        const results = await createWishlist(wishListData);
        if (results.success) {
          mutate();
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

  async function handleDeleteWishList() {
    startTransition(async () => {
      try {
        const results = await deleteWishlist(wishListData.carListingId);
        if (results.success) {
          mutate();
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
