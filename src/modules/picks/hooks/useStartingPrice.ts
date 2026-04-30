import { useQuery } from '@tanstack/react-query';
import paymentService from '@/modules/pricing/services/payment.api';

export const useStartingPrice = () => {
  const { data } = useQuery({
    queryKey: ['subscription-types'],
    queryFn: () => paymentService.getSubscriptionTypes(),
    staleTime: 1000 * 60 * 30,
    retry: false,
  });

  const startingPrice = data
    ? Math.min(...data.map((s) => s.price))
    : null;

  return { startingPrice, isLoading: !data };
};
