'use client'

import React from 'react';

import Navigation from '@/shared/components/Navigation';
import Footer from "@/shared/components/Footer";
import {
    usePricingPlans,
    PricingHeader,
    PricingGrid,
    PricingDisclaimer,
    PricingFAQ,
    AnnualPlanCard
} from "@/modules/pricing";

const PricingPage = () => {
    const { mappedPlans, loadingId, handleCheckout, isLoading } = usePricingPlans();

    const annualPlan = mappedPlans.find(plan => plan.originalName === 'Annual Plan');
    const regularPlans = mappedPlans.filter(plan => plan.originalName !== 'Annual Plan');

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-6 py-24">
                <PricingHeader />
                <PricingGrid
                    plans={regularPlans}
                    loadingId={loadingId}
                    onCheckout={handleCheckout}
                    isLoading={isLoading}
                />

                {!isLoading && annualPlan && (
                    <AnnualPlanCard
                        id={annualPlan.id}
                        price={annualPlan.price}
                        features={annualPlan.features}
                        onCheckout={handleCheckout}
                        isLoading={loadingId === annualPlan.id}
                    />
                )}

                <PricingDisclaimer />
                <PricingFAQ />
            </div>
            <Footer />
        </div>
    );
};

export default PricingPage;
