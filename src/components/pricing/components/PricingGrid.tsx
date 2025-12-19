import { PricingCard } from "./PricingCard";
import { PricingCardSkeleton } from "./PricingCardSkeleton";

interface MappedPlan {
    id: number;
    name: string;
    originalName: string;
    price: string;
    period: string;
    description: string;
    highlight: string;
    features: string[];
    popular: boolean;
}

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