import SkeletonCard from "./SkeletonCard";
export default function SkeletonLoading() {
  return (
    <main>
      <div className="relative mt-[30px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {"abcd".split("").map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}
