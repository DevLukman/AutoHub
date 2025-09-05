import { Skeleton } from "./ui/skeleton";
export default function CarsLoading() {
  return (
    <main>
      <div className="relative mt-[30px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {"123456789abc".split("").map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}

function SkeletonCard() {
  return (
    <div>
      <div>
        <Skeleton className="h-[13.5rem] w-full animate-pulse" />
      </div>
      <div className="flex flex-col gap-2 px-4 py-4">
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
      </div>
    </div>
  );
}
