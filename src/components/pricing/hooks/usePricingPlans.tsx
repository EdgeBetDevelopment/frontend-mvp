'use client'

import { useEffect, useState } from "react";
import paymentService, { ISubscriptionType } from "@/services/payment";

interface UiConfig {
    displayName: string;
    period: string;
    uiDescription: string;
    highlight: string;
    popular: boolean;
}

const getUiConfig = (name: string): UiConfig => {
    const configs: Record<string, UiConfig> = {
        'Starter': {
            displayName: 'Starter',
            period: 'week',
            uiDescription: '3-day free trial included',
            highlight: 'Try risk-free',
            popular: false,
        },
        'Pro': {
            displayName: 'Pro',
            period: 'month',
            uiDescription: 'Most popular choice',
            highlight: 'Best value',
            popular: true,
        },
        'Premium': {
            displayName: 'Premium',
            period: 'month',
            uiDescription: 'Everything you need',
            highlight: 'Full access',
            popular: false,
        },
    };

    return configs[name] || {
        displayName: name,
        period: 'month',
        uiDescription: 'Premium features',
        highlight: 'Full access',
        popular: false,
    };
};

export const usePricingPlans = () => {
    const [subscriptions, setSubscriptions] = useState<ISubscriptionType[]>([]);
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                setIsLoading(true);
                const data = await paymentService.getSubscriptionTypes();
                setSubscriptions(data);
            } catch (error) {
                console.error('Error fetching subscription types', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSubs();
    }, []);

    const handleCheckout = async (subId: number) => {
        try {
            setLoadingId(subId);
            const url = await paymentService.subscribe(subId);
            window.location.href = url;
        } catch (error) {
            console.error('Stripe checkout error:', error);
            setLoadingId(null);
        }
    };

    const mappedPlans = subscriptions.map((sub) => {
        const uiConfig = getUiConfig(sub.name);

        return {
            id: sub.id,
            name: uiConfig.displayName,
            originalName: sub.name,
            price: sub.price.toFixed(2),
            period: uiConfig.period,
            description: uiConfig.uiDescription,
            highlight: uiConfig.highlight,
            features: sub.description,
            popular: uiConfig.popular,
        };
    });

    return {
        mappedPlans,
        loadingId,
        handleCheckout,
        isLoading,
    };
};