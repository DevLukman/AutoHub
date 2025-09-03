import { carListings } from "@/lib/actions/getBrowseCars";
import Filter from "../../components/Filter";
import MainContainer from "../../components/MainContainer";
import { MobileFilter } from "../../components/MobileFilter";
import { formatToNaria } from "../../utils/helper";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { FaTachometerAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

export default async function Cars() {
  const { data, count = 0 } = await carListings();
  return (
    <MainContainer>
      <section className="inner-container pb-6">
        <div className="mt-10 w-[100%] gap-6 md:grid md:grid-cols-[15rem_1fr]">
          <Filter />
          <div>
            <div className="flex w-full justify-end md:hidden">
              <MobileFilter />
            </div>
            <h1 className="text-subPrimary mb-4 text-sm">
              {` ${count} ${count > 1 ? "listings found" : "listing found"}`}
            </h1>
            {count ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.map((cars) => (
                  <Link
                    href={`/cars/${cars.id}`}
                    key={cars.id}
                    className="border-border bg-secondary hover:border-hover relative rounded-lg border transition-all duration-300 ease-in-out"
                  >
                    <div className="relative h-[13.5rem] w-full">
                      <Image
                        src={cars.images[1].url}
                        alt={`${cars.make}-${cars.model}`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        fill
                        priority
                        className="rounded-t-lg object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-2 px-4 py-4">
                      <p className="text-primary truncate text-xl font-bold">
                        {`${cars.make} ${cars.model}`}
                      </p>
                      <p className="text-primary text-xl font-bold">
                        {formatToNaria(cars.price)}
                      </p>
                      <div className="my-1">
                        <p className="text-subPrimary flex flex-wrap items-center justify-between gap-2 capitalize">
                          <span className="flex items-center gap-1.5 text-sm">
                            <FaTachometerAlt />
                            {cars.mileage}km
                          </span>
                          <span className="flex items-center gap-1.5 truncate text-sm">
                            <CiLocationOn />
                            {cars.location},Nigeria
                          </span>
                        </p>
                      </div>
                      <p className="text-subPrimary flex flex-wrap items-center gap-2 capitalize">
                        <span className="text-sm">{cars.year}</span>
                        <span>
                          <GoDotFill />
                        </span>
                        <span className="text-sm">{cars.transmission}</span>
                        <span>
                          <GoDotFill />
                        </span>
                        <span className="text-sm">{cars.fuel}</span>
                      </p>
                    </div>
                    <span className="text-primary bg-main absolute top-0 right-0 m-2 rounded-xl px-2 py-1 text-[12px] font-normal capitalize">
                      {cars.condition}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-[70px] flex w-full flex-col items-center">
                <h1 className="text-primary text-xl font-semibold">
                  No listings found
                </h1>
                <p className="text-subPrimary mt-4 text-base font-normal">
                  Try adjusting your filters to find what you&apos;re looking
                  for.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainContainer>
  );
}
