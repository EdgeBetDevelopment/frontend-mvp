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
import NBALogoIcon from '@/assets/nbaLogo.png';

interface ITrackGameCard {
  game: IGameWithAI;
  onClickFullAnalysis: () => void;
  onClickClearTrackBet: () => void;
  index: number;
}

const TrackGameCard = ({
  game,
  onClickFullAnalysis,
  onClickClearTrackBet,
  index,
}: ITrackGameCard) => {
  const formattedDate = formatUtcToLocalDate(game.game.start_time);
  const formattedTime = formatUtcToLocalTimeAmPm(game.game.start_time);

  const { prefillBets, setPrefillBetField } = useStore();
  const bet = prefillBets[index];

  const selectedTeam = bet.team;

  console.log(bet);

  return (
    <CardContainer className="tl-gradient-mistBlue-opacity border-border relative flex flex-col gap-3">
      <Button
        className="absolute top-1 right-1"
        variant="clear"
        size="icon"
        onClick={onClickClearTrackBet}
      >
        <CancelIcon />
      </Button>

      <div className="flex items-center">
        <div className="relative flex items-center">
          <Avatar className="border-border bg-surface-secondary h-11 w-11 rounded-full border p-1.5">
            <AvatarImage src={game.game.home_team_logo} />
          </Avatar>

          <div className="relative -left-3.5">
            <Avatar className="border-border bg-surface-secondary h-11 w-11 rounded-full border p-1.5">
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

      <div className="bg-surface-secondary border-border flex flex-col gap-4 rounded-3xl border p-3">
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

        <div>
          <Button onClick={onClickFullAnalysis} variant="clear">
            Full analysis <ChevronRightIcon />
          </Button>
        </div>

        {/* Team Selection */}
        {selectedTeam && (
          <div className="flex flex-col gap-3">
            <p className="text-text-dark mb-3 block text-lg font-normal tracking-normal">
              Choose a team to track:
            </p>
            <div className="flex justify-around gap-4">
              <Button
                type="button"
                variant={
                  bet.team === game.game.home_team ? 'mistBlue' : 'outline'
                }
                className="flex flex-1 items-center gap-2"
                onClick={() =>
                  setPrefillBetField(index, 'team', game.game.home_team)
                }
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={game.game.home_team_logo} />
                </Avatar>
                {game.game.home_team}
              </Button>

              <Button
                type="button"
                variant={
                  bet.team === game.game.away_team ? 'mistBlue' : 'outline'
                }
                className="flex flex-1 items-center gap-2"
                onClick={() =>
                  setPrefillBetField(index, 'team', game.game.away_team)
                }
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={game.game.away_team_logo} />
                </Avatar>
                {game.game.away_team}
              </Button>
            </div>
            {!bet.team && (
              <p className="text-destructive mt-1 text-sm">
                Please select a team
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <NumericFormat
              value={bet.odds ?? ''}
              onValueChange={(values) => {
                const value = parseFloat(values.value);
                setPrefillBetField(index, 'odds', isNaN(value) ? 0 : value);
              }}
              label="Betting odds"
              className="align-middle text-base font-normal tracking-normal"
              customInput={Input}
              decimalSeparator="."
              placeholder="Your odds"
              allowNegative={false}
            />
            {(bet.odds === undefined || bet.odds === 0) && (
              <p className="text-destructive mt-1 text-sm">Enter valid odds</p>
            )}
          </div>

          <div className="w-full">
            <NumericFormat
              value={bet.amount ?? ''}
              onValueChange={(values) => {
                const value = parseFloat(values.value);
                setPrefillBetField(index, 'amount', isNaN(value) ? 0 : value);
              }}
              label="Bet amount"
              className="align-middle text-base font-normal tracking-normal"
              customInput={Input}
              thousandSeparator
              prefix="$"
              placeholder="Your amount"
              allowNegative={false}
            />
            {!bet.amount && (
              <p className="text-destructive mt-1 text-sm">
                Enter valid amount
              </p>
            )}
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default TrackGameCard;
