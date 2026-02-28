"use client";

import { useMemo, useState } from "react";
import React from "react";
import { Outfit } from "next/font/google";
import { useParams, useRouter } from "next/navigation";

import { usePlayer } from "@/modules/player/hooks";
import Loader from "@/shared/components/loader";
import { EmptyPlaceholder } from "@/shared/components";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/avatar";
import {
  ArrowLeft,
  Calendar,
  Filter,
  TrendingUp,
  Trophy,
  User,
} from "lucide-react";
import Navigation from "@/shared/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { Button } from "@/shared/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/dropdown-menu";
import { Checkbox } from "@/shared/components/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/shared/components/badge";
import Footer from "@/shared/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type TimelineFilter = "7days" | "30days" | "season";
type PropKey =
  | "Points"
  | "Assists"
  | "Rebounds"
  | "Blocks"
  | "Steals"
  | "Turnovers"
  | "Minutes"
  | "3PM"
  | "3PA"
  | "3P%"
  | "FGM"
  | "FGA"
  | "FG%"
  | "FTM"
  | "FTA"
  | "FT%"
  | "OREB"
  | "DREB"
  | "Personal Fouls"
  | "Games Played"
  | "Games Started";

const propColors: Record<PropKey, string> = {
  Points: "hsl(270, 90%, 65%)",
  Assists: "hsl(180, 100%, 50%)",
  Rebounds: "hsl(35, 90%, 55%)",
  Blocks: "hsl(145, 70%, 50%)",
  Steals: "hsl(320, 70%, 60%)",
  Turnovers: "hsl(0, 70%, 60%)",
  Minutes: "hsl(200, 70%, 60%)",
  "3PM": "hsl(280, 70%, 60%)",
  "3PA": "hsl(285, 60%, 55%)",
  "3P%": "hsl(290, 70%, 60%)",
  FGM: "hsl(60, 70%, 60%)",
  FGA: "hsl(65, 60%, 55%)",
  "FG%": "hsl(70, 70%, 60%)",
  FTM: "hsl(120, 70%, 60%)",
  FTA: "hsl(125, 60%, 55%)",
  "FT%": "hsl(130, 70%, 60%)",
  OREB: "hsl(30, 70%, 60%)",
  DREB: "hsl(40, 70%, 60%)",
  "Personal Fouls": "hsl(350, 70%, 60%)",
  "Games Played": "hsl(210, 70%, 60%)",
  "Games Started": "hsl(220, 70%, 60%)",
};

const propLabels: PropKey[] = [
  "Points",
  "Assists",
  "Rebounds",
  "Blocks",
  "Steals",
  "Turnovers",
  "Minutes",
  "3PM",
  "3PA",
  "3P%",
  "FGM",
  "FGA",
  "FG%",
  "FTM",
  "FTA",
  "FT%",
  "OREB",
  "DREB",
  "Personal Fouls",
  "Games Played",
  "Games Started",
];

