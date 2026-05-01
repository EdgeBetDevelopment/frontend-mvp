import { Skeleton } from "@/shared/components/skeleton";

export const ReviewsSkeleton = () => (
  <div className="mx-auto flex max-w-5xl gap-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-1 flex-col gap-4 rounded-lg border border-border p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    ))}
  </div>
);
