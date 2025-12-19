'use client'

import React from 'react';

import Navigation from '@/components/Navigation';
import { usePricingPlans } from '@/components/pricing/hooks/usePricingPlans';
import {PricingHeader, PricingGrid, PricingDisclaimer, PricingFAQ} from "@/components/pricing/components";
import Footer from "@/components/Footer";

const PricingPage = () => {
    const { mappedPlans, loadingId, handleCheckout, isLoading } = usePricingPlans();

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-6 py-24">
                <PricingHeader />
                <PricingGrid
                    plans={mappedPlans}
                    loadingId={loadingId}
                    onCheckout={handleCheckout}
                    isLoading={isLoading}
                />
                <PricingDisclaimer />
                <PricingFAQ />
            </div>
            <Footer />
        </div>
    );
};

export default PricingPage;
