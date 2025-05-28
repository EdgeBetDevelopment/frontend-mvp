import { useQuery } from '@tanstack/react-query';

import { TeamStatsTable as TeamStatsTableComponent } from '@/components/team/TeamStatsTable';
import apiService from '@/services';
import { Skeleton } from '@/ui/skeleton';

const TeamStatsTable = ({
  homeTeamId,
  awayTeamId,
}: {
  homeTeamId: number;
  awayTeamId: number;
}) => {
  const {
    data: homeTeam,
    isLoading: isLoadingHome,
    isError: isErrorHome,
  } = useQuery({
    queryKey: ['team', homeTeamId],
    queryFn: () =>
      homeTeamId ? apiService.getTeamById(`${homeTeamId}`) : null,
    enabled: !!homeTeamId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const {
    data: awayTeam,
    isLoading: isLoadingAway,
    isError: isErrorAway,
  } = useQuery({
    queryKey: ['team', awayTeamId],
    queryFn: () =>
      awayTeamId ? apiService.getTeamById(`${awayTeamId}`) : null,
    enabled: !!awayTeamId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
  const isLoading = isLoadingHome || isLoadingAway;
  const isError = isErrorHome || isErrorAway;
  const canShowData = !isLoading && !isError && homeTeam && awayTeam;

  return (
    <div className="border-border space-y-4 rounded-lg">
      <h3 className="align-bottom text-lg font-semibold tracking-normal">
        Total Season Stats
      </h3>

      {isLoading && <Skeleton className="h-[206px] w-full" />}

      {!isLoading && isError && (
        <div className="py-8 text-center text-sm text-red-500">
          Can&apos;t load team stats
        </div>
      )}

      {canShowData && (
        <TeamStatsTableComponent
          tableRowClassName="bg-surface-secondary"
          stats={[
            {
              name: homeTeam.nickname,
              stats: homeTeam.team_statistics,
              logo: homeTeam.logo,
            },
            {
              name: awayTeam.nickname,
              stats: awayTeam.team_statistics,
              logo: awayTeam.logo,
            },
          ]}
        />
      )}
    </div>
  );
};

export default TeamStatsTable;
