"use client";
import { useWishlist } from "@/hooks/useWishlist";
import { TWishListSchema } from "@/lib/Types";
import { Delete } from "lucide-react";
import { CiHeart } from "react-icons/ci";

export default function AddToWishlist({
  image,
  make,
  model,
  carListingId,
  transmission,
  price,
  year,
  mileage,
  location,
  fuel,
}: TWishListSchema) {
  const wishListData = {
    make,
    model,
    carListingId,
    transmission,
    price,
    year,
    mileage,
    location,
    fuel,
    image,
  };
  const { isInWishlist, isPending, handleDeleteWishList, handleAddtoWishList } =
    useWishlist(wishListData);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={isInWishlist ? handleDeleteWishList : handleAddtoWishList}
        disabled={isPending}
        className="bg-main/75 border-border absolute top-0 right-0 z-10 m-2 cursor-pointer rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isPending ? (
          <div className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : isInWishlist ? (
          <Delete color="red" size={18} />
        ) : (
          <CiHeart size={18} />
        )}
      </button>
    </div>
  );
}
