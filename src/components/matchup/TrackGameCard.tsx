'use client';

import React from 'react';
import Link from 'next/link';
import { NumericFormat } from 'react-number-format';

import { ROUTES } from '@/routes';
import { useStore } from '@/store';
import { IGameWithAI } from '@/types/game';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/utils/time';
import CardContainer from '../../ui/containers/CardContainer';
import { Input } from '../../ui/input';

import CalendarIcon from '@/assets/icons/calendar.svg';
import CancelIcon from '@/assets/icons/cancel.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import SmallCancelIcon from '@/assets/icons/small-cancel.svg';
import NBALogoIcon from '@/assets/nbaLogo.png';

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
    setSingleAmount,
    parlay,
    setParlayWin,
    setParlayAmount,
    setSingleWin,
    removeSingle,
    clearParlay,
    isAmerican,
  } = useStore();

  function formatDescription(desc: string) {
    console.log(desc);
    return desc
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .split(':')[0]
      .trim();
  }

  const currentTicket = isParlay ? parlay : single[index];
  const currentPick = isParlay ? parlay.bets[index] : single[index]?.bets?.[0];

  const convertAmericanToDecimal = (odds: number) => {
    if (!odds) return 1;
    return odds > 0 ? odds / 100 + 1 : 100 / Math.abs(odds) + 1;
  };

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
    } else {
      removeSingle(index);
    }
  };

  return (
    <CardContainer className="tl-gradient-mistBlue-opacity border-border relative flex flex-col gap-3">
      <Button
        className={`absolute top-1 right-1 z-10 ${isParlay && 'top-4.5 right-5'}`}
        variant="clear"
        size="icon"
        onClick={() => handleRemove()}
      >
        <CancelIcon />
      </Button>

      {/* Header */}
      {!isParlay && (
        <div className="relative flex items-center gap-2">
          <div className="relative flex w-[44px] items-center">
            <Avatar className="border-border bg-surface-secondary h-8 w-8 rounded-full border p-1">
              <AvatarImage src={game.game.home_team_logo} />
            </Avatar>
            <div className="absolute left-3.5">
              <Avatar className="border-border bg-surface-secondary h-8 w-8 rounded-full border p-1">
                <AvatarImage src={game.game.away_team_logo} />
              </Avatar>
            </div>
          </div>

          <div>
            <div className="tl-paraghraph2 flex items-center gap-1">
              <Link
                href={ROUTES.TEAM(game.game.home_team_id)}
                className="text-text-primary hover:underline"
              >
                {game.game.home_team}
              </Link>
              <div>vs</div>
              <Link
                href={ROUTES.TEAM(game.game.away_team_id)}
                className="text-text-primary hover:underline"
              >
                {game.game.away_team}
              </Link>
            </div>

            <div className="tl-paraghraph3 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CalendarIcon /> {formattedDate}
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon /> {formattedTime}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-surface-secondary border-border flex flex-col gap-4 rounded-3xl border p-3">
        {isParlay && <p className="text-[16px]">Parlay (3 picks)</p>}
        {!isParlay && (
          <div className="tl-paraghraph2 flex items-center gap-2">
            <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
              <div>
                <AvatarImage src={NBALogoIcon.src} />
              </div>
            </Avatar>
            <div>NBA</div>
            {game?.scoreboard?.label && (
              <>
                <ChevronRightIcon className="text-text-secondary" />
                {game?.scoreboard?.label}
              </>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {isParlay ? (
            parlay?.bets?.length ? (
              parlay?.bets?.map((b, i) => (
                <div
                  key={i}
                  className="flex w-full justify-between gap-2 rounded-md bg-[#33758780] p-2 text-sm font-medium text-[#B3B3B3]"
                >
                  <span>{formatDescription(b?.description ?? '')}</span>
                  {typeof b?.odds === 'number' && (
                    <div className="flex items-center gap-[10px]">
                      <span className="font-semibold text-white">
                        {!isAmerican
                          ? convertAmericanToDecimal(b?.odds)
                          : b?.odds}
                      </span>
                      <Button
                        className="max-h-[10px] max-w-[10px]"
                        variant="clear"
                        size="icon"
                        onClick={() => handleRemove()}
                      >
                        <SmallCancelIcon />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : null
          ) : (
            <div className="flex w-fit flex-row gap-1 rounded-md bg-[#33758780] p-2 text-[12px] font-medium text-[#B3B3B3]">
              <p>{formatDescription(currentPick?.description ?? '')}</p>
              <p className="font-semibold text-white">
                {!isAmerican
                  ? convertAmericanToDecimal(currentPick?.odds)
                  : currentPick?.odds}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-400">
              Risk Amount ($)
            </label>
            <div className="w-full">
              <NumericFormat
                value={currentTicket?.amount ?? ''}
                onValueChange={(v) => {
                  const val = parseFloat(v.value);
                  handleSetAmount(Number.isNaN(val) ? 0 : val);
                }}
                className="w-full align-middle text-base font-normal tracking-normal"
                customInput={Input}
                thousandSeparator
                placeholder="Your amount"
                allowNegative={false}
              />
              {!currentTicket?.amount && (
                <p className="text-destructive mt-1 text-sm">
                  Enter valid amount
                </p>
              )}
            </div>
          </div>
          <p>Win Amount ($): ${currentTicket?.win_amount}</p>
        </div>
      </div>
    </CardContainer>
  );
};

export default TrackGameCard;
