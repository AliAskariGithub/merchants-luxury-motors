import React from "react";

export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-md bg-neutral-200/80 before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton-wave_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent ${className}`}
      {...props}
    />
  );
}

export function CarCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
    >
      {/* Vehicle Image Shimmer */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-200/80 before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton-wave_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent">
        <div className="absolute left-3 top-3">
          <Skeleton className="h-5 w-24 rounded-full bg-neutral-300/80" />
        </div>
      </div>

      {/* Title & Brand */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* 4 Specs Badges */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-y border-neutral-100 py-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Pricing & CTA */}
      <div className="mt-4 flex items-center justify-between pt-1">
        <div>
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-6 w-28" />
        </div>
        <Skeleton className="h-10 w-28 rounded-full" />
      </div>
    </div>
  );
}

export function InventorySkeleton() {
  return (
    <div className="shell py-8 sm:py-12">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-72 sm:w-96" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>

      {/* Filter Tabs Shimmer */}
      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Search & Counter Bar Shimmer */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-9 w-48 rounded-lg" />
      </div>

      {/* Cars Grid Shimmer */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function CarDetailSkeleton() {
  return (
    <div className="shell py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-36" />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Main Stage & Visualizer Skeleton */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          <div className="aspect-[16/10] w-full rounded-3xl bg-neutral-200/80 overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton-wave_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent" />
          
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[16/10] w-24 rounded-xl" />
            ))}
          </div>

          {/* Detailed Spec Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 p-4">
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Sticky Card Skeleton */}
        <div className="space-y-6 lg:col-span-5 xl:col-span-4">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm space-y-6">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <div className="border-t border-neutral-100 pt-4 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-44" />
            </div>
            <div className="space-y-3 pt-2">
              <Skeleton className="h-12 w-full rounded-full" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>

          {/* Guarantee Badges Skeleton */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
