"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

const categories = [
  {
    id: 1,
    name: "sedan",
    to: "sedan",
    image:
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&w=800&q=80",
  },
  {
    id: 2,
    name: "coupe",
    to: "coupe",
    image:
      "https://images.unsplash.com/photo-1722626238711-aebd45e8a088?auto=format&w=800&q=80",
  },
  {
    id: 3,
    name: "suv",
    to: "suv",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&w=800&q=80",
  },
  {
    id: 4,
    name: "crossover",
    to: "crossover",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80",
  },
  {
    id: 5,
    name: "wagon/hatchback",
    to: "wagon/hatchback",
    image:
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&w=800&q=80",
  },
  {
    id: 6,
    name: "Green car/hybrid",
    to: "green car/hybrid",
    image:
      "https://images.unsplash.com/photo-1585011664466-b7bbe92f34ef?auto=format&w=800&q=80",
  },
  {
    id: 7,
    name: "convertible",
    to: "convertible",
    image:
      "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&w=800&q=80",
  },
  {
    id: 8,
    name: "sports Car", // Match Filter component exactly
    to: "sports Car",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&w=800&q=80",
  },
  {
    id: 9,
    name: "Pick up truck",
    to: "pickup truck",
    image:
      "https://images.unsplash.com/photo-1649793395985-967862a3b73f?auto=format&w=800&q=80",
  },
  {
    id: 10,
    name: "Luxury car",
    to: "luxury car",
    image:
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&w=800&q=80",
  },
];

export default function PopularCategories() {
  const searchParams = useSearchParams();
  const router = useRouter();
  function handleFilter(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    router.push(`/cars?${params.toString()}`);
  }

  return (
    <section className="inner-container mt-[70px]">
      <h1 className="text-3xl font-bold">Popular Categories</h1>
      <div className="mt-[30px] w-full">
        <Carousel
          className="relative w-full"
          opts={{ align: "center", loop: true }}
        >
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-1/2 lg:basis-1/5"
              >
                <div
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => handleFilter(category.to)}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      fill
                      priority
                      className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end bg-black/40 p-4 transition-all duration-300 ease-in-out group-hover:bg-black/20">
                    <p className="text-base font-semibold text-white capitalize sm:text-xl">
                      {category.name}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="relative mt-[20px] flex justify-end">
            <CarouselPrevious className="border-border hover:bg-main text-primary/70 hover:text-primary right-[40px] cursor-pointer bg-transparent p-3" />
            <CarouselNext className="border-border hover:bg-main text-primary/70 hover:text-primary cursor-pointer border bg-transparent p-3" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
