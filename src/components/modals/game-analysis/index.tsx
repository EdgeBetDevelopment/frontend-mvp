"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  Target,
  Users,
  Activity,
  Shield,
  Zap,
  ChevronRight,
} from "lucide-react";

import { useStore } from "@/store";
import { Badge } from "@/ui/badge";
import { Card } from "@/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { getTeamInfoByName } from "@/utils/team";
import {
  formatUtcToLocalDate,
  formatUtcToLocalTimeAmPm,
  getStatusColor,
} from "@/utils";

interface IGameAnalysisModal {
  open: boolean;
  onClose: () => void;
}

const GameAnalysisModal = ({ open, onClose }: IGameAnalysisModal) => {
  const { selectedGame: game } = useStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const predictedWinnerInfo = React.useMemo(() => {
    if (!game?.prediction?.predicted_winner || !game?.game) return null;
    try {
      return getTeamInfoByName(game?.prediction?.predicted_winner, game?.game);
    } catch (error) {
      console.error("Error getting predicted winner info:", error);
      return null;
    }
  }, [game?.prediction?.predicted_winner, game?.game]);

  const favoriteTeamInfo = React.useMemo(() => {
    if (!game?.prediction?.favorite_team || !game?.game) return null;
    try {
      return getTeamInfoByName(game?.prediction?.favorite_team, game?.game);
    } catch (error) {
      console.error("Error getting favorite team info:", error);
      return null;
    }
  }, [game?.prediction?.favorite_team, game?.game]);

  if (!isClient || !game) {
    return null;
  }

  const analysis = game.prediction?.analysis;
  const overview = analysis?.overview || [];
  const homeTeamAnalysis = analysis?.home_team_analysis;
  const awayTeamAnalysis = analysis?.away_team_analysis;
  const riskFactors = analysis?.risk_factors || [];
  const homeInjuries = homeTeamAnalysis?.injuries || "";
  const awayInjuries = awayTeamAnalysis?.injuries || "";
  const homeKeyStrengths = homeTeamAnalysis?.key_strengths || [];
  const awayKeyStrengths = awayTeamAnalysis?.key_strengths || [];

  const homeTeamName = game?.game?.home_team;
  const awayTeamName = game?.game?.away_team;
  const gameDate = formatUtcToLocalDate(game?.game?.start_time);
  const gameTime = formatUtcToLocalTimeAmPm(game?.game?.start_time);

  // Calculate point differentials
  const homeWinProb = game.prediction?.win_probability_home || 0;
  const awayWinProb = game.prediction?.win_probability_away || 0;

  return (
    <Dialog key={game?.game?.id} open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[95vw] gap-0 overflow-hidden p-0 sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl">
        {/* Header */}
        <DialogHeader className="border-b border-border bg-gradient-to-r from-card to-secondary/30 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex w-full items-center gap-2 overflow-hidden sm:w-auto sm:gap-4">
              <div className="flex items-center gap-2 overflow-hidden sm:gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/20 sm:h-10 sm:w-10">
                  {game?.game?.home_team_logo ? (
                    <img
                      src={game?.game?.home_team_logo}
                      alt={homeTeamName}
                      className="h-6 w-6 object-contain sm:h-8 sm:w-8"
                    />
                  ) : (
                    <span className="text-base font-bold text-primary sm:text-lg">
                      {homeTeamName.charAt(0)}
                    </span>
                  )}
                </div>
                <DialogTitle className="min-w-0 truncate font-display text-base sm:text-lg md:text-xl">
                  <span className="hidden sm:inline">
                    {homeTeamName}{" "}
                    <span className="font-normal text-muted-foreground">
                      vs
                    </span>{" "}
                    {awayTeamName}
                  </span>
                  <span className="truncate sm:hidden">
                    {homeTeamName.split(" ").pop()}{" "}
                    <span className="font-normal text-muted-foreground">
                      vs
                    </span>{" "}
                    {awayTeamName.split(" ").pop()}
                  </span>
                </DialogTitle>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/20 sm:h-10 sm:w-10">
                  {game?.game?.away_team_logo ? (
                    <img
                      src={game?.game?.away_team_logo}
                      alt={awayTeamName}
                      className="h-6 w-6 object-contain sm:h-8 sm:w-8"
                    />
                  ) : (
                    <span className="text-base font-bold text-primary sm:text-lg">
                      {awayTeamName.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-4 sm:text-sm">
              <span className="flex items-center gap-1 sm:gap-1.5">
                <Calendar className="h-4 w-4" />
                {gameDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {gameTime}
              </span>
              <Badge
                variant="outline"
                className="border-primary/30 bg-primary/10 text-primary"
              >
                {game?.game?.status === "scheduled"
                  ? "Scheduled"
                  : game?.game?.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-80px)]">
          <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            {/* Predicted Winner & Key Stats Row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
              <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Predicted Winner
                  </span>
                </div>
                <p className="break-words font-display text-xl font-bold text-primary sm:text-2xl">
                  {predictedWinnerInfo?.name ||
                    game.prediction?.predicted_winner ||
                    "N/A"}
                </p>
              </Card>
              <Card className="overflow-hidden border-border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-sm font-medium text-muted-foreground">
                    {homeTeamName}
                  </span>
                </div>
                <p className="text-xl font-semibold">
                  {homeWinProb.toFixed(1)}%
                </p>
                <p className="text-sm text-primary">Win Probability</p>
              </Card>
              <Card className="overflow-hidden border-border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-sm font-medium text-muted-foreground">
                    {awayTeamName}
                  </span>
                </div>
                <p className="text-xl font-semibold">
                  {awayWinProb.toFixed(1)}%
                </p>
                <p className="text-sm text-primary">Win Probability</p>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="w-full flex-nowrap justify-start overflow-x-auto bg-secondary/30 p-1">
                <TabsTrigger
                  value="analysis"
                  className="flex shrink-0 items-center gap-1 text-xs sm:gap-2 sm:text-sm"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Analysis</span>
                </TabsTrigger>
                <TabsTrigger
                  value="bets"
                  className="flex shrink-0 items-center gap-1 text-xs sm:gap-2 sm:text-sm"
                >
                  <Zap className="h-4 w-4" />
                  <span className="hidden sm:inline">Betting Picks</span>
                  <span className="sm:hidden">Bets</span>
                </TabsTrigger>
                <TabsTrigger
                  value="injuries"
                  className="flex shrink-0 items-center gap-1 text-xs sm:gap-2 sm:text-sm"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Injury Report</span>
                  <span className="sm:hidden">Injuries</span>
                </TabsTrigger>
              </TabsList>

              {/* Analysis Tab */}
              <TabsContent value="analysis" className="mt-4 space-y-4">
                {/* Game Overview */}
                {overview.length > 0 && (
                  <Card className="overflow-hidden p-4">
                    <h3 className="mb-3 flex items-center gap-2 font-semibold">
                      <Shield className="h-4 w-4 shrink-0 text-primary" />
                      Game Overview
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {overview.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Team Analysis Side by Side */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Home Team */}
                  <Card className="overflow-hidden border-l-4 border-l-primary p-4">
                    <h3 className="mb-3 break-words font-semibold">
                      {homeTeamName} Analysis
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Injuries
                        </span>
                        <p className="mt-1 break-words text-sm">
                          {homeInjuries || "No injuries reported"}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Key Strengths
                        </span>
                        <ul className="mt-1 space-y-1">
                          {homeKeyStrengths.map((s, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="shrink-0 text-primary">•</span>
                              <span className="break-words">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* Away Team */}
                  <Card className="overflow-hidden border-l-4 border-l-secondary p-4">
                    <h3 className="mb-3 break-words font-semibold">
                      {awayTeamName} Analysis
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Injuries
                        </span>
                        <p className="mt-1 break-words text-sm">
                          {awayInjuries || "No injuries reported"}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Key Strengths
                        </span>
                        <ul className="mt-1 space-y-1">
                          {awayKeyStrengths.map((s, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="shrink-0 text-secondary-foreground">
                                •
                              </span>
                              <span className="break-words">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Risk Factors */}
                {riskFactors.length > 0 && (
                  <Card className="overflow-hidden border-destructive/20 bg-destructive/5 p-4">
                    <h3 className="mb-3 flex items-center gap-2 font-semibold text-destructive">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      Risk Factors
                    </h3>
                    <ul className="space-y-2">
                      {riskFactors.map((risk, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="shrink-0 text-destructive">⚠</span>
                          <span className="break-words">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </TabsContent>

              {/* Betting Picks Tab */}
              <TabsContent value="bets" className="mt-4 space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Value Bets */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      Top 3 Value Bets
                    </h3>
                    <div className="space-y-3">
                      {game.prediction?.value_bets &&
                      game?.prediction?.value_bets?.length > 0 ? (
                        game?.prediction?.value_bets
                          .slice(0, 3)
                          .map((bet, idx) => {
                            const betType = bet.market_type
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase());

                            return (
                              <Card
                                key={idx}
                                className="cursor-pointer overflow-hidden border-emerald-500/30 bg-emerald-500/10 p-4 transition-colors hover:border-emerald-500/50"
                              >
                                <div className="mb-2 flex items-center justify-between gap-2">
                                  <Badge
                                    variant="outline"
                                    className="truncate border-emerald-500/30 bg-emerald-500/20 text-xs text-emerald-400"
                                  >
                                    {betType}
                                  </Badge>
                                  <span className="shrink-0 font-mono font-bold text-emerald-400">
                                    {bet.bet_coefficient > 0 ? "+" : ""}
                                    {bet.bet_coefficient}
                                  </span>
                                </div>
                                <p className="mb-2 break-words font-semibold">
                                  {bet.bet_name}
                                </p>
                                <p className="break-words text-sm text-muted-foreground">
                                  {bet.bet_description}
                                </p>
                              </Card>
                            );
                          })
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No value bets available
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Conservative Bets */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      Top 3 Conservative Bets
                    </h3>
                    <div className="space-y-3">
                      {game.prediction?.conservative_bets &&
                      game?.prediction?.conservative_bets?.length > 0 ? (
                        game?.prediction?.conservative_bets
                          .slice(0, 3)
                          .map((bet, idx) => {
                            const betType = bet.market_type
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase());

                            return (
                              <Card
                                key={idx}
                                className="cursor-pointer overflow-hidden border-amber-500/30 bg-amber-500/10 p-4 transition-colors hover:border-amber-500/50"
                              >
                                <div className="mb-2 flex items-center justify-between gap-2">
                                  <Badge
                                    variant="outline"
                                    className="truncate border-amber-500/30 bg-amber-500/20 text-xs text-amber-400"
                                  >
                                    {betType}
                                  </Badge>
                                  <span className="shrink-0 font-mono font-bold text-amber-400">
                                    {bet.bet_coefficient > 0 ? "+" : ""}
                                    {bet.bet_coefficient}
                                  </span>
                                </div>
                                <p className="mb-2 break-words font-semibold">
                                  {bet.bet_name}
                                </p>
                                <p className="break-words text-sm text-muted-foreground">
                                  {bet.bet_description}
                                </p>
                              </Card>
                            );
                          })
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No conservative bets available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Injury Report Tab */}
              <TabsContent value="injuries" className="mt-4">
                {/* Mobile Card View */}
                <div className="block space-y-3 md:hidden">
                  {game.scoreboard?.home_team_injury &&
                    game?.scoreboard?.home_team_injury?.map((player, idx) => (
                      <Card key={`home-card-${idx}`} className="p-4">
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold">{player.player}</h4>
                            <p className="text-sm text-muted-foreground">
                              {player.team_name} · {player.position}
                            </p>
                          </div>
                          <Badge className={getStatusColor(player.status)}>
                            {player.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Est. Return: </span>
                            <span className="text-muted-foreground">
                              {player.return_date}
                            </span>
                          </div>
                          {player.comment && (
                            <div>
                              <span className="font-medium">Notes: </span>
                              <span className="text-muted-foreground">
                                {player.comment}
                              </span>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  {game.scoreboard?.away_team_injury &&
                    game?.scoreboard?.away_team_injury?.map((player, idx) => (
                      <Card key={`away-card-${idx}`} className="p-4">
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold">{player.player}</h4>
                            <p className="text-sm text-muted-foreground">
                              {player.team_name} · {player.position}
                            </p>
                          </div>
                          <Badge className={getStatusColor(player.status)}>
                            {player.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Est. Return: </span>
                            <span className="text-muted-foreground">
                              {player.return_date}
                            </span>
                          </div>
                          {player.comment && (
                            <div>
                              <span className="font-medium">Notes: </span>
                              <span className="text-muted-foreground">
                                {player.comment}
                              </span>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  {(!game.scoreboard?.home_team_injury ||
                    game?.scoreboard?.home_team_injury?.length === 0) &&
                    (!game?.scoreboard?.away_team_injury ||
                      game?.scoreboard?.away_team_injury?.length === 0) && (
                      <Card className="p-8">
                        <p className="text-center text-muted-foreground">
                          No injury reports available
                        </p>
                      </Card>
                    )}
                </div>

                {/* Desktop Table View */}
                <div className="relative hidden md:block">
                  <div
                    className="overflow-auto rounded-lg border border-border"
                    style={{ maxHeight: "calc(90vh - 350px)" }}
                  >
                    <Table className="min-w-[600px]">
                      <TableHeader className="sticky top-0 z-10 bg-secondary backdrop-blur-sm">
                        <TableRow className="bg-secondary/30">
                          <TableHead className="whitespace-nowrap font-semibold">
                            Player
                          </TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">
                            Team
                          </TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">
                            Pos
                          </TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">
                            Est. Return
                          </TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">
                            Notes
                          </TableHead>
                          <TableHead className="whitespace-nowrap text-right font-semibold">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {game.scoreboard?.home_team_injury &&
                          game?.scoreboard?.home_team_injury?.map(
                            (player, idx) => (
                              <TableRow
                                key={`home-${idx}`}
                                className="hover:bg-secondary/10"
                              >
                                <TableCell className="font-medium">
                                  {player.player}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {player.team_name}
                                </TableCell>
                                <TableCell>{player.position}</TableCell>
                                <TableCell className="whitespace-nowrap">
                                  {player.return_date}
                                </TableCell>
                                <TableCell className="max-w-[150px] text-muted-foreground sm:max-w-[250px]">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="cursor-help truncate">
                                        {player.comment}
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="left"
                                      className="max-w-xs"
                                    >
                                      <p className="break-words">
                                        {player.comment}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Badge
                                    className={getStatusColor(player.status)}
                                  >
                                    {player.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        {game.scoreboard?.away_team_injury &&
                          game?.scoreboard?.away_team_injury?.map(
                            (player, idx) => (
                              <TableRow
                                key={`away-${idx}`}
                                className="hover:bg-secondary/10"
                              >
                                <TableCell className="font-medium">
                                  {player.player}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {player.team_name}
                                </TableCell>
                                <TableCell>{player.position}</TableCell>
                                <TableCell className="whitespace-nowrap">
                                  {player.return_date}
                                </TableCell>
                                <TableCell className="max-w-[150px] text-muted-foreground sm:max-w-[250px]">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="cursor-help truncate">
                                        {player.comment}
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="left"
                                      className="max-w-xs"
                                    >
                                      <p className="break-words">
                                        {player.comment}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Badge
                                    className={getStatusColor(player.status)}
                                  >
                                    {player.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        {(!game.scoreboard?.home_team_injury ||
                          game?.scoreboard?.home_team_injury?.length === 0) &&
                          (!game?.scoreboard?.away_team_injury ||
                            game?.scoreboard?.away_team_injury?.length ===
                              0) && (
                            <TableRow>
                              <TableCell
                                colSpan={6}
                                className="py-8 text-center text-muted-foreground"
                              >
                                No injury reports available
                              </TableCell>
                            </TableRow>
                          )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GameAnalysisModal;
