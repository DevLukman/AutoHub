import { Map } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { db } from "../lib/prisma";
import { formatToNaria } from "../utils/helper";
import AddToWishlist from "./AddToWishlist";
export default async function FeaturedVechicles() {
  const results = await db.carListing.findMany({
    where: { status: "active" },
    include: { images: { select: { url: true } } },
    orderBy: {
      id: "desc",
    },
    take: 8,
  });
  return (
    <div className="mt-[30px] grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {results.map((cars) => (
        <div
          className="border-border hover:border-hover relative rounded-lg border transition-all duration-300 ease-in-out"
          key={cars.id}
        >
          <Link href={`/cars/${cars.id}`} className="">
            <div className="relative h-[11.5rem] w-full">
              <Image
                src={cars.images[0].url}
                alt={cars.make}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                fill
                priority
                className="rounded-t-lg object-cover"
              />
            </div>

            <div className="flex flex-col gap-2 px-4 py-4">
              <p className="text-primary truncate text-xl font-bold capitalize">
                {`${cars.make} ${cars.model}`}
              </p>
              <p className="text-subPrimary flex items-center gap-2 text-sm">
                <span>{cars.year}</span>
                <span>
                  <GoDotFill size={"10px"} />
                </span>
                <span>{cars.mileage}km</span>
                <span>
                  <GoDotFill size={"10px"} />
                </span>
                <span className="capitalize">{cars.transmission}</span>
              </p>
              <p className="text-subPrimary flex items-center gap-2 text-sm">
                <span>
                  <Map size={"14px"} />
                </span>
                <span>{cars.location}, Nigeria</span>
              </p>
              <p className="text-primary text-xl font-bold">
                {formatToNaria(cars.price)}
              </p>
            </div>
          </Link>
          <AddToWishlist
            image={cars.images[0].url}
            make={cars.make}
            model={cars.make}
            price={cars.price}
            transmission={cars.transmission}
            location={cars.location}
            fuel={cars.fuel}
            mileage={cars.mileage}
            carListingId={cars.id}
            year={cars.year}
          />
        </div>
      ))}
    </div>
  );
}
