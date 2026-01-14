'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Trophy,
  TrendingDown,
} from 'lucide-react';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import Loader from '@/ui/loader';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import apiService from '@/services';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/utils/time';

interface PlayerStats {
  status: string;
  notPlayingReason?: string;
  notPlayingDescription?: string;
  order: number;
  personId: number;
  name: string;
  nameI: string;
  firstName: string;
  familyName: string;
  position?: string;
  jerseyNum: string;
  starter: string;
  oncourt: string;
  played: string;
  statistics: {
    assists: number;
    blocks: number;
    blocksReceived: number;
    fieldGoalsAttempted: number;
    fieldGoalsMade: number;
    fieldGoalsPercentage: number;
    foulsOffensive: number;
    foulsDrawn: number;
    foulsPersonal: number;
    foulsTechnical: number;
    freeThrowsAttempted: number;
    freeThrowsMade: number;
    freeThrowsPercentage: number;
    minus: number;
    minutes: string;
    minutesCalculated: string;
    plus: number;
    plusMinusPoints: number;
    points: number;
    pointsAgainst: number;
    pointsFastBreak: number;
    pointsInThePaint: number;
    pointsSecondChance: number;
    reboundsDefensive: number;
    reboundsOffensive: number;
    reboundsTotal: number;
    steals: number;
    threePointersAttempted: number;
    threePointersMade: number;
    threePointersPercentage: number;
    turnovers: number;
    twoPointersAttempted: number;
    twoPointersMade: number;
    twoPointersPercentage: number;
  };
}

interface TeamGameData {
  teamId: number;
  teamName: string;
  teamCity: string;
  teamTricode: string;
  score: number;
  inBonus: string;
  timeoutsRemaining: number;
  periods: Array<{
    period: number;
    periodType: string;
    score: number;
  }>;
  players: PlayerStats[];
  statistics: {
    assists: number;
    assistsTurnoverRatio: number;
    benchPoints: number;
    biggestLead: number;
    biggestLeadScore?: string;
    biggestScoringRun?: number;
    biggestScoringRunScore?: string;
    blocks: number;
    blocksReceived: number;
    fastBreakPointsAttempted?: number;
    fastBreakPointsMade?: number;
    fastBreakPointsPercentage?: number;
    fieldGoalsAttempted: number;
    fieldGoalsEffectiveAdjusted?: number;
    fieldGoalsMade: number;
    fieldGoalsPercentage: number;
    foulsOffensive: number;
    foulsDrawn: number;
    foulsPersonal: number;
    foulsTeam: number;
    foulsTechnical: number;
    foulsTeamTechnical: number;
    freeThrowsAttempted: number;
    freeThrowsMade: number;
    freeThrowsPercentage: number;
    leadChanges?: number;
    minutes?: string;
    minutesCalculated?: string;
    pointsAgainst: number;
    pointsFastBreak: number;
    pointsFromTurnovers?: number;
    pointsInThePaint: number;
    pointsInThePaintAttempted?: number;
    pointsInThePaintMade?: number;
    pointsInThePaintPercentage?: number;
    pointsSecondChance?: number;
    reboundsDefensive: number;
    reboundsOffensive: number;
    reboundsPersonal?: number;
    reboundsTeam?: number;
    reboundsTeamDefensive?: number;
    reboundsTeamOffensive?: number;
    reboundsTotal: number;
    secondChancePointsAttempted?: number;
    secondChancePointsMade?: number;
    secondChancePointsPercentage?: number;
    steals: number;
    teamFieldGoalAttempts?: number;
    threePointersAttempted: number;
    threePointersMade: number;
    threePointersPercentage: number;
    timeLeading?: string;
    timesTied?: number;
    trueShootingAttempts?: number;
    trueShootingPercentage?: number;
    turnovers: number;
    turnoversTeam: number;
    turnoversTotal: number;
    twoPointersAttempted: number;
    twoPointersMade: number;
    twoPointersPercentage: number;
    points?: number;
  };
}

interface Official {
  personId: number;
  name: string;
  nameI: string;
  firstName: string;
  familyName: string;
  jerseyNum: string;
  assignment: string;
}

