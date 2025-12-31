'use client';

import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';

import { useStore } from '@/store';
import { Badge } from '@/ui/badge';
import { Card } from '@/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { getTeamInfoByName } from '@/utils/team';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/utils/time';

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
      console.error('Error getting predicted winner info:', error);
      return null;
    }
  }, [game?.prediction?.predicted_winner, game?.game]);

  const favoriteTeamInfo = React.useMemo(() => {
    if (!game?.prediction?.favorite_team || !game?.game) return null;
    try {
      return getTeamInfoByName(game?.prediction?.favorite_team, game?.game);
    } catch (error) {
      console.error('Error getting favorite team info:', error);
      return null;
    }
  }, [game?.prediction?.favorite_team, game?.game]);

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-muted text-muted-foreground';
    const normalized = status.toLowerCase();
    if (normalized.includes('out'))
      return 'bg-destructive/80 text-destructive-foreground';
    if (normalized.includes('day-to-day')) return 'bg-amber-600/80 text-white';
    if (normalized.includes('questionable'))
      return 'bg-yellow-600/80 text-white';
    return 'bg-muted text-muted-foreground';
  };

  if (!isClient || !game) {
    return null;
  }

  const analysis = game.prediction?.analysis;
  const overview = analysis?.overview || [];
  const homeTeamAnalysis = analysis?.home_team_analysis;
  const awayTeamAnalysis = analysis?.away_team_analysis;
  const riskFactors = analysis?.risk_factors || [];
  const homeInjuries = homeTeamAnalysis?.injuries || '';
  const awayInjuries = awayTeamAnalysis?.injuries || '';
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
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/20 sm:h-10 sm:w-10">
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
                <DialogTitle className="font-display text-base sm:text-lg md:text-xl">
                  {homeTeamName}{' '}
                  <span className="font-normal text-muted-foreground">vs</span>{' '}
                  {awayTeamName}
                </DialogTitle>
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/20 sm:h-10 sm:w-10">
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
                {game?.game?.status === 'scheduled'
                  ? 'Scheduled'
                  : game?.game?.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-80px)]">
          <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            {/* Predicted Winner & Key Stats Row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Predicted Winner
                  </span>
                </div>
                <p className="font-display text-2xl font-bold text-primary">
                  {predictedWinnerInfo?.name ||
                    game.prediction?.predicted_winner ||
                    'N/A'}
                </p>
              </Card>
              <Card className="border-border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {homeTeamName}
                  </span>
                </div>
                <p className="text-xl font-semibold">
                  {homeWinProb.toFixed(1)}%
                </p>
                <p className="text-sm text-primary">Win Probability</p>
              </Card>
              <Card className="border-border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
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
              <TabsList className="w-full justify-start bg-secondary/30 p-1">
                <TabsTrigger
                  value="analysis"
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="bets" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Betting Picks
                </TabsTrigger>
                <TabsTrigger
                  value="injuries"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Injury Report
                </TabsTrigger>
              </TabsList>

              {/* Analysis Tab */}
              <TabsContent value="analysis" className="mt-4 space-y-4">
                {/* Game Overview */}
                {overview.length > 0 && (
                  <Card className="p-4">
                    <h3 className="mb-3 flex items-center gap-2 font-semibold">
                      <Shield className="h-4 w-4 text-primary" />
                      Game Overview
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {overview.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Team Analysis Side by Side */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Home Team */}
                  <Card className="border-l-4 border-l-primary p-4">
                    <h3 className="mb-3 font-semibold">
                      {homeTeamName} Analysis
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Injuries
                        </span>
                        <p className="mt-1 text-sm">
                          {homeInjuries || 'No injuries reported'}
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
                              <span className="text-primary">•</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* Away Team */}
                  <Card className="border-l-4 border-l-secondary p-4">
                    <h3 className="mb-3 font-semibold">
                      {awayTeamName} Analysis
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Injuries
                        </span>
                        <p className="mt-1 text-sm">
                          {awayInjuries || 'No injuries reported'}
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
                              <span className="text-secondary-foreground">
                                •
                              </span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Risk Factors */}
                {riskFactors.length > 0 && (
                  <Card className="border-destructive/20 bg-destructive/5 p-4">
                    <h3 className="mb-3 flex items-center gap-2 font-semibold text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      Risk Factors
                    </h3>
                    <ul className="space-y-2">
                      {riskFactors.map((risk, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="shrink-0 text-destructive">⚠</span>
                          {risk}
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
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (l) => l.toUpperCase());

                            return (
                              <Card
                                key={idx}
                                className="cursor-pointer border-emerald-500/30 bg-emerald-500/10 p-4 transition-colors hover:border-emerald-500/50"
                              >
                                <div className="mb-2 flex items-center justify-between">
                                  <Badge
                                    variant="outline"
                                    className="border-emerald-500/30 bg-emerald-500/20 text-xs text-emerald-400"
                                  >
                                    {betType}
                                  </Badge>
                                  <span className="font-mono font-bold text-emerald-400">
                                    {bet.bet_coefficient > 0 ? '+' : ''}
                                    {bet.bet_coefficient}
                                  </span>
                                </div>
                                <p className="mb-2 font-semibold">
                                  {bet.bet_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
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
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (l) => l.toUpperCase());

                            return (
                              <Card
                                key={idx}
                                className="cursor-pointer border-amber-500/30 bg-amber-500/10 p-4 transition-colors hover:border-amber-500/50"
                              >
                                <div className="mb-2 flex items-center justify-between">
                                  <Badge
                                    variant="outline"
                                    className="border-amber-500/30 bg-amber-500/20 text-xs text-amber-400"
                                  >
                                    {betType}
                                  </Badge>
                                  <span className="font-mono font-bold text-amber-400">
                                    {bet.bet_coefficient > 0 ? '+' : ''}
                                    {bet.bet_coefficient}
                                  </span>
                                </div>
                                <p className="mb-2 font-semibold">
                                  {bet.bet_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
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
                <div className="overflow-x-auto">
                  <Card className="overflow-hidden">
                    <Table className="min-w-[600px]">
                      <TableHeader>
                        <TableRow className="bg-secondary/30">
                          <TableHead className="font-semibold">
                            Player
                          </TableHead>
                          <TableHead className="font-semibold">Team</TableHead>
                          <TableHead className="font-semibold">Pos</TableHead>
                          <TableHead className="font-semibold">
                            Est. Return
                          </TableHead>
                          <TableHead className="font-semibold">Notes</TableHead>
                          <TableHead className="text-right font-semibold">
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
                                <TableCell>{player.return_date}</TableCell>
                                <TableCell className="max-w-[200px] text-muted-foreground">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="cursor-help truncate">
                                        {player.comment}
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-xs">
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
                                <TableCell>{player.return_date}</TableCell>
                                <TableCell className="max-w-[200px] text-muted-foreground">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="cursor-help truncate">
                                        {player.comment}
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-xs">
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
                  </Card>
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
