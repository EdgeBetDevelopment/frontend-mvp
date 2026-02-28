"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Calendar,
  Clock,
  DollarSign,
  Loader2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { useTableSort } from "@/shared/hooks/useTableSort";
import { trackerApi } from "@/modules/tracker";
import { Badge } from "@/shared/components/badge";
import { Card } from "@/shared/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/tabs";
import {
  formatDateWithoutConversion,
  formatTimeAmPmWithoutConversion,
} from "@/shared/utils";
import { formUrlQuery } from "@/shared/utils";
import Footer from "@/shared/components/Footer";
import Navigation from "@/shared/components/Navigation";

type BetStatus = "pending" | "won" | "lost";

interface BetLeg {
  id: number;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  description: string;
  odds: string;
  date: string;
  time: string;
  status: BetStatus;
  amount: number;
}

interface TrackedBet {
  id: number;
  type: "single" | "parlay";
  status: BetStatus;
  createdAt: string;
  riskAmount: number;
  potentialPayout: number;
  actualPayout?: number;
  legs: BetLeg[];
}

const statusConfig: Record<
  BetStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: React.ElementType;
    colorClass: string;
  }
> = {
  pending: {
    label: "Pending",
    variant: "secondary",
    icon: Loader2,
    colorClass: "text-yellow-500",
  },
  won: {
    label: "Won",
    variant: "default",
    icon: TrendingUp,
    colorClass: "text-green-500",
  },
  lost: {
    label: "Lost",
    variant: "destructive",
    icon: TrendingDown,
    colorClass: "text-red-500",
  },
};

const BET_TYPE_TABS = [
  { label: "Active Bets", value: "active" },
  { label: "Completed Bets", value: "completed" },
  { label: "All Bets", value: "all" },
];

const TABLE_FIELDS = [
  { label: "Date", field: "created_at", sortable: true },
  { label: "Event", field: "game.home_team", sortable: false },
  { label: "Description", field: "description", sortable: false },
  { label: "Stake", field: "amount", sortable: true },
  { label: "Bet", field: "odds_at_bet_time", sortable: true },
  { label: "P/L", field: "pl", sortable: false },
  { label: "Status", field: "status", sortable: false },
];

