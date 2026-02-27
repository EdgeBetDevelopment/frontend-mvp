import { cn } from "@/shared/utils/helper";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-surface-primary animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