interface Arena {
  arenaId: number;
  arenaName: string;
  arenaCity: string;
  arenaState: string;
  arenaCountry: string;
  arenaTimezone: string;
}

interface Boxscore {
  gameId: string;
  gameTimeLocal: string;
  gameTimeUTC: string;
  gameTimeHome: string;
  gameTimeAway: string;
  gameEt: string;
  duration: number;
  gameCode: string;
  gameStatusText: string;
  gameStatus: number;
  regulationPeriods: number;
  period: number;
  gameClock: string;
  attendance: number;
  sellout: string;
  arena: Arena;
  officials: Official[];
  homeTeam: TeamGameData;
  awayTeam: TeamGameData;
}

interface GameDetailsData {
  home_abbr: string;
  home_name: string;
  away_abbr: string;
  away_name: string;
  team_win: string;
  arena_name: string;
  attendance: number;
  status: string;
  final_score: string;
  nba_game_ext: string;
  away_team_id: number;
  away_team: string;
  id: number;
  sport: string;
  start_time: string;
  home_team_id: number;
  home_team: string;
  scoreboards: Array<{
    id: number;
    boxscore: Boxscore;
  }>;
}

const GameBreakdownPage = () => {
  const params = useParams();
  const gameId = params?.id as string;
  const router = useRouter();

  const {
    data: gameData,
    error,
    isLoading,
  } = useQuery<GameDetailsData>({
    queryKey: ['game', gameId],
    queryFn: () => apiService.getGameById(gameId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 py-24">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  console.log(gameData);

  if (
    error ||
    !gameData ||
    !gameData.scoreboards ||
    gameData.scoreboards.length === 0
  ) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <EmptyPlaceholder subtitle title="Game Not Found" />
        </div>
        <Footer />
      </div>
    );
  }

  const boxscore = gameData.scoreboards[0].boxscore;
  const homeTeam = boxscore.homeTeam;
  const awayTeam = boxscore.awayTeam;
  const formattedDate = formatUtcToLocalDate(gameData.start_time);
  const formattedTime = formatUtcToLocalTimeAmPm(gameData.start_time);

  const extractMinutes = (timeString: string): string => {
    const match = timeString?.match(/PT(\d+)M/);
    return match ? match[1] : '0';
  };

  const PlayerStatsTable = ({
    players,
    teamAbbr,
  }: {
    players: PlayerStats[];
    teamAbbr: string;
  }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="text-muted-foreground">Player</TableHead>
            <TableHead className="text-center text-muted-foreground">
              MIN
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              PTS
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              REB
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              AST
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              STL
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              BLK
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              TO
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              FG
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              3PT
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              FT
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              +/-
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.personId}
              className="border-border hover:bg-muted/30"
            >
              <TableCell>
                <div>
                  <div className="font-medium">{player.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {player.position}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {extractMinutes(
                  player.statistics.minutesCalculated ||
                    player.statistics.minutes,
                )}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {player.statistics.points}
              </TableCell>
              <TableCell className="text-center">
                {player.statistics.reboundsTotal}
              </TableCell>
              <TableCell className="text-center">
                {player.statistics.assists}
              </TableCell>
              <TableCell className="text-center">
                {player.statistics.steals}
              </TableCell>
              <TableCell className="text-center">
                {player.statistics.blocks}
              </TableCell>
              <TableCell className="text-center">
                {player.statistics.turnovers}
              </TableCell>
              <TableCell className="text-center text-sm">
                {player.statistics.fieldGoalsMade}-
                {player.statistics.fieldGoalsAttempted}
              </TableCell>
              <TableCell className="text-center text-sm">
                {player.statistics.threePointersMade}-
                {player.statistics.threePointersAttempted}
              </TableCell>
              <TableCell className="text-center text-sm">
                {player.statistics.freeThrowsMade}-
                {player.statistics.freeThrowsAttempted}
              </TableCell>
              <TableCell
                className={`text-center font-medium ${
                  player.statistics.plusMinusPoints > 0
                    ? 'text-emerald-400'
                    : player.statistics.plusMinusPoints < 0
                      ? 'text-red-400'
                      : 'text-muted-foreground'
                }`}
              >
                {player.statistics.plusMinusPoints > 0 ? '+' : ''}
                {player.statistics.plusMinusPoints}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {/* Game Header */}
        <Card className="mb-8 border-border bg-card">
          <CardContent className="p-6">
            {/* Date & Venue */}
            <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate} • {formattedTime}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {boxscore.arena.arenaName}
              </div>
              <Badge variant="outline" className="text-xs">
                Attendance: {boxscore.attendance.toLocaleString()}
              </Badge>
            </div>

            {/* Scoreboard */}
            <div className="flex items-center justify-center gap-8 md:gap-16">
              {/* Away Team */}
              <div className="text-center">
                <div className="mb-1 text-lg font-medium text-muted-foreground">
                  {awayTeam.teamTricode}
                </div>
                <div
                  className={`text-4xl font-bold md:text-5xl ${
                    awayTeam.score > homeTeam.score
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {awayTeam.score}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {gameData.away_name}
                </div>
                {awayTeam.score < homeTeam.score && (
                  <Badge
                    variant="outline"
                    className="mt-2 border-red-400/30 text-red-400"
                  >
                    <TrendingDown className="mr-1 h-3 w-3" /> Loss
                  </Badge>
                )}
                {awayTeam.score > homeTeam.score && (
                  <Badge className="mt-2 border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
                    <Trophy className="mr-1 h-3 w-3" /> Win
                  </Badge>
                )}
              </div>

              {/* VS */}
              <div className="text-2xl font-light text-muted-foreground">
                FINAL
              </div>

              {/* Home Team */}
              <div className="text-center">
                <div className="mb-1 text-lg font-medium text-muted-foreground">
                  {homeTeam.teamTricode}
                </div>
                <div
                  className={`text-4xl font-bold md:text-5xl ${
                    homeTeam.score > awayTeam.score
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {homeTeam.score}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {gameData.home_name}
                </div>
                {homeTeam.score < awayTeam.score && (
                  <Badge
                    variant="outline"
                    className="mt-2 border-red-400/30 text-red-400"
                  >
                    <TrendingDown className="mr-1 h-3 w-3" /> Loss
                  </Badge>
                )}
                {homeTeam.score > awayTeam.score && (
                  <Badge className="mt-2 border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
                    <Trophy className="mr-1 h-3 w-3" /> Win
                  </Badge>
                )}
              </div>
            </div>

            {/* Quarter Scores */}
            <div className="mt-8 flex justify-center">
              <div className="rounded-lg bg-muted/30 p-4">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">
                        Team
                      </TableHead>
                      <TableHead className="text-center text-muted-foreground">
                        Q1
                      </TableHead>
                      <TableHead className="text-center text-muted-foreground">
                        Q2
                      </TableHead>
                      <TableHead className="text-center text-muted-foreground">
                        Q3
                      </TableHead>
                      <TableHead className="text-center text-muted-foreground">
                        Q4
                      </TableHead>
                      <TableHead className="text-center font-bold text-muted-foreground">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-border">
                      <TableCell className="font-medium">
                        {awayTeam.teamTricode}
                      </TableCell>
                      {awayTeam.periods
                        .slice(0, 4)
                        .map(
                          (period: {
                            period: number;
                            periodType: string;
                            score: number;
                          }) => (
                            <TableCell
                              key={period.period}
                              className="text-center"
                            >
                              {period.score}
                            </TableCell>
                          ),
                        )}
                      <TableCell className="text-center font-bold">
                        {awayTeam.score}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium">
                        {homeTeam.teamTricode}
                      </TableCell>
                      {homeTeam.periods
                        .slice(0, 4)
                        .map(
                          (period: {
                            period: number;
                            periodType: string;
                            score: number;
                          }) => (
                            <TableCell
                              key={period.period}
                              className="text-center"
                            >
                              {period.score}
                            </TableCell>
                          ),
                        )}
                      <TableCell className="text-center font-bold">
                        {homeTeam.score}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Player Stats Tabs */}
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="border border-border bg-muted/30">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {homeTeam.teamName}
            </TabsTrigger>
            <TabsTrigger
              value="away"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {awayTeam.teamName}
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Team Comparison
            </TabsTrigger>
          </TabsList>

          {/* Home Team Stats */}
          <TabsContent value="home">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {homeTeam.teamName} Player Stats
                  {homeTeam.score > awayTeam.score && (
                    <Badge className="bg-emerald-500/20 text-emerald-400">
                      Winner
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PlayerStatsTable
                  players={homeTeam.players}
                  teamAbbr={homeTeam.teamTricode}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Away Team Stats */}
          <TabsContent value="away">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {awayTeam.teamName} Player Stats
                  {awayTeam.score > homeTeam.score && (
                    <Badge className="bg-emerald-500/20 text-emerald-400">
                      Winner
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PlayerStatsTable
                  players={awayTeam.players}
                  teamAbbr={awayTeam.teamTricode}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Comparison */}
          <TabsContent value="comparison">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Team Statistics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      label: 'Field Goal %',
                      home: homeTeam.statistics.fieldGoalsPercentage,
                      away: awayTeam.statistics.fieldGoalsPercentage,
                      format: (val: number) => val.toFixed(1) + '%',
                    },
                    {
                      label: '3-Point %',
                      home: homeTeam.statistics.threePointersPercentage,
                      away: awayTeam.statistics.threePointersPercentage,
                      format: (val: number) => val.toFixed(1) + '%',
                    },
                    {
                      label: 'Free Throw %',
                      home: homeTeam.statistics.freeThrowsPercentage,
                      away: awayTeam.statistics.freeThrowsPercentage,
                      format: (val: number) => val.toFixed(1) + '%',
                    },
                    {
                      label: 'Rebounds',
                      home: homeTeam.statistics.reboundsTotal,
                      away: awayTeam.statistics.reboundsTotal,
                      format: (val: number) => val.toString(),
                    },
                    {
                      label: 'Assists',
                      home: homeTeam.statistics.assists,
                      away: awayTeam.statistics.assists,
                      format: (val: number) => val.toString(),
                    },
                    {
                      label: 'Turnovers',
                      home: homeTeam.statistics.turnoversTotal,
                      away: awayTeam.statistics.turnoversTotal,
                      format: (val: number) => val.toString(),
                      inverse: true,
                    },
                    {
                      label: 'Steals',
                      home: homeTeam.statistics.steals,
                      away: awayTeam.statistics.steals,
                      format: (val: number) => val.toString(),
                    },
                    {
                      label: 'Blocks',
                      home: homeTeam.statistics.blocks,
                      away: awayTeam.statistics.blocks,
                      format: (val: number) => val.toString(),
                    },
                    {
                      label: 'Points in Paint',
                      home: homeTeam.statistics.pointsInThePaint,
                      away: awayTeam.statistics.pointsInThePaint,
                      format: (val: number) => val.toString(),
                    },
                    {
                      label: 'Fast Break Points',
                      home: homeTeam.statistics.pointsFastBreak,
                      away: awayTeam.statistics.pointsFastBreak,
                      format: (val: number) => val.toString(),
                    },
                  ].map((stat, idx) => {
                    const homeWins = stat.inverse
                      ? stat.home < stat.away
                      : stat.home > stat.away;
                    const awayWins = stat.inverse
                      ? stat.away < stat.home
                      : stat.away > stat.home;
                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-3 items-center gap-4 border-b border-border py-3 last:border-0"
                      >
                        <div
                          className={`text-right font-medium ${
                            homeWins
                              ? 'text-emerald-400'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {stat.format(stat.home)}
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                        <div
                          className={`text-left font-medium ${
                            awayWins
                              ? 'text-emerald-400'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {stat.format(stat.away)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-between border-t border-border pt-4 text-sm text-muted-foreground">
                  <span>{homeTeam.teamTricode}</span>
                  <span>{awayTeam.teamTricode}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default GameBreakdownPage;
