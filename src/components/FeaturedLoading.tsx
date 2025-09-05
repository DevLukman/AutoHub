import { Skeleton } from "./ui/skeleton";
export default function FeaturedLoading() {
  return (
    <main>
      <div className="relative mt-[30px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {"abcd1234".split("").map((i) => (
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
        <Skeleton className="h-[12.5rem] w-full animate-pulse" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
        <Skeleton className="h-5 w-full animate-pulse" />
      </div>
    </div>
  );
}
