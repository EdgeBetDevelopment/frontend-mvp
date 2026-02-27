'use client';

import { useEffect, useState } from "react";
import { paymentService } from "../services";
import type { ISubscriptionType, MappedPlan, UiConfig } from "../types";
import { UI_CONFIGS, DEFAULT_UI_CONFIG } from "../constants";

const getUiConfig = (name: string): UiConfig => {
  return UI_CONFIGS[name] || { ...DEFAULT_UI_CONFIG, displayName: name };
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

  const mappedPlans: MappedPlan[] = subscriptions.map((sub) => {
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
