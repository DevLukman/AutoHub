import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "sedan",
    image:
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&w=800&q=80",
  },
  {
    id: 2,
    name: "coupe",
    image:
      "https://images.unsplash.com/photo-1722626238711-aebd45e8a088?auto=format&w=800&q=80",
  },
  {
    id: 3,
    name: "suv",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&w=800&q=80",
  },
  {
    id: 4,
    name: "crossover",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&w=800&q=80",
  },
  {
    id: 5,
    name: "wagon/hatchback",
    image:
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&w=800&q=80",
  },
  {
    id: 6,
    name: "green car/hybrid",
    image:
      "https://images.unsplash.com/photo-1585011664466-b7bbe92f34ef?auto=format&w=800&q=80",
  },
  {
    id: 7,
    name: "convertible",
    image:
      "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&w=800&q=80",
  },
  {
    id: 8,
    name: "sports car",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&w=800&q=80",
  },
  {
    id: 9,
    name: "pickup truck",
    image:
      "https://images.unsplash.com/photo-1649793395985-967862a3b73f?auto=format&w=800&q=80",
  },
  {
    id: 10,
    name: "minivan/van",
    image:
      "https://images.unsplash.com/photo-1617503186332-bbe15682ba11?auto=format&w=800&q=80",
  },
  {
    id: 11,
    name: "luxury car",
    image:
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&w=800&q=80",
  },
];

export default function PopularCategories() {
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
                <Link href={"/"}>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <div className="relative h-full w-full">
                      <Image
                        src={category.image}
                        alt={category.name}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        fill
                        priority
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-end bg-black/40 p-4 transition-all duration-300 ease-in-out hover:bg-black/0">
                      <p className="text-base font-semibold sm:text-xl">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </Link>
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
