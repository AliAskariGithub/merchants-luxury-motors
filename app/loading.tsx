import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="shell min-h-[70vh] py-12">
      {/* Top Banner Skeleton */}
      <div className="mb-10 space-y-4">
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="h-12 w-3/4 max-w-xl" />
        <Skeleton className="h-5 w-1/2 max-w-md" />
      </div>

      {/* Grid of Shimmering Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-200/80 before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton-wave_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 border-y border-neutral-100 py-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
