'use client';

import { JSX } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaFacebook } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa6';
import { IoPeopleCircle } from 'react-icons/io5';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TeamStatsChart from '@/components/team/TeamStatsChart';
import { TeamStatsTable } from '@/components/team/TeamStatsTable';
import { ROUTES } from '@/routes';
import apiService from '@/services';
import { ITeamPlayer } from '@/types/player';
import { Button } from '@/ui/button';
import Loader from '@/ui/loader';
import Navigation from '@/components/Navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  MapPin,
  Trophy,
  Users,
} from 'lucide-react';
import Footer from '@/components/Footer';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { Badge } from '@/ui/badge';
import { Player } from '@/types/team';

const TeamPage = () => {
  const params = useParams();
  const teamId = params?.id as string;
  const router = useRouter();

  const {
    data: team,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['team', teamId],
    queryFn: () => apiService.getTeamById(teamId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const winPct = team?.overall_stats
    ? (
        (team?.overall_stats?.W /
          ((team?.overall_stats?.W || 0) + (team?.overall_stats?.L || 0))) *
        100
      ).toFixed(1)
    : null;

  const chartData = team
    ? [
        {
          name: 'PPG',
          value: parseFloat(
            (team.team_statistics.PTS / team.team_statistics.GP).toFixed(1),
          ),
          color: 'hsl(var(--chart-1))',
        },
        {
          name: 'RPG',
          value: parseFloat(
            (team.team_statistics.REB / team.team_statistics.GP).toFixed(1),
          ),
          color: 'hsl(var(--chart-3))',
        },
        {
          name: 'APG',
          value: parseFloat(
            (team.team_statistics.AST / team.team_statistics.GP).toFixed(1),
          ),
          color: 'hsl(var(--chart-4))',
        },
        {
          name: 'FG%',
          value: parseFloat((team.team_statistics.FG_PCT * 100).toFixed(1)),
          color: 'hsl(var(--chart-5))',
        },
        {
          name: '3P%',
          value: parseFloat((team.team_statistics.FG3_PCT * 100).toFixed(1)),
          color: 'hsl(var(--chart-1))',
        },
        {
          name: 'FT%',
          value: parseFloat((team.team_statistics.FT_PCT * 100).toFixed(1)),
          color: 'hsl(var(--chart-2))',
        },
      ]
    : [];
  // const getStatusBadge = (status: Player['status']) => {
  //   switch (status) {
  //     case 'healthy':
  //       return (
  //         <Badge
  //           variant="outline"
  //           className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
  //         >
  //           Healthy
  //         </Badge>
  //       );
  //     case 'questionable':
  //       return (
  //         <Badge
  //           variant="outline"
  //           className="border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
  //         >
  //           Questionable
  //         </Badge>
  //       );
  //     case 'out':
  //       return (
  //         <Badge
  //           variant="outline"
  //           className="border-red-500/30 bg-red-500/10 text-red-400"
  //         >
  //           Out
  //         </Badge>
  //       );
  //   }
  // };

  // const injuries = team.roster.filter((p) => p.status !== 'healthy');

  if (!team) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="mb-4 text-2xl font-bold">Team not found</h1>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-6 py-24">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="mb-8">
          <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-center">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-2xl text-4xl font-bold"
              style={{
                backgroundColor: '#1e293b20',
                border: '2px solid #1e293b',
              }}
            >
              {team.abbreviation}
            </div>
            <div className="flex-1">
              <h1 className="mb-2 font-display text-3xl font-bold md:text-4xl">
                {team.full_name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {team.city}
                </span>
                <span>{team?.conference} Conference</span>
                <span>{team?.division} Division</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">
                {team.overall_stats.W}-{team.overall_stats.L}
              </div>
              <div className="text-muted-foreground">{winPct}% Win Rate</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="border-border bg-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {(team.overall_stats.PTS / team.overall_stats.GP).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">PPG</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {(team.overall_stats.REB / team.overall_stats.GP).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">RPG</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {(team.overall_stats.AST / team.overall_stats.GP).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">APG</div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {(team.overall_stats.FG_PCT * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">FG%</div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview" className="mt-4 space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:inline-grid lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Team Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded</span>
                    <span>{team.year_founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Arena</span>
                    <span>{team.arena}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity</span>
                    <span>{team.arena_capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coach</span>
                    <span>{team.head_coach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GM</span>
                    <span>{team.general_manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner</span>
                    <span>{team.owner}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Injury Report */}
              {/* <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  Injury Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                {injuries.length > 0 ? (
                  <div className="space-y-4">
                    {injuries.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {player.injury}
                          </div>
                        </div>
                        {getStatusBadge(player.status)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-4 text-center text-muted-foreground">
                    No injuries reported
                  </p>
                )}
              </CardContent>
            </Card> */}

              {/* Upcoming Games */}
              {/* <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Games
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingGames.slice(0, 3).map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
                    >
                      <div>
                        <div className="font-medium">
                          {game.location === 'home' ? 'vs' : '@'}{' '}
                          {game.opponent}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {game.date} • {game.time}
                        </div>
                      </div>
                      <Badge variant="outline">
                        {game.location === 'home' ? 'Home' : 'Away'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
            </div>

            {/* Recent Results */}
            {/* <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {recentGames.map((game) => (
                  <div
                    key={game.id}
                    className={`flex min-w-[180px] flex-col rounded-lg border p-4 ${
                      game.result?.win
                        ? 'border-emerald-500/30 bg-emerald-500/10'
                        : 'border-red-500/30 bg-red-500/10'
                    }`}
                  >
                    <div className="mb-2 text-xs text-muted-foreground">
                      {game.date}
                    </div>
                    <div className="flex flex-1 items-center gap-3">
                      <div
                        className={`text-2xl font-bold ${game.result?.win ? 'text-emerald-400' : 'text-red-400'}`}
                      >
                        {game.result?.win ? 'W' : 'L'}
                      </div>
                      <div>
                        <div className="font-medium">
                          {game.location === 'home' ? 'vs' : '@'}{' '}
                          {game.opponent}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {game.result?.teamScore} -{' '}
                          {game.result?.opponentScore}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 w-full text-xs hover:bg-background/50"
                      onClick={() => navigate(`/game/${team.id}-${game.id}`)}
                    >
                      View Game Breakdown
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
          </TabsContent>
          <TabsContent value="roster">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Active Roster
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Height</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Exp</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {team.player_statistics.map((player) => (
                        <TableRow
                          key={player.PLAYER_ID}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() =>
                            router.push(`/player/${player.PLAYER_ID}`)
                          }
                        >
                          <TableCell className="font-medium">
                            {player.NUM}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {player.PLAYER}
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TableCell>
                          <TableCell>{player.POSITION}</TableCell>
                          <TableCell>{player.HEIGHT}</TableCell>
                          <TableCell>{player.WEIGHT} lbs</TableCell>
                          <TableCell>{player.AGE}</TableCell>
                          <TableCell>{player.EXP}</TableCell>
                          {/* <TableCell>{getStatusBadge(player.status)}</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Team Overview</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Full season summary
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Detailed Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Team</TableHead>
                        <TableHead>GP</TableHead>
                        <TableHead>W</TableHead>
                        <TableHead>L</TableHead>
                        <TableHead>PPG</TableHead>
                        <TableHead>OPPG</TableHead>
                        <TableHead>RPG</TableHead>
                        <TableHead>APG</TableHead>
                        <TableHead>FG%</TableHead>
                        <TableHead>3P%</TableHead>
                        <TableHead>FT%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          {team.abbreviation}
                        </TableCell>
                        <TableCell>{team.team_statistics.GP}</TableCell>
                        <TableCell className="text-emerald-400">
                          {team.team_statistics.W}
                        </TableCell>
                        <TableCell className="text-red-400">
                          {team.team_statistics.L}
                        </TableCell>
                        <TableCell>
                          {(
                            team.team_statistics.PTS / team.team_statistics.GP
                          ).toFixed(1)}
                        </TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                          {(
                            team.team_statistics.REB / team.team_statistics.GP
                          ).toFixed(1)}
                        </TableCell>
                        <TableCell>
                          {(
                            team.team_statistics.AST / team.team_statistics.GP
                          ).toFixed(1)}
                        </TableCell>
                        <TableCell>
                          {(team.team_statistics.FG_PCT * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          {(team.team_statistics.FG3_PCT * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          {(team.team_statistics.FT_PCT * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

{
  /* </div>
    </div>
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center gap-1.5">

              <IoPeopleCircle className="h-14 w-14" />
            <h1 className="text-3xl font-bold">{team.full_name}</h1>
            <p className="text-sm text-gray-400">
              {team.nickname} ({team.abbreviation})
            </p>
          </div>

          <div className="my-10 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-1 space-y-4">
              <div className="rounded-lg bg-[#1A1A1A] p-4">
                <h2 className="mb-2 text-xl font-semibold">Team Info</h2>
                <p>
                  <strong>City:</strong> {team.city}, {team.state}
                </p>
                <p>
                  <strong>Founded:</strong> {team.year_founded}
                </p>
                <p>
                  <strong>Arena:</strong> {team.arena} ({team.arena_capacity} seats)
                </p>
                <p>
                  <strong>Owner:</strong> {team.owner}
                </p>
                <p>
                  <strong>GM:</strong> {team.general_manager}
                </p>
                <p>
                  <strong>Coach:</strong> {team.head_coach}
                </p>
                <p>
                  <strong>Affiliate:</strong> {team.d_league_affiliation}
                </p>
              </div>

              <div className="rounded-lg bg-[#1A1A1A] p-4">
                <h2 className="mb-2 text-xl font-semibold">Social Media</h2>
                <ul className="space-y-1">
                  {Object.entries(team.social_media).map(([platform, url]) => (
                    <li key={platform} className="flex items-center">
                      <Link href={url} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="link"
                          className="text-text-primary flex items-center p-0"
                        >
                          {SOCIAL_ICONS[platform] ?? null}
                          {platform}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-[#1A1A1A] p-4">
                <h2 className="mb-2 text-xl font-semibold">
                  Stats (Season {team.team_statistics.GROUP_VALUE})
                </h2>
                <p>
                  <strong>Games Played:</strong> {team.team_statistics.GP}
                </p>
                <p>
                  <strong>Wins:</strong> {team.team_statistics.W}
                </p>
                <p>
                  <strong>Losses:</strong> {team.team_statistics.L}
                </p>
                <p>
                  <strong>Win %:</strong>{' '}
                  {(team.team_statistics.W_PCT * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="col-span-2">
              <h2 className="mb-4 text-2xl font-bold">Players</h2>
              <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {team.player_statistics.map((player) => (
                  <Link
                    href={ROUTES.PLAYER(String(player.PLAYER_ID))}
                    key={player.PLAYER_ID}
                  >
                    <PlayerCard player={player} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="my-10 min-h-[244px] w-full min-w-[374px]">
            <TeamStatsChart stats={team?.team_statistics} />
          </div>

          <div className="w-full">
            <div className="rounded-lg border border-border bg-[#1A1A1A] p-4">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Overall Statistic
              </h3>

              <TeamStatsTable
                stats={[
                  {
                    logo: team.logo,
                    name: team.nickname,
                    stats: team.team_statistics,
                  },
                ]}
              />
            </div>
          </div>
        </div> 
        
        {/* // interface IPlayerCard {
//   player: ITeamPlayer;
// }

// const PlayerCard = ({ player }: IPlayerCard) => {
//   return (
//     <div
//       key={player.PLAYER_ID}
//       className="flex h-full flex-col items-center gap-2 rounded-lg bg-[#111] p-4 shadow-md transition hover:shadow-lg"
//     >
//       <FaCircleUser className="h-10 w-10" />

//       <div className="flex w-full flex-col items-start gap-1">
//         <div className="mb-2 flex w-full items-center justify-between">
//           <h3 className="text-lg font-semibold">{player.PLAYER}</h3>
//           <span className="text-sm text-gray-400">#{player.NUM}</span>
//         </div>

//         <p className="text-sm text-gray-300">{player.POSITION}</p>
//         <p className="text-sm text-gray-500">
//           {player.HEIGHT}, {player.WEIGHT} lbs
//         </p>
//         <p className="text-sm text-gray-400">
//           Age: {player.AGE} | Exp: {player.EXP}
//         </p>
//         <p className="mt-1 text-xs text-gray-500">{player.HOW_ACQUIRED}</p>
//       </div>
//     </div>
//   );
// }; */
}

export default TeamPage;
