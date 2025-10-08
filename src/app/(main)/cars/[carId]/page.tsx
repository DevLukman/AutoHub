import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import { Separator } from "../../../../components/ui/separator";
import { db } from "../../../../lib/prisma";
import { formatToNaria } from "../../../../utils/helper";
import HandlePurchase from "../_components/HandlePurchase";
import HandleRemove from "../_components/HandleRemove";

type Params = {
  params: Promise<{ carId: string }>;
};

export async function generateMetadata({ params }: Params) {
  const { carId } = await params;
  const detail = await db.carListing.findUnique({
    where: { id: carId },
  });

  if (!detail) {
    return {
      title: "AutoHub | Car Not Found",
    };
  }

  return {
    title: `AutoHub | ${detail.year} ${detail.make} ${detail.model}`,
    description:
      detail.description ||
      `${detail.year} ${detail.make} ${detail.model} for sale`,
  };
}

export default async function Page({ params }: Params) {
  const { carId } = await params;
  const detail = await db.carListing.findUnique({
    where: { id: carId },
    include: { images: true, listedBy: true },
  });
  return (
    <>
      <section className="inner-container">
        <div className="mt-6">
          <Link
            href="/cars"
            className="border-border flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-sm"
          >
            <span>
              <ChevronLeft size={11} className="text-subPrimary" />
            </span>
            <span className="font-inter text-primary">Back</span>
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <div>
            <Carousel
              className="h-[300px] sm:h-[400px] md:h-[450px] xl:h-[500px]"
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {detail?.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[18.75rem] sm:h-[25rem] md:h-[28.13rem] xl:h-[31.25rem]">
                      <Image
                        src={image.url}
                        alt="cars"
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="relative mt-[15px] mr-[10px] flex justify-end">
                <CarouselPrevious className="border-border hover:bg-main text-primary/70 hover:text-primary right-[40px] cursor-pointer bg-transparent p-3" />
                <CarouselNext className="border-border hover:bg-main text-primary/70 hover:text-primary cursor-pointer border bg-transparent p-3" />
              </div>
            </Carousel>
          </div>
          <div className="w-full">
            <div className="mt-8 md:mt-0">
              <h1 className="mb-2 text-lg font-medium md:text-2xl">
                {detail?.year} {detail?.make}
                {detail?.model}
              </h1>
              <h2 className="text-lg font-bold md:text-2xl">
                {formatToNaria(detail?.price ?? 0)}
              </h2>
            </div>
            <div className="mt-2 grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,calc(var(--spacing)*80))_auto] sm:text-sm/6">
              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Mileage
              </p>
              <p className="text-primary border-border pt-1 pb-3 sm:border-t sm:py-3 sm:nth-2:border-none">
                {`${detail?.mileage}km`}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Condition
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {detail?.condition}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Transmission
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {detail?.transmission}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Fuel Type
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {detail?.fuel}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Category
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {detail?.category}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Location
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {detail?.location}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                VIN
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {detail?.vin}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4 md:flex-row">
              <HandleRemove
                image={detail?.images[0].url ?? ""}
                make={detail?.make ?? ""}
                model={detail?.model ?? ""}
                price={detail?.price ?? 0}
                transmission={detail?.transmission ?? ""}
                location={detail?.location ?? ""}
                fuel={detail?.fuel ?? ""}
                mileage={detail?.mileage ?? 0}
                carListingId={detail?.id ?? ""}
                year={detail?.year ?? 0}
              />
              <HandlePurchase
                carListingId={detail?.id ?? ""}
                amount={detail?.price ?? 0}
                make={detail?.make ?? ""}
                model={detail?.model ?? ""}
              />
            </div>
          </div>
        </div>
        <Separator className="mt-[80px] mb-2" />
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold">Seller Information</h3>
          <Card className="bg-secondary border-border rounded-lg border px-4 py-2">
            <div className="grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,calc(var(--spacing)*80))_auto] sm:text-sm/6">
              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Business Name
              </p>
              <p className="text-primary border-border pt-1 pb-3 sm:border-t sm:py-3 sm:nth-2:border-none">
                {detail?.listedBy.businessName}
              </p>
              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Contact Email
              </p>
              <p className="text-primary border-border pt-1 pb-3 sm:border-t sm:py-3 sm:nth-2:border-none">
                {detail?.listedBy.businessEmail}
              </p>
              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Phone Number
              </p>
              <p className="text-primary border-border pt-1 pb-3 sm:border-t sm:py-3 sm:nth-2:border-none">
                {detail?.listedBy.businessPhone}
              </p>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
