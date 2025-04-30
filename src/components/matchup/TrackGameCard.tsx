'use client';

import React from 'react';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { IGame } from '@/types/game';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import CardContainer from '../../ui/containers/CardContainer';
import { Input } from '../../ui/input';

import CalendarIcon from '@/assets/icons/calendar.svg';
import CancelIcon from '@/assets/icons/cancel.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import NFLLogoImage from '@/assets/nflLogo.png';
import TeamLogo1Image from '@/assets/teamLogo1.png';
import TeamLogo2Image from '@/assets/teamLogo2.png';

interface ITrackGameCard {
  game: IGame;
  onClickFullAnalysis: () => void;
  onClickClearTrackBet: () => void;
}

const TrackGameCard = ({
  game,
  onClickFullAnalysis,
  onClickClearTrackBet,
}: ITrackGameCard) => {
  const formattedDate = dayjs(game.gameTimeUTC).format('MM/DD/YYYY');
  const formattedTime = dayjs(game.gameTimeUTC).format('HH:mm');

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
    <CardContainer className="tl-gradient-mistBlue border-border relative flex flex-col gap-3">
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
            <AvatarImage src={TeamLogo1Image.src} />
          </Avatar>

          <div className="relative -left-3.5">
            <Avatar className="border-border bg-surface-secondary h-11 w-11 rounded-full border p-1.5">
              <AvatarImage src={TeamLogo2Image.src} />
            </Avatar>
          </div>
        </div>

        <div>
          <div className="tl-paraghraph2 flex items-center gap-1">
            <div className="text-text-primary">{game.homeTeam.teamName}</div>
            <div>vs</div>
            <div className="text-text-primary">{game.awayTeam.teamName}</div>
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
              <AvatarImage src={NFLLogoImage.src} />
            </div>
          </Avatar>

          <div>NFL</div>

          <div>
            <ChevronRightIcon className="text-text-secondary h-[25px] w-[25px]" />
          </div>

          <div
            title="NFC North Wild Card Playoff Game"
            className="line-clamp-1"
          >
            NFC North Wild Card Playoff Game
          </div>
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
                selectedTeam?.teamId === game.homeTeam.teamId
                  ? 'mistBlue'
                  : 'outline'
              }
              className="flex flex-1 items-center gap-2"
              onClick={() => handleTeamSelect(game.homeTeam)}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={TeamLogo1Image.src} />
              </Avatar>
              {game.homeTeam.teamName}
            </Button>

            <Button
              type="button"
              variant={
                selectedTeam?.teamId === game.awayTeam.teamId
                  ? 'mistBlue'
                  : 'outline'
              }
              className="flex flex-1 items-center gap-2"
              onClick={() => handleTeamSelect(game.awayTeam)}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={TeamLogo2Image.src} />
              </Avatar>
              {game.awayTeam.teamName}
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
