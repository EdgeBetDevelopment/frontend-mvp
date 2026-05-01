import { useQuery } from '@tanstack/react-query';
import { picksApi } from '@/modules/picks';
import { useAuth } from '@/modules/auth';

export const usePicksData = (isSubscribed: boolean) => {
  const { accessToken } = useAuth();

  const today = useQuery({
    queryKey: ['pick-of-day', 'today', accessToken],
    queryFn: () => picksApi.getPickOfTheDayToday(),
    retry: false,
  });

  const week = useQuery({
    queryKey: ['pick-of-day', 'this-week', accessToken],
    queryFn: () => picksApi.getPickOfTheDayThisWeek(),
    enabled: isSubscribed,
    retry: false,
  });

  const all = useQuery({
    queryKey: ['pick-of-day', 'all', accessToken],
    queryFn: () => picksApi.getPickOfTheDayList(),
    enabled: isSubscribed,
    retry: false,
  });

  const users = useQuery({
    queryKey: ['pick-of-day', 'users'],
    queryFn: () => picksApi.getPickOfTheDayUsers(),
    retry: false,
  });

  return {
    today: { picks: today.data ?? [], isLoading: today.isLoading, isError: today.isError },
    week: { picks: week.data ?? [], isLoading: week.isLoading, isError: week.isError },
    all: { picks: all.data ?? [], isLoading: all.isLoading, isError: all.isError },
    users: users.data ?? [],
  };
};
