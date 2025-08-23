import { carsData } from "../lib/dataService";
import { formatToNaria } from "../utils/helper";
import { Map } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
export default async function FeaturedVechicles() {
  const featruedCars = await carsData();
  return (
    <div className="mt-[30px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {featruedCars.map((cars, index) => (
        <div
          className="border-border hover:border-hover relative rounded-lg border transition-all duration-300 ease-in-out"
          key={cars.sellerId}
        >
          <Link href={`/cars/${cars.sellerId}`} className="">
            <div className="relative h-[12.5rem] w-full">
              <Image
                src={cars.images[index]}
                alt={cars.fuelType}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                fill
                priority
                className="rounded-t-lg object-cover"
              />
            </div>

            <div className="flex flex-col gap-2 px-4 py-4">
              <p className="text-primary truncate text-lg font-semibold">
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
                <span>{cars.transmission}</span>
              </p>
              <p className="text-subPrimary flex items-center gap-2 text-sm">
                <span>
                  <Map size={"14px"} />
                </span>
                <span>{cars.location}</span>
              </p>
              <p className="text-primary text-lg font-semibold">
                {formatToNaria(cars.price)}
              </p>
            </div>
          </Link>
          <button className="bg-main/75 border-border absolute top-0 right-0 z-10 m-2 cursor-pointer rounded-lg border p-2">
            <CiHeart size={"18px"} />
          </button>
        </div>
      ))}
    </div>
  );
}
