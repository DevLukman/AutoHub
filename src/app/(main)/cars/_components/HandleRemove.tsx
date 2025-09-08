"use client";
import { CiHeart } from "react-icons/ci";
import { Button } from "../../../../components/ui/button";
import { TWishListSchema } from "@/lib/Types";
import { useWishlist } from "@/hooks/useWishlist";
export default function HandleRemove({
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
    <Button
      onClick={isInWishlist ? handleDeleteWishList : handleAddtoWishList}
      className="bg-secondary/40 hover:bg-main border-border flex-grow cursor-pointer border text-base font-medium transition duration-300 ease-in-out"
      disabled={isPending}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isPending ? (
        <div className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isInWishlist ? (
        <span>Remove from wishlist</span>
      ) : (
        <>
          <CiHeart />
          <span>Add to Wishlist</span>
        </>
      )}
    </Button>
  );
}

//  <Button
//       {isPending ? (
//         ""
//       ) : (
//         <span>
//           <CiHeart /> Add to Wishlist
//         </span>
//       )}
//     </Button>
