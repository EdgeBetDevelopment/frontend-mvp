'use client';

import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ITeam } from '../types';
import { calculateWinPercentage } from '../utils';
import { TeamHeader } from './TeamHeader';
import { TeamStatsCards } from './TeamStatsCards';
import { TeamInfo } from './TeamInfo';
import { InjuryReport } from './InjuryReport';
import { UpcomingGames } from './UpcomingGames';
import { RecentResults } from './RecentResults';
import { RosterTable } from './RosterTable';
import { ScheduleView } from './ScheduleView';
import { TeamStatsOverview } from './TeamStatsOverview';

interface TeamPageContentProps {
  team: ITeam;
}

export const TeamPageContent = ({ team }: TeamPageContentProps) => {
  const router = useRouter();

  const winPct = calculateWinPercentage(team?.overall_stats);

  return (
    <div className="container mx-auto px-6 py-24">
      <TeamHeader team={team} winPct={winPct} onBack={() => router.back()} />

      <TeamStatsCards stats={team.overall_stats} />

      <Tabs defaultValue="overview" className="mt-4 space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:inline-grid lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <TeamInfo team={team} />
            <InjuryReport injuries={team.injuries} />
            <UpcomingGames games={team.upcoming_games} teamId={team.id} />
          </div>

          <RecentResults games={team.recent_games} teamId={team.id} />
        </TabsContent>

        <TabsContent value="roster">
          <RosterTable players={team.player_statistics} />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <ScheduleView
            upcomingGames={team.upcoming_games}
            recentGames={team.recent_games}
            teamId={team.id}
          />
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <TeamStatsOverview team={team} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
