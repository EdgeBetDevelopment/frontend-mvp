'use client';

import React from 'react';
import Link from 'next/link';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { ROUTES } from '@/routes';
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
}

const TrackGameCard = ({
  game,
  onClickFullAnalysis,
  onClickClearTrackBet,
}: ITrackGameCard) => {
  const formattedDate = formatUtcToLocalDate(game.game.start_time);
  const formattedTime = formatUtcToLocalTimeAmPm(game.game.start_time);

  const {
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();
  const selectedTeam = watch('team');

  const handleTeamSelect = (team: any) => {
    setValue('team', team, { shouldValidate: true });
    trigger('team');
  };

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
        <div className="flex flex-col gap-3">
          <p className="text-text-dark mb-3 block text-lg font-normal tracking-normal">
            Choose a team to track:
          </p>
          <div className="flex justify-around gap-4">
            <Button
              type="button"
              variant={
                selectedTeam === game.game.home_team ? 'mistBlue' : 'outline'
              }
              className="flex flex-1 items-center gap-2"
              onClick={() => handleTeamSelect(game.game.home_team)}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={game.game.home_team_logo} />
              </Avatar>
              {game.game.home_team}
            </Button>

            <Button
              type="button"
              variant={
                selectedTeam === game.game.away_team ? 'mistBlue' : 'outline'
              }
              className="flex flex-1 items-center gap-2"
              onClick={() => handleTeamSelect(game.game.away_team)}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={game.game.away_team_logo} />
              </Avatar>
              {game.game.away_team}
            </Button>
          </div>
          {errors.team && (
            <p className="text-destructive text-sm">
              {errors.team.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <Controller
              name="odds"
              control={control}
              rules={{ required: true, min: 0.01 }}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  label="Betting odds"
                  className="align-middle text-base font-normal tracking-normal"
                  customInput={Input}
                  decimalSeparator="."
                  placeholder="Your odds"
                  allowNegative={false}
                />
              )}
            />
            {errors.odds && (
              <p className="text-destructive mt-1 text-sm">
                {errors.odds.message as string}
              </p>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="amount"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    const parsedValue = Number(
                      rawValue.replace(/[^0-9.]/g, ''),
                    );
                    field.onChange(parsedValue);
                  }}
                  label="Bet amount"
                  className="align-middle text-base font-normal tracking-normal"
                  customInput={Input}
                  thousandSeparator
                  prefix="$"
                  placeholder="Your amount"
                  allowNegative={false}
                />
              )}
            />
            {errors.amount && (
              <p className="text-destructive mt-1 text-sm">
                {errors.amount.message as string}
              </p>
            )}
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default TrackGameCard;
