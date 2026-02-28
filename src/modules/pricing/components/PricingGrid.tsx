import { PricingCard } from "./PricingCard";
import { PricingCardSkeleton } from "./PricingCardSkeleton";
import type { MappedPlan } from "../types";

interface PricingGridProps {
  plans: MappedPlan[];
  loadingId: number | null;
  onCheckout: (id: number) => void;
  isLoading: boolean;
}

export const PricingGrid = ({ plans, loadingId, onCheckout, isLoading }: PricingGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <PricingCardSkeleton key={i} />
        ))
      ) : (
        plans.map((plan) => (
          <PricingCard
            key={plan.id}
            {...plan}
            onCheckout={onCheckout}
            isLoading={loadingId === plan.id}
          />
        ))
      )}
    </div>
  );
};
