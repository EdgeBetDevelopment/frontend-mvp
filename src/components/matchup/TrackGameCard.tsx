'use client';

import React from 'react';
import { NumericFormat } from 'react-number-format';
import { Calendar, Clock, X, ChevronRight } from 'lucide-react';

import { useStore } from '@/store';
import { IGameWithAI } from '@/types/game';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/components/ui/input';
import {
  convertAmericanToDecimal,
  convertEuropeanToAmerican,
} from '@/utils/convertAmericanToDecimal';
import { formatOddsWithSign } from '@/utils/formatOdds';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/utils/time';

interface ITrackGameCard {
  game: IGameWithAI;
  onClickFullAnalysis: () => void;
  index: number;
}

const TrackGameCard = ({ game, index }: ITrackGameCard) => {
  const formattedDate = formatUtcToLocalDate(game.game.start_time);
  const formattedTime = formatUtcToLocalTimeAmPm(game.game.start_time);

  const {
    isParlay,
    single,
    parlay,
    setParlayWin,
    setParlayAmount,
    clearParlay,
    setSingleAmount,
    setSingleWin,
    clearSingle,
    removeSingleAndSyncParlay,
    removeParlayAndSyncSingle,
    isAmerican,
    parlayOdds,
  } = useStore();

  function formatDescription(desc: string) {
    console.log(desc);
    let formatted = desc
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .split(':')[0]
      .trim();

    formatted = formatted.replace(
      /(\s)([\d.]+)(\s|$)/g,
      (match, space1, num, space2) => {
        const number = parseFloat(num);
        if (!isNaN(number) && number > 0) {
          return `${space1}+${num}${space2}`;
        }
        return match;
      },
    );

    return formatted;
  }

  const currentTicket = isParlay ? parlay : single[index];
  const currentPick = isParlay ? parlay.bets[index] : single[index]?.bets?.[0];

  const computeSingleWin = (amount: number, decimalOdds: number) =>
    +(amount * decimalOdds).toFixed(2);

  const computeParlayWin = (amount: number, bets: { odds?: number }[] = []) => {
    const product = bets.reduce((acc, b) => {
      const decimal = convertAmericanToDecimal(Number(b?.odds) || 0);
      return acc * decimal;
    }, 1);
    return +(amount * product).toFixed(2);
  };

  const handleSetAmount = (value: number) => {
    if (isParlay) {
      setParlayAmount(value);
      setParlayWin(computeParlayWin(value, parlay?.bets));
    } else {
      setSingleAmount(index, value);
      const decimalOdds = convertAmericanToDecimal(
        Number(currentPick?.odds) || 0,
      );

      setSingleWin(index, computeSingleWin(value, decimalOdds));
    }
  };

  const handleRemove = () => {
    if (isParlay) {
      clearParlay();
      clearSingle();
    } else {
      removeSingleAndSyncParlay(index);
    }
  };

  const handleRemoveOneParlay = (pid: string) => {
    removeParlayAndSyncSingle(pid);
  };

  return (
    <Card className="relative border-border/50 bg-secondary/30 p-4">
      {/* Close button */}
      <button
        className="absolute right-2 top-2 text-muted-foreground transition-colors hover:text-foreground"
        onClick={handleRemove}
      >
        <X className="h-4 w-4" />
      </button>

      {/* Game info for single bets or Parlay header */}
      {isParlay ? (
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-semibold text-foreground">
              Parlay ({parlay.bets.length} bets)
            </p>
          </div>
          <p className="text-lg font-bold text-foreground">
            Parlay Odds:{' '}
            <span className="text-primary">
              {parlay.bets.length === 0
                ? '-'
                : isAmerican
                  ? formatOddsWithSign(
                      convertEuropeanToAmerican(parlayOdds),
                      true,
                    )
                  : parlayOdds.toFixed(2)}
            </span>
          </p>
        </div>
      ) : (
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <span className="text-xs font-bold">NBA</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {game.game.home_team} vs {game.game.away_team}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formattedTime}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/20 text-xs text-primary"
            >
              NBA
            </Badge>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {game?.scoreboard?.label || 'Regular Season Game'}
            </span>
          </div>
        </div>
      )}

      {/* Bets list */}
      <div className="mb-4 space-y-2">
        {isParlay ? (
          parlay?.bets?.length ? (
            parlay.bets.map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md bg-primary/20 px-3 py-2"
              >
                <span className="mr-2 flex-1 text-sm text-foreground">
                  {formatDescription(b?.description ?? '')}
                </span>
                <span className="mr-2 font-bold text-foreground">
                  {!isAmerican
                    ? convertAmericanToDecimal(b?.odds ?? 0).toFixed(2)
                    : formatOddsWithSign(b?.odds ?? 0, true)}
                </span>
                <button
                  onClick={() => handleRemoveOneParlay(`${b?.pid}`)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : null
        ) : (
          <div className="rounded-md bg-primary/90 px-3 py-2 text-sm font-medium text-primary-foreground">
            {formatDescription(currentPick?.description ?? '')}{' '}
            <span className="font-bold">
              {!isAmerican
                ? convertAmericanToDecimal(currentPick?.odds ?? 0).toFixed(2)
                : formatOddsWithSign(currentPick?.odds ?? 0, true)}
            </span>
          </div>
        )}
      </div>

      {/* Risk amount input */}
      <div className="mb-2">
        <label className="mb-1 block text-sm text-muted-foreground">
          Risk Amount ($)
        </label>
        <NumericFormat
          value={currentTicket?.amount ?? ''}
          onValueChange={(v) => {
            const val = parseFloat(v.value);
            handleSetAmount(Number.isNaN(val) ? 0 : val);
          }}
          className="w-full"
          customInput={Input}
          thousandSeparator
          placeholder="0"
          allowNegative={false}
        />
        {!currentTicket?.amount && (
          <p className="mt-1 text-xs text-destructive">Enter valid amount</p>
        )}
      </div>

      {/* Win amount */}
      <p className="text-sm text-foreground">
        Win Amount ($):{' '}
        <span className="font-bold text-primary">
          ${currentTicket?.win_amount?.toFixed(2) || '0.00'}
        </span>
      </p>
    </Card>
  );
};

export default TrackGameCard;
