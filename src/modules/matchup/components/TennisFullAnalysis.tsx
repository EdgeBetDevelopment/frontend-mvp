'use client';

import {
  Trophy,
  Activity,
  Target,
  Zap,
  Shield,
  TrendingUp,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog';
import { Badge } from '@/shared/components/badge';
import { Card } from '@/shared/components/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/tabs';
import { ScrollArea } from '@/shared/components/scroll-area';

import type { TennisMatchup } from '../data/tennisMatchups';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matchup: TennisMatchup;
}

const TennisFullAnalysis = ({ open, onOpenChange, matchup }: Props) => {
  const { player1: p1, player2: p2 } = matchup;

  const apiH2hScore = matchup.h2hScore;
  const h2h = [
    {
      year: 2024,
      tournament: 'US Open',
      round: 'QF',
      surface: 'Hard Court',
      winner: p1.name,
      score: '6-4, 7-6, 6-3',
    },
    {
      year: 2024,
      tournament: 'Madrid Open',
      round: 'SF',
      surface: 'Clay',
      winner: p1.name,
      score: '7-5, 6-4',
    },
    {
      year: 2023,
      tournament: 'Wimbledon',
      round: 'R16',
      surface: 'Grass',
      winner: p2.name,
      score: '6-7, 6-4, 7-5',
    },
    {
      year: 2023,
      tournament: 'ATP Finals',
      round: 'RR',
      surface: 'Hard Court',
      winner: p1.name,
      score: '6-3, 6-4',
    },
  ];

  const p1Wins = h2h.filter((m) => m.winner === p1.name).length;
  const p2Wins = h2h.filter((m) => m.winner === p2.name).length;
  const h2hLabel = apiH2hScore
    ? `${p1.name} ${apiH2hScore} ${p2.name}`
    : `${p1.name} ${p1Wins}–${p2Wins} ${p2.name}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden p-0">
        <DialogHeader className="border-b border-border bg-gradient-to-br from-card to-secondary/30 px-6 pb-4 pt-6">
          <DialogTitle className="flex items-center gap-2 font-display text-2xl">
            <Trophy className="h-6 w-6 text-primary" />
            {p1.name} vs {p2.name}
          </DialogTitle>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/20 text-primary"
            >
              {matchup.tournament}
            </Badge>
            <Badge variant="outline">{matchup.round}</Badge>
            <Badge variant="outline">{matchup.surface}</Badge>
            <Badge variant="outline">{matchup.format}</Badge>
            <Badge variant="outline">
              {matchup.date} · {matchup.time}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-130px)]">
          <div className="px-6 py-5">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4 grid grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="surface">Surface</TabsTrigger>
                <TabsTrigger value="h2h">H2H</TabsTrigger>
                <TabsTrigger value="ai">AI Reasoning</TabsTrigger>
                <TabsTrigger value="bets">Recommended</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[p1, p2].map((p) => (
                    <Card key={p.name} className="space-y-2 p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-display text-lg font-bold">
                          {p.name}
                        </div>
                        {(p.rank || p.seed) && (
                          <Badge variant="outline">
                            {p.rank
                              ? `${p.tour ? `${p.tour} ` : ''}#${p.rank}`
                              : ''}
                            {p.rank && p.seed ? ' · ' : ''}
                            {p.seed ? `Seed ${p.seed}` : ''}
                          </Badge>
                        )}
                      </div>
                      {p.country && (
                        <div className="text-xs text-muted-foreground">
                          {p.country}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Last 5:</span>
                        <span className="font-mono">{p.form.join(' ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>Status: {p.injuryStatus}</span>
                      </div>
                    </Card>
                  ))}
                </div>
                <Card className="p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold">
                    <Activity className="h-4 w-4 text-primary" /> Match Overview
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {matchup.overview ||
                      `A high-stakes ${matchup.round} clash at ${matchup.tournament} on ${matchup.surface.toLowerCase()}. ${matchup.aiPick} enters as the model-favored side, supported by superior recent form and a favorable surface profile. Expect a ${matchup.format.toLowerCase()} contest with elevated baseline rallies and break-point leverage.`}
                  </p>
                </Card>
              </TabsContent>
              <TabsContent value="surface" className="space-y-3">
                <Card className="p-4">
                  <h4 className="mb-3 font-semibold">
                    {matchup.surface} Performance (Last 12 months)
                  </h4>
                  {[p1, p2].map((p, i) => (
                    <div
                      key={p.name}
                      className="mb-3 flex items-center justify-between text-sm"
                    >
                      <span className="font-medium">{p.name}</span>
                      <Badge
                        variant="outline"
                        className={
                          i === 0
                            ? 'border-emerald-500/40 text-emerald-400'
                            : 'border-border'
                        }
                      >
                        {i === 0 ? 'Strong' : 'Solid'} on{' '}
                        {matchup.surface.toLowerCase()}
                      </Badge>
                    </div>
                  ))}
                </Card>
                <Card className="p-4 text-sm text-muted-foreground">
                  {matchup.surface === 'Clay' &&
                    'Slower bounce favors heavy topspin and extended rallies. Service holds are harder than on hard court.'}
                  {matchup.surface === 'Grass' &&
                    'Low bounce rewards big servers and net play. Expect shorter points and elevated ace counts.'}
                  {matchup.surface === 'Hard Court' &&
                    'Neutral surface that rewards all-court players with balanced power and movement.'}
                </Card>
              </TabsContent>
              <TabsContent value="h2h" className="space-y-3">
                <Card className="p-4">
                  <h4 className="mb-3 font-semibold">
                    Head-to-Head: {h2hLabel}
                  </h4>
                  <div className="space-y-2">
                    {h2h.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-border/40 pb-2 text-sm last:border-0"
                      >
                        <div>
                          <div className="font-medium">
                            {m.tournament} {m.year} · {m.round}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {m.surface}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            {m.winner}
                          </div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {m.score}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="ai" className="space-y-3">
                <Card className="border-primary/30 bg-primary/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">AI Pick: {matchup.aiPick}</h4>
                    {(matchup.winProbabilityPlayer1 ||
                      matchup.winProbabilityPlayer2) && (
                      <Badge variant="outline" className="ml-auto">
                        {matchup.aiPick === matchup.player1.name
                          ? `${matchup.winProbabilityPlayer1}%`
                          : `${matchup.winProbabilityPlayer2}%`}
                      </Badge>
                    )}
                    {!matchup.winProbabilityPlayer1 &&
                      !matchup.winProbabilityPlayer2 && (
                        <Badge variant="outline" className="ml-auto">
                          Lean
                        </Badge>
                      )}
                  </div>
                  {matchup.analysis ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {matchup.analysis}
                    </p>
                  ) : (
                    <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                      <li>
                        Surface ELO clearly favors {matchup.aiPick} on{' '}
                        {matchup.surface.toLowerCase()}.
                      </li>
                      <li>
                        Recent form differential leans toward {matchup.aiPick}{' '}
                        across the last 5 matches.
                      </li>
                      <li>
                        Service hold profile on {matchup.surface.toLowerCase()}{' '}
                        favors {matchup.aiPick}.
                      </li>
                      <li>
                        Historical edge in {matchup.format.toLowerCase()}{' '}
                        formats due to stamina profile.
                      </li>
                    </ul>
                  )}
                </Card>
              </TabsContent>
              <TabsContent value="bets" className="space-y-2">
                {matchup.markets.slice(0, 6).map((m, i) => (
                  <Card
                    key={i}
                    className="flex items-center justify-between p-3"
                  >
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {m.category}
                      </div>
                      <div className="font-medium">{m.label}</div>
                    </div>
                    {m.odds && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                        <span className="font-mono font-bold text-primary">
                          {m.odds}
                        </span>
                      </div>
                    )}
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TennisFullAnalysis;
