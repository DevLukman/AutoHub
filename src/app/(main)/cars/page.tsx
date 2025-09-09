import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaTachometerAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { CarsLoading } from "../../../components/LoadingSkeleton";
import Filter from "../../../components/Filter";
import { MobileFilter } from "../../../components/MobileFilter";
import { carListings, getCarsCount } from "../../../lib/actions/getBrowseCars";
import { SearchAndFilterProps as CarSearchParams } from "../../../lib/Types";
import { formatToNaria } from "../../../utils/helper";
export const metadata: Metadata = {
  title: "Auto Hub | Home for AutoMobile",
  description: "Your Best Automobile Marketplace",
};
type SearchAndFilterProps = {
  searchParams: Promise<CarSearchParams>;
};
export default async function Cars({ searchParams }: SearchAndFilterProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const [cars, count] = await Promise.all([
    carListings(params, page),
    getCarsCount(params),
  ]);
  return (
    <>
      <section className="inner-container pb-6">
        <div className="mt-10 w-[100%] gap-6 md:grid md:grid-cols-[15rem_1fr]">
          <Filter />
          <div>
            <div className="flex w-full justify-end md:hidden">
              <MobileFilter />
            </div>
            <Suspense fallback={<CarsLoading />} key={JSON.stringify(params)}>
              <div>
                <h1 className="text-subPrimary mb-4 text-sm">
                  {` ${count} ${count > 1 ? "listings found" : "listing found"}`}
                </h1>
                {count > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cars.data.map((car) => (
                      <Link
                        href={`/cars/${car.id}`}
                        key={car.id}
                        className="border-border bg-secondary hover:border-hover relative rounded-lg border transition-all duration-300 ease-in-out"
                      >
                        <div className="relative h-[13.5rem] w-full">
                          <Image
                            src={car.images[1].url}
                            alt={`${car.make}-${car.model}`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            fill
                            priority
                            className="rounded-t-lg object-cover"
                          />
                        </div>

                        <div className="flex flex-col gap-2 px-4 py-4">
                          <p className="text-primary truncate text-xl font-bold capitalize">
                            {`${car.make} ${car.model}`}
                          </p>
                          <p className="text-primary text-xl font-bold">
                            {formatToNaria(car.price)}
                          </p>
                          <div className="my-1">
                            <p className="text-subPrimary flex flex-wrap items-center justify-between gap-2 capitalize">
                              <span className="flex items-center gap-1.5 text-sm">
                                <FaTachometerAlt />
                                {car.mileage}km
                              </span>
                              <span className="flex items-center gap-1.5 truncate text-sm">
                                <CiLocationOn />
                                {car.location},Nigeria
                              </span>
                            </p>
                          </div>
                          <p className="text-subPrimary flex flex-wrap items-center gap-2 capitalize">
                            <span className="text-sm">{car.year}</span>
                            <span>
                              <GoDotFill />
                            </span>
                            <span className="text-sm">{car.transmission}</span>
                            <span>
                              <GoDotFill />
                            </span>
                            <span className="text-sm">{car.fuel}</span>
                          </p>
                        </div>
                        <span className="text-primary bg-main absolute top-0 right-0 m-2 rounded-xl px-2 py-1 text-xs font-normal capitalize">
                          {car.condition}
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
                      Try adjusting your filters to find what you&apos;re
                      looking for.
                    </p>
                  </div>
                )}
                {cars.pagination.totalCount > 0 && (
                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={
                        cars.pagination.hasPrevious
                          ? `/cars?page=${cars.pagination.currentPage - 1}`
                          : "#"
                      }
                      className={`flex items-center gap-2 text-sm ${
                        cars.pagination.hasPrevious
                          ? "text-subPrimary hover:text-primary"
                          : "cursor-not-allowed text-gray-400"
                      }`}
                      aria-disabled={!cars.pagination.hasPrevious}
                    >
                      <span>
                        <ChevronLeftIcon size={14} />
                      </span>
                      <span> Previous</span>
                    </Link>
                    <span className="text-subPrimary text-sm">
                      Page {cars.pagination.currentPage} of{" "}
                      {cars.pagination.totalPages}
                    </span>
                    <Link
                      href={
                        cars.pagination.hasNext
                          ? `/cars?page=${cars.pagination.currentPage + 1}`
                          : "#"
                      }
                      className={`flex items-center gap-2 text-sm ${
                        cars.pagination.hasNext
                          ? "text-subPrimary hover:text-primary"
                          : "cursor-not-allowed text-gray-400"
                      }`}
                      aria-disabled={!cars.pagination.hasNext}
                    >
                      <span>Next</span>
                      <span>
                        <ChevronRightIcon size={14} />
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
