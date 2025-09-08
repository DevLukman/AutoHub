import { LucideCircleGauge, LucideSquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { formatToNaria } from "../../../utils/helper";
import { getWishlist } from "../../../lib/actions/wishlist";
import HandleRemoveFromWish from "./_components/HandleRemoveFromWish";
export default async function Wishlist() {
  const { data, count } = await getWishlist();
  if (count < 1)
    return (
      <div className="inner-container mt-[45px] flex w-full flex-col items-center">
        <span>
          <CiHeart size={"50px"} />
        </span>
        <h1 className="mt-4 text-2xl font-semibold">Your wishList is empty</h1>
        <p className="text-subPrimary mt-2 max-w-[500px] text-center text-base">
          Start saving cars you&apos;re interested in by clicking the heart icon
          on any listing.
        </p>
        <Link
          href={"/cars"}
          className="bg-btnBg text-secondary mt-4 rounded-lg px-3 py-2"
        >
          Browse Cars
        </Link>
      </div>
    );
  return (
    <>
      <section className="inner-container pb-6">
        <div className="mt-[50px]">
          <h1 className="text-2xl font-[700]">My Wishlist</h1>
          <p className="text-subPrimary text-base font-normal">
            You&apos;ve {count} saved cars
          </p>
        </div>
        <div className="mt-[30px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((wish) => (
            <div
              key={wish.id}
              className="border-border bg-secondary rounded-lg border"
            >
              <div className="relative h-[19rem] w-full">
                <Image
                  src={wish.image}
                  alt={`${wish.make} ${wish.model}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  fill
                  priority
                  className="rounded-t-lg object-cover"
                />
              </div>

              <div className="flex flex-col gap-2 px-4 py-4">
                <p className="text-primary truncate text-base font-semibold">
                  {`${wish.make} ${wish.model}`}
                </p>
                <p className="text-primary text-xl font-[700]">
                  {formatToNaria(wish.price)}
                </p>
                <p className="text-subPrimary flex items-center gap-[120px] capitalize">
                  <span className="flex items-center gap-1.5 text-sm">
                    <LucideCircleGauge size={"14px"} />
                    {wish.mileage}km
                  </span>
                  <span className="flex items-center gap-1.5 truncate text-sm">
                    <CiLocationOn />
                    {wish.location}
                  </span>
                </p>
                <p className="text-subPrimary flex flex-wrap items-center gap-2 capitalize">
                  <span className="text-sm">{wish.year}</span>
                  <span>
                    <GoDotFill />
                  </span>
                  <span className="text-sm">{wish.transmission}</span>
                  <span>
                    <GoDotFill />
                  </span>
                  <span className="text-sm">{wish.fuel}</span>
                </p>
                <div className="flex items-center justify-end gap-2">
                  {/* <button className="border-border flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-1.5">
                    <span>
                      <CiHeart size={"14px"} />
                    </span>
                    <span className="text-sm"> Remove</span>
                  </button> */}
                  <HandleRemoveFromWish id={wish.carListingId} />
                  <Link
                    href={`/cars/${wish.id}`}
                    className="border-border bg-main flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-1.5"
                  >
                    <span>
                      <LucideSquareArrowOutUpRight size={"14px"} />
                    </span>
                    <span className="text-sm">View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
