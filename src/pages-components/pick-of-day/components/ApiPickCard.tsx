import { Clock, Crown, Star } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";

import type { ApiPick } from "../types";
import { formatPostedAt } from "../helpers";
import { ConfidenceBadge } from "./ConfidenceBadge";

const ApiConfidenceBadge = ({
  confidence,
}: {
  confidence: ApiPick["confidence_level"];
}) => {
  const normalized =
    confidence === "lock" || confidence === "high" || confidence === "medium"
      ? confidence
      : "medium";
  return <ConfidenceBadge confidence={normalized} />;
};

export const ApiPickCard = ({ pick }: { pick: ApiPick }) => {
  const gameLabel =
    pick?.game?.home_team || pick?.game?.away_team
      ? `${pick.game.home_team} vs ${pick.game.away_team}`
      : (pick?.game?.name ?? "TBD");

  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Moderator #{pick.user_id}
                </h3>
                {pick.is_premium ? (
                  <Crown className="h-4 w-4 text-amber-400" />
                ) : null}
              </div>
              <div className="text-sm text-muted-foreground">
                {pick.sport?.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <ApiConfidenceBadge confidence={pick.confidence_level} />
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {pick?.game?.start_time
                ? formatPostedAt(pick?.game?.start_time)
                : formatPostedAt(pick.created_at)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {pick.sport?.toUpperCase()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {pick.units} Unit{pick.units > 1 ? "s" : ""}
            </span>
          </div>
          <p className="mb-1 text-sm text-muted-foreground">{gameLabel}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-foreground">
              {pick.pick}
            </span>
            <span className="text-lg font-semibold text-primary">
              {(() => {
                const odds = String(pick.odds);
                if (odds.startsWith("-") || odds.startsWith("+")) {
                  return odds;
                }
                const num = Number(odds);
                return !Number.isNaN(num) && num > 0 ? `+${odds}` : odds;
              })()}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <Star className="h-4 w-4 text-primary" />
            Analysis
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {pick.analysis}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
