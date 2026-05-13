import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { teamApi } from '../services';

export const useTeam = (teamId: string, isAuthenticated: boolean = true) => {
  const [authError, setAuthError] = useState<402 | null>(null);

  const teamQuery = useQuery({
    queryKey: ['team', teamId],
    queryFn: () => teamApi.getTeamById(teamId),
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (teamQuery.error) {
      const err = teamQuery.error as { code?: number };
      if (err?.code === 402) {
        setAuthError(402);
      }
    }
  }, [teamQuery.error]);

  return {
    ...teamQuery,
    authError,
  };
};
