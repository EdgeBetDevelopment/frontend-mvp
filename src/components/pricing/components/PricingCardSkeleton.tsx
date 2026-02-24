import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/card";

export const PricingCardSkeleton = () => {
  return (
    <Card className="relative flex flex-col animate-pulse">
      <CardHeader className="text-center pb-4">
        <div className="h-4 bg-muted rounded w-20 mx-auto mb-2" />
        <div className="h-6 bg-muted rounded w-32 mx-auto mb-2" />
        <div className="h-4 bg-muted rounded w-40 mx-auto" />
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-12 bg-muted rounded w-full mb-6" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, j) => (
            <div key={j} className="h-5 bg-muted rounded w-full" />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-10 bg-muted rounded w-full" />
      </CardFooter>
    </Card>
  );
};