const PlayerProfile = () => {
  const [isLastGames, setIsLastGames] = useState(false);
  const params = useParams();
  const playerId = params?.id as string;

  const {
    data: player,
    playerNameData,
    playerSeason,
    error,
    isLoading,
  } = usePlayer(playerId as string);

  const { profile } = playerNameData || {};

  const router = useRouter();
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>("7days");
  const [selectedProps, setSelectedProps] = useState<PropKey[]>([
    "Points",
    "Assists",
    "Rebounds",
  ]);

  const seasonText = (() => {
    if (playerNameData?.season_stats?.SEASON_ID?.includes("-"))
      return playerNameData?.season_stats?.SEASON_ID?.replace("-", " - ");
    const currentYear = new Date().getFullYear();
    return `${currentYear}`;
  })();

  const statOrder: { key: string; label: string }[] = [
    { key: "PPG", label: "PPG" },
    { key: "RPG", label: "RPG" },
    { key: "APG", label: "APG" },
    { key: "SPG", label: "SPG" },
    { key: "BPG", label: "BPG" },
    { key: "FG%", label: "FG%" },
    { key: "FT%", label: "FT%" },
    { key: "TS%", label: "TS%" },
    { key: "3P%", label: "3P%" },
    { key: "MPG", label: "MPG" },
  ];

  const normalize = (v: string | number | undefined, isPercentage = false) => {
    if (v === undefined || v === null) return "-";
    const n = typeof v === "string" ? Number(v) : v;
    if (!Number.isFinite(n)) return String(v);
    // Percentages in season_stats are already formatted (e.g., "48.5")
    return typeof v === "string" ? v : n.toFixed(1);
  };

  // const playerInfo = playerId ? player[playerId] : null;

  const toggleProp = (prop: PropKey) => {
    setSelectedProps((prev) =>
      prev.includes(prop) ? prev.filter((p) => p !== prop) : [...prev, prop],
    );
  };

  const selectAllProps = () => {
    setSelectedProps([...propLabels]);
  };

  const careerTrend = useMemo(() => {
    if (!player?.player_stats || !Array.isArray(player.player_stats)) {
      return [];
    }

    return player.player_stats
      .map((season: any) => {
        return {
          season: season.SEASON_ID || "",
          points: season.PTS ? Number(season.PTS) : 0,
          assists: season.AST ? Number(season.AST) : 0,
          rebounds: season.REB ? Number(season.REB) : 0,
          blocks: season.BLK ? Number(season.BLK) : 0,
          steals: season.STL ? Number(season.STL) : 0,
          turnovers: season.TOV ? Number(season.TOV) : 0,
          minutes: season.MIN ? Number(season.MIN) : 0,
          threePointsMade: season.FG3M ? Number(season.FG3M) : 0,
          threePointsAttempted: season.FG3A ? Number(season.FG3A) : 0,
          threePointPct: season.FG3_PCT ? Number(season.FG3_PCT) : 0,
          fieldGoalsMade: season.FGM ? Number(season.FGM) : 0,
          fieldGoalsAttempted: season.FGA ? Number(season.FGA) : 0,
          fieldGoalPct: season.FG_PCT ? Number(season.FG_PCT) : 0,
          freeThrowsMade: season.FTM ? Number(season.FTM) : 0,
          freeThrowsAttempted: season.FTA ? Number(season.FTA) : 0,
          freeThrowPct: season.FT_PCT ? Number(season.FT_PCT) : 0,
          offensiveRebounds: season.OREB ? Number(season.OREB) : 0,
          defensiveRebounds: season.DREB ? Number(season.DREB) : 0,
          personalFouls: season.PF ? Number(season.PF) : 0,
          gamesPlayed: season.GP ? Number(season.GP) : 0,
          gamesStarted: season.GS ? Number(season.GS) : 0,
        };
      })
      .sort((a: any, b: any) => a.season.localeCompare(b.season));
  }, [player]);

  const filteredGames = useMemo(() => {
    if (!playerSeason || !Array.isArray(playerSeason)) return [];

    let filtered = [...playerSeason];

    if (timelineFilter === "7days") {
      filtered = filtered.slice(0, 7);
    } else if (timelineFilter === "30days") {
      filtered = filtered.slice(0, 30);
    }

    return filtered;
  }, [playerSeason, timelineFilter]);

  const groupedGames = useMemo(() => {
    if (!filteredGames || filteredGames.length === 0) return [];

    const map = new Map<
      string,
      { title: string; average?: any; games: any[] }
    >();
    const order: string[] = [];

    for (const g of filteredGames) {
      if (!g || typeof g !== "object") continue;

      const key = (g.title && String(g.title)) || "Unknown";
      if (!map.has(key)) {
        map.set(key, { title: key, games: [] });
        order.push(key);
      }
      const group = map.get(key)!;

      const dateStr = (g.date ?? "").toString().trim().toLowerCase();
      const isAverage = dateStr === "average";

      if (isAverage) group.average = g;
      else group.games.push(g);
    }

    return order.map((k) => map.get(k)!);
  }, [filteredGames]);

  // const filteredGames = useMemo(() => {
  //   if (!player) return [];
  //   const now = new Date();
  //   return player.playerSeason.filter((_: any, index: any) => {
  //     if (timelineFilter === '7days') return index < 3;
  //     if (timelineFilter === '30days') return index < 5;
  //     return true;
  //   });
  // }, [player, timelineFilter]);

  // const monthlyAverages = useMemo(() => {
  //   if (!player || player.sport !== 'NBA') return {};
  //   const grouped: Record<string, Record<string, number>[]> = {};
  //   player.playerSeason.forEach((game: any) => {
  //     if (!grouped[game.month]) grouped[game.month] = [];
  //     grouped[game.month].push(game);
  //   });

  //   const averages: Record<string, Record<string, number>> = {};
  //   Object.entries(grouped).forEach(([month, games]) => {
  //     averages[month] = {
  //       pts: +(games.reduce((sum, g) => sum + g.pts, 0) / games.length).toFixed(
  //         1,
  //       ),
  //       reb: +(games.reduce((sum, g) => sum + g.reb, 0) / games.length).toFixed(
  //         1,
  //       ),
  //       ast: +(games.reduce((sum, g) => sum + g.ast, 0) / games.length).toFixed(
  //         1,
  //       ),
  //     };
  //   });
  //   return averages;
  // }, [player]);

  if (isLoading) {
    return (
      <Loader
        size="h-14 w-14"
        className="flex h-[70vh] w-full items-center justify-center"
      />
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <EmptyPlaceholder
          title="Something went wrong"
          subtitle="We couldn't load this player. Please try again later."
        />
        <Footer />
      </>
    );
  }

  if (!player && !playerNameData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="mb-4 text-2xl font-bold">Player not found</h1>
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

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {/* Player Header */}
        <div className="mb-8 flex flex-col gap-8 lg:flex-row">
          {/* Profile Info */}
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <Avatar className="h-32 w-32 border-4 border-primary/30 shadow-lg">
              <AvatarImage src={undefined} alt={player.full_name} />
              <AvatarFallback className="bg-primary/10 text-4xl font-bold text-primary">
                {player.full_name
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="text-center lg:text-left">
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground lg:text-4xl">
                {player.full_name}
              </h1>
              <p className="mb-4 text-lg text-muted-foreground">
                {playerNameData?.team_details?.[0]?.full_name || "N/A"}
              </p>
              <Badge variant="outline" className="border-primary text-primary">
                NBA
              </Badge>
            </div>
            <div className="grid w-full max-w-md grid-cols-3 gap-3">
              <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-center">
                <span className="text-sm font-semibold text-primary">
                  {player?.POSITION ||
                    playerNameData?.profile?.Position ||
                    "N/A"}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">Position</p>
              </div>
              {(player?.NUM || playerNameData?.profile?.Number) && (
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-center">
                  <span className="text-sm font-semibold text-primary">
                    {player?.NUM || playerNameData?.profile?.Number}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">Number</p>
                </div>
              )}
              {(() => {
                const birthDateKey =
                  profile &&
                  Object.keys(profile).find((key) =>
                    /\w+\s+\d{1,2},\s+\d{4}/.test(key),
                  );
                const birthDate = player?.BIRTH_DATE || birthDateKey;

                return birthDate ? (
                  <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-center">
                    <span className="text-sm font-semibold text-primary">
                      {player?.BIRTH_DATE
                        ? new Date(player.BIRTH_DATE).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : birthDateKey}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Birthday
                    </p>
                  </div>
                ) : null;
              })()}
              {(player?.HEIGHT || playerNameData?.profile?.Height) && (
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-center">
                  <span className="text-sm font-semibold text-primary">
                    {player?.HEIGHT || playerNameData?.profile?.Height}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">Height</p>
                </div>
              )}
              {(player?.WEIGHT || playerNameData?.profile?.Weight) && (
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-center">
                  <span className="text-sm font-semibold text-primary">
                    {player?.WEIGHT || playerNameData?.profile?.Weight}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">Weight</p>
                </div>
              )}
              {(player?.EXP || playerNameData?.profile?.Experience) && (
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-center">
                  <span className="text-sm font-semibold text-primary">
                    {player?.EXP || playerNameData?.profile?.Experience} yrs
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Experience
                  </p>
                </div>
              )}
            </div>
            {/* <div className="flex flex-wrap gap-2">
                 {player.achievements.map((achievement, index) => (
                   <Badge
                     key={index}
                     className="border-0 bg-primary/20 text-primary"
                   >
                     <Trophy className="mr-1 h-3 w-3" /> {achievement}
                   </Badge>
                 ))}
               </div> */}
          </div>

          {/* Recent Games */}
          <Card className="flex-1 border-border bg-card">
            <CardHeader className="pb-4">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  Recent Games
                </CardTitle>
                <Select
                  value={timelineFilter}
                  onValueChange={(v: TimelineFilter) => setTimelineFilter(v)}
                >
                  <SelectTrigger className="w-[140px] border-border bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="season">Full Season</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {groupedGames.length === 0 ? (
                <div className="px-4 py-6 text-center text-[14px] text-[#BDBDBD]">
                  No games to display yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">
                          Date
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Opponent
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Result
                        </TableHead>
                        <TableHead className="text-right text-muted-foreground">
                          PTS
                        </TableHead>
                        <TableHead className="text-right text-muted-foreground">
                          REB
                        </TableHead>
                        <TableHead className="text-right text-muted-foreground">
                          AST
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedGames.map((group, gi) => (
                        <React.Fragment key={`${group.title}-${gi}`}>
                          {/* Average Row */}
                          <TableRow className="border-border bg-secondary/50">
                            <TableCell className="font-medium text-foreground">
                              Average
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {group.title}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {group.average?.PTS ?? "-"}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {group.average?.REB ?? "-"}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {group.average?.AST ?? "-"}
                            </TableCell>
                          </TableRow>
                          {/* Games */}
                          {group.games.map((game, index) => (
                            <TableRow
                              key={`${group.title}-game-${index}-${game?.date ?? index}`}
                              className="border-border"
                            >
                              <TableCell className="text-foreground">
                                {game?.date ?? "-"}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {game?.opponent ?? "-"}
                              </TableCell>
                              <TableCell
                                className={
                                  (game?.result ?? "").startsWith("W")
                                    ? "text-[#34D399]"
                                    : (game?.result ?? "").startsWith("L")
                                      ? "text-[#DC2626]"
                                      : "text-white"
                                }
                              >
                                {game?.result ?? "-"}
                              </TableCell>
                              <TableCell className="text-right text-foreground">
                                {game?.PTS ?? "-"}
                              </TableCell>
                              <TableCell className="text-right text-foreground">
                                {game?.REB ?? "-"}
                              </TableCell>
                              <TableCell className="text-right text-foreground">
                                {game?.AST ?? "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              {`${seasonText} Season Stats `}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    {statOrder.map((stat) => (
                      <TableHead
                        key={stat.key}
                        className="text-muted-foreground"
                      >
                        {stat.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-border">
                    {statOrder.map(({ key, label }) => {
                      const raw = playerNameData?.season_stats?.[key];
                      return (
                        <TableCell
                          key={key}
                          className="font-semibold text-primary"
                        >
                          {normalize(raw)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Career Performance Trend
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Showing career statistics per game
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Filter Stats
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Select Statistics</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <Checkbox
                    checked={selectedProps.length === propLabels.length}
                    onCheckedChange={selectAllProps}
                    className="mr-2"
                  />
                  Select All
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {propLabels.map((label) => (
                  <DropdownMenuItem
                    key={label}
                    onClick={(e) => e.preventDefault()}
                  >
                    <Checkbox
                      checked={selectedProps.includes(label)}
                      onCheckedChange={() => toggleProp(label)}
                      className="mr-2"
                    />
                    <span>{label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            {careerTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={careerTrend}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="season"
                    stroke="#9CA3AF"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#F3F4F6" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  {selectedProps.includes("Points") && (
                    <Line
                      type="monotone"
                      dataKey="points"
                      stroke={propColors["Points"]}
                      strokeWidth={2}
                      name="Points"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("Assists") && (
                    <Line
                      type="monotone"
                      dataKey="assists"
                      stroke={propColors["Assists"]}
                      strokeWidth={2}
                      name="Assists"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("Rebounds") && (
                    <Line
                      type="monotone"
                      dataKey="rebounds"
                      stroke={propColors["Rebounds"]}
                      strokeWidth={2}
                      name="Rebounds"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("Blocks") && (
                    <Line
                      type="monotone"
                      dataKey="blocks"
                      stroke={propColors["Blocks"]}
                      strokeWidth={2}
                      name="Blocks"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("Steals") && (
                    <Line
                      type="monotone"
                      dataKey="steals"
                      stroke={propColors["Steals"]}
                      strokeWidth={2}
                      name="Steals"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("Turnovers") && (
                    <Line
                      type="monotone"
                      dataKey="turnovers"
                      stroke={propColors["Turnovers"]}
                      strokeWidth={2}
                      name="Turnovers"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("Minutes") && (
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      stroke={propColors["Minutes"]}
                      strokeWidth={2}
                      name="Minutes"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("3PM") && (
                    <Line
                      type="monotone"
                      dataKey="threePointsMade"
                      stroke={propColors["3PM"]}
                      strokeWidth={2}
                      name="3PM"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("3PA") && (
                    <Line
                      type="monotone"
                      dataKey="threePointsAttempted"
                      stroke={propColors["3PA"]}
                      strokeWidth={2}
                      name="3PA"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("3P%") && (
                    <Line
                      type="monotone"
                      dataKey="threePointPct"
                      stroke={propColors["3P%"]}
                      strokeWidth={2}
                      name="3P%"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("FGM") && (
                    <Line
                      type="monotone"
                      dataKey="fieldGoalsMade"
                      stroke={propColors["FGM"]}
                      strokeWidth={2}
                      name="FGM"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("FGA") && (
                    <Line
                      type="monotone"
                      dataKey="fieldGoalsAttempted"
                      stroke={propColors["FGA"]}
                      strokeWidth={2}
                      name="FGA"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("FG%") && (
                    <Line
                      type="monotone"
                      dataKey="fieldGoalPct"
                      stroke={propColors["FG%"]}
                      strokeWidth={2}
                      name="FG%"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("FTM") && (
                    <Line
                      type="monotone"
                      dataKey="freeThrowsMade"
                      stroke={propColors["FTM"]}
                      strokeWidth={2}
                      name="FTM"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("FTA") && (
                    <Line
                      type="monotone"
                      dataKey="freeThrowsAttempted"
                      stroke={propColors["FTA"]}
                      strokeWidth={2}
                      name="FTA"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("FT%") && (
                    <Line
                      type="monotone"
                      dataKey="freeThrowPct"
                      stroke={propColors["FT%"]}
                      strokeWidth={2}
                      name="FT%"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("OREB") && (
                    <Line
                      type="monotone"
                      dataKey="offensiveRebounds"
                      stroke={propColors["OREB"]}
                      strokeWidth={2}
                      name="OREB"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("DREB") && (
                    <Line
                      type="monotone"
                      dataKey="defensiveRebounds"
                      stroke={propColors["DREB"]}
                      strokeWidth={2}
                      name="DREB"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("Personal Fouls") && (
                    <Line
                      type="monotone"
                      dataKey="personalFouls"
                      stroke={propColors["Personal Fouls"]}
                      strokeWidth={2}
                      name="Personal Fouls"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("Games Played") && (
                    <Line
                      type="monotone"
                      dataKey="gamesPlayed"
                      stroke={propColors["Games Played"]}
                      strokeWidth={2}
                      name="Games Played"
                      dot={{ r: 3 }}
                    />
                  )}
                  {selectedProps.includes("Games Started") && (
                    <Line
                      type="monotone"
                      dataKey="gamesStarted"
                      stroke={propColors["Games Started"]}
                      strokeWidth={2}
                      name="Games Started"
                      dot={{ r: 3 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                No career data available
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default PlayerProfile;
