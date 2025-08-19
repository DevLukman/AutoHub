import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Params = {
  params: Promise<{ carId: string }>;
};
const details = {
  images: [
    "https://images.unsplash.com/photo-1469285994282-454ceb49e63c",
    "https://images.unsplash.com/photo-1591076366941-20154e816ce3",
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e",
    "https://images.unsplash.com/photo-1642479950692-f9894104e741",
  ],
  make: "Aston Martin",
  model: "DBX707",
  year: 2024,
  price: 16500000000,
  condition: "new",
  mileage: "0",
  transmission: "automatic",
  fuelType: "petrol",
  category: "suv",
  location: "Abuja, Nigeria",
  VIN: "5FNRL5H49BB123456",
};

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { formatToNaria } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import MainContainer from "@/components/MainContainer";
export default async function Page({ params }: Params) {
  // const { carId } = await params;
  const {
    images,
    location,
    category,
    mileage,
    VIN,
    transmission,
    fuelType,
    year,
    make,
    model,
    price,
    condition,
  } = details;
  return (
    <MainContainer>
      <section className="inner-container">
        <div className="mt-6">
          <Link
            href="/cars"
            className="border-border flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-sm"
          >
            <span>
              <ChevronLeft size={"11px"} className="text-subPrimary" />
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
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[18.75rem] sm:h-[25rem] md:h-[28.13rem] xl:h-[31.25rem]">
                      <Image
                        src={image}
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
                {year} {make}
                {model}
              </h1>
              <h2 className="text-lg font-bold md:text-2xl">
                {formatToNaria(price)}
              </h2>
            </div>
            <div className="mt-2 grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,calc(var(--spacing)*80))_auto] sm:text-sm/6">
              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Mileage
              </p>
              <p className="text-primary border-border pt-1 pb-3 sm:border-t sm:py-3 sm:nth-2:border-none">
                {`${mileage}km`}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Condition
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {condition}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Transmission
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {transmission}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Fuel Type
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {fuelType}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Category
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {category}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Location
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {location}
              </p>

              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                VIN
              </p>
              <p className="text-primary border-border pt-1 pb-3 capitalize sm:border-t sm:py-3 sm:nth-2:border-none">
                {VIN}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4 md:flex-row">
              <Button className="bg-secondary/40 hover:bg-main border-border flex-grow cursor-pointer border text-base font-medium transition duration-300 ease-in-out">
                <CiHeart /> Add to Wishlist
              </Button>
              <Button className="bg-btnBg text-secondary hover:bg-btnBg flex-grow cursor-pointer font-medium">
                <CiShoppingCart />
                Buy Now
              </Button>
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
                Lukas Flick
              </p>
              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Contact Email
              </p>
              <p className="text-primary border-border pt-1 pb-3 sm:border-t sm:py-3 sm:nth-2:border-none">
                LukasFlick@WTF
              </p>
              <p className="text-subPrimary border-border col-start-1 border-t pt-3 first:border-none sm:py-3">
                Phone Number
              </p>
              <p className="text-primary border-border pt-1 pb-3 sm:border-t sm:py-3 sm:nth-2:border-none">
                080105776132
              </p>
            </div>
          </Card>
        </div>
      </section>
    </MainContainer>
  );
}
