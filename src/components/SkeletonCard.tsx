import { Skeleton } from "@/components/ui/skeleton";
export default function SkeletonCard() {
  return (
    <div>
      <div>
        <Skeleton className="h-[12.5rem] w-full" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
}
