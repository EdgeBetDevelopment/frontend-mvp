import { useQuery } from '@tanstack/react-query';
import { picksApi } from '@/modules/picks';

export const usePicksData = () => {
  const today = useQuery({
    queryKey: ['pick-of-day', 'today'],
    queryFn: () => picksApi.getPickOfTheDayToday(),
    retry: false,
  });

  const week = useQuery({
    queryKey: ['pick-of-day', 'this-week'],
    queryFn: () => picksApi.getPickOfTheDayThisWeek(),
    retry: false,
  });

  const all = useQuery({
    queryKey: ['pick-of-day', 'all'],
    queryFn: () => picksApi.getPickOfTheDayList(),
    retry: false,
  });

  return {
    today: { picks: today.data ?? [], isLoading: today.isLoading, isError: today.isError },
    week: { picks: week.data ?? [], isLoading: week.isLoading, isError: week.isError },
    all: { picks: all.data ?? [], isLoading: all.isLoading, isError: all.isError },
  };
};