const BetTrackerTable = () => {
  const pathname = usePathname();
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const type = params.get("type") || "active";
  const sortParam = params.get("sort") || "";
  const [activeTab, setActiveTab] = useState(type);
  const { sortArray, currentSort, handleSort } = useTableSort();

  React.useEffect(() => {
    setActiveTab(type);
  }, [type]);

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["betList", activeTab, sortParam],
    queryFn: () =>
      trackerApi.getBetList({ filter: activeTab, sort: sortArray } as any),
    staleTime: 1000 * 60 * 2,
    refetchOnMount: "always",
    placeholderData: (prevData) => prevData,
  });
  const { data: allBetsData = [] } = useQuery({
    queryKey: ["betList", "all"],
    queryFn: () => trackerApi.getBetList({ filter: "all", sort: [] } as any),
    staleTime: 1000 * 60 * 2,
  });

  const onChangeType = (value: string) => {
    if (value === activeTab) return;
    setActiveTab(value);
    changeTypeInUrl(value);
  };

  const changeTypeInUrl = (value: string) => {
    let url = pathname;
    if (!value) {
      url = formUrlQuery({
        params: params.toString(),
        keysToRemove: ["type"],
      });
    } else {
      url = formUrlQuery({
        params: params.toString(),
        key: "type",
        value,
      });
    }
    router.replace(url);
  };

  const mapBetStatus = (status: string): BetStatus => {
    const lowerStatus = status?.toLowerCase();
    if (lowerStatus === "win" || lowerStatus === "won") return "won";
    if (lowerStatus === "loss" || lowerStatus === "lost") return "lost";
    if (
      lowerStatus === "pending" ||
      lowerStatus === "open" ||
      lowerStatus === "active"
    )
      return "pending";
    return "pending";
  };

  const computePL = (bet: any, selection: any): number | null => {
    const status = bet?.status;
    const amount = Number(selection?.amount ?? 0);
    const oddsRaw = selection?.payload?.odds_at_bet_time;
    const odds =
      typeof oddsRaw === "string" ? Number(oddsRaw) : Number(oddsRaw);
    const winAmount = selection?.win_amount ?? bet?.win_amount;

    if (status === "win") {
      if (typeof winAmount === "number" && !Number.isNaN(winAmount))
        return winAmount - amount;
      if (!Number.isNaN(odds)) return +(amount * (odds - 1)).toFixed(2);
      return null;
    }
    if (status === "lose" || status === "lost") return -amount;

    return null;
  };

  const transformBetsToTrackedBets = (bets: any[]): TrackedBet[] => {
    return bets.map((bet) => {
      const selections = bet?.selections || [];
      const isParlay = selections.length > 1;
      const betStatus = mapBetStatus(bet.status);

      const legs: BetLeg[] = selections.map((selection: any, idx: number) => {
        const game = selection?.game || {};
        const payload = selection?.payload || {};

        const selectedTeamName = payload.selected_team_name || "";
        const odds = payload.odds_at_bet_time || "";

        const descriptionObj = payload.description || {};
        let formattedDescription = "";

        if (typeof descriptionObj === "object" && descriptionObj !== null) {
          const marketType = descriptionObj.market_type || "";
          const betName = descriptionObj.bet_name || "";
          const betValue = descriptionObj.bet_value;
          const betOverUnder = descriptionObj.bet_over_under;

          if (marketType.toLowerCase().includes("spread")) {
            formattedDescription =
              betName ||
              `${selectedTeamName} ${betValue > 0 ? "+" : ""}${betValue}`;
          } else if (marketType.toLowerCase().includes("total")) {
            formattedDescription = betName || `${betOverUnder} ${betValue}`;
          } else if (marketType.toLowerCase().includes("moneyline")) {
            formattedDescription = `${selectedTeamName} ML`;
          } else if (marketType.toLowerCase().includes("player_prop")) {
            formattedDescription = betName;
          } else {
            formattedDescription =
              betName || descriptionObj.bet_description || selectedTeamName;
          }
        } else if (typeof descriptionObj === "string") {
          formattedDescription = descriptionObj;

          if (formattedDescription && selectedTeamName) {
            const mainBetInfo = formattedDescription.split(":")[0];

            if (
              mainBetInfo.includes("Spread") ||
              mainBetInfo.includes("Point Spread")
            ) {
              const spreadMatch = mainBetInfo.match(/([+-]?\d+\.?\d*)/);
              if (spreadMatch) {
                formattedDescription = `${selectedTeamName} ${spreadMatch[0]}`;
              }
            } else if (
              mainBetInfo.includes("Moneyline") ||
              mainBetInfo.includes("ML")
            ) {
              formattedDescription = `${selectedTeamName} ML`;
            } else {
              formattedDescription =
                `${selectedTeamName} ${mainBetInfo.replace(selectedTeamName, "").trim()}`.replace(
                  /\s+/g,
                  " ",
                );
            }
          }
        }

        return {
          id: selection.id || idx,
          sport: (game.sport || "nba").toUpperCase(),
          homeTeam: game.home_team || "",
          awayTeam: game.away_team || "",
          description: formattedDescription,
          odds: payload.odds_at_bet_time || "-",
          date: game.start_time
            ? formatDateWithoutConversion(game.start_time)
            : "-",
          time: game.start_time
            ? formatTimeAmPmWithoutConversion(game.start_time)
            : "-",
          status: mapBetStatus(selection.status || bet.status),
          amount: Number(selection.amount || 0),
        };
      });

      const riskAmount = Number(
        bet.total_amount || legs.reduce((sum, leg) => sum + leg.amount, 0),
      );
      const potentialPayout = Number(bet.win_amount || 0);
      const actualPayout =
        betStatus === "won"
          ? potentialPayout
          : betStatus === "lost"
            ? 0
            : undefined;

      return {
        id: bet.id,
        type: isParlay ? "parlay" : "single",
        status: betStatus,
        createdAt: bet.created_at || new Date().toISOString(),
        riskAmount,
        potentialPayout,
        actualPayout,
        legs,
      };
    });
  };

  const trackedBets = transformBetsToTrackedBets(data);
  const allTrackedBets = transformBetsToTrackedBets(allBetsData);

  const activeBets = allTrackedBets.filter((bet) => bet.status === "pending");
  const completedBets = allTrackedBets.filter(
    (bet) => bet.status !== "pending",
  );

  const getBetsForTab = () => {
    return trackedBets;
  };

  const calculateStats = () => {
    const won = allTrackedBets.filter((b) => b.status === "won");
    const lost = allTrackedBets.filter((b) => b.status === "lost");
    const totalWon = won.reduce((acc, b) => acc + (b.actualPayout || 0), 0);
    const totalLost = lost.reduce((acc, b) => acc + b.riskAmount, 0);
    const totalRisked = [...won, ...lost].reduce(
      (acc, b) => acc + b.riskAmount,
      0,
    );
    const netProfit = totalWon - totalRisked;

    return {
      record: `${won.length}-${lost.length}`,
      netProfit,
      winRate:
        won.length + lost.length > 0
          ? ((won.length / (won.length + lost.length)) * 100).toFixed(1)
          : "0.0",
    };
  };

  const stats = calculateStats();
  const betsToShow = getBetsForTab();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
            Bet Tracker
          </h1>
          <p className="text-muted-foreground">
            Track and manage all your bets in one place
          </p>
        </div>
        <div className="mb-8 grid grid-cols-3 gap-4">
          <Card className="border-border bg-card p-4 text-center">
            <p className="mb-1 text-sm text-muted-foreground">Record</p>
            <p className="text-2xl font-bold text-foreground">{stats.record}</p>
          </Card>
          <Card className="border-border bg-card p-4 text-center">
            <p className="mb-1 text-sm text-muted-foreground">Win Rate</p>
            <p className="text-2xl font-bold text-foreground">
              {stats.winRate}%
            </p>
          </Card>
          <Card className="border-border bg-card p-4 text-center">
            <p className="mb-1 text-sm text-muted-foreground">Net Profit</p>
            <p
              className={`text-2xl font-bold ${stats.netProfit >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {stats.netProfit >= 0 ? "+" : ""}${stats.netProfit.toFixed(2)}
            </p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={onChangeType} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active" className="px-6">
              Active Bets ({activeBets.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="px-6">
              Completed Bets ({completedBets.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="px-6">
              All Bets ({allTrackedBets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <Card className="border-border bg-card p-12 text-center">
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              </Card>
            ) : betsToShow.length > 0 ? (
              <div className="grid gap-4">
                {betsToShow.map((bet) => (
                  <BetSlip key={bet.id} bet={bet} />
                ))}
              </div>
            ) : (
              <Card className="border-border bg-card p-12 text-center">
                <p className="font-display text-xl text-muted-foreground">
                  No{" "}
                  {activeTab === "active"
                    ? "active"
                    : activeTab === "completed"
                      ? "completed"
                      : ""}{" "}
                  bets yet
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Head to the Matchup page to place your first bet
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

const BetSlip = ({ bet }: { bet: TrackedBet }) => {
  const config = statusConfig[bet.status];
  const StatusIcon = config.icon;
  const isParlay = bet.type === "parlay";

  return (
    <Card className="border-border bg-card p-5 transition-colors hover:border-primary/30">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              bet.status === "won"
                ? "bg-green-500/20"
                : bet.status === "lost"
                  ? "bg-red-500/20"
                  : "bg-yellow-500/20"
            }`}
          >
            <StatusIcon
              className={`h-5 w-5 ${config.colorClass} ${bet.status === "pending" ? "animate-spin" : ""}`}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge
                variant={isParlay ? "default" : "outline"}
                className="text-xs"
              >
                {isParlay ? `Parlay (${bet.legs.length} legs)` : "Single"}
              </Badge>
              <Badge variant={config.variant} className="text-xs">
                {config.label}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(bet.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Risk</p>
          <p className="font-bold text-foreground">
            ${bet.riskAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Bet Legs */}
      <div className="mb-4 space-y-2">
        {bet.legs.map((leg) => {
          const legConfig = statusConfig[leg.status];
          return (
            <div
              key={leg.id}
              className={`rounded-md border px-3 py-2 ${
                leg.status === "won"
                  ? "border-green-500/30 bg-green-500/10"
                  : leg.status === "lost"
                    ? "border-red-500/30 bg-red-500/10"
                    : "border-border/50 bg-secondary/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="outline" className="px-1.5 py-0 text-xs">
                      {leg.sport}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {leg.homeTeam} vs {leg.awayTeam}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {leg.description}{" "}
                    <span className="font-bold text-primary">{leg.odds}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {leg.date}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {leg.time}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payout Info */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {bet.status === "pending" ? "Potential Payout" : "Payout"}
          </span>
        </div>
        <p
          className={`text-lg font-bold ${
            bet.status === "won"
              ? "text-green-500"
              : bet.status === "lost"
                ? "text-red-500 line-through"
                : "text-primary"
          }`}
        >
          ${bet.status === "lost" ? "0.00" : bet.potentialPayout.toFixed(2)}
        </p>
      </div>
    </Card>
  );
};

export default BetTrackerTable;
