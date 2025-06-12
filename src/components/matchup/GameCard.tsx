'use client';

import React from 'react';
import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes';
import { IGameWithAI } from '@/types/game';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/utils/time';
import CardContainer from '../../ui/containers/CardContainer';

import CalendarIcon from '@/assets/icons/calendar.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import NBALogoIcon from '@/assets/nbaLogo.png';

interface IGameCard {
  game: IGameWithAI;
  onClickFullAnalysis: () => void;
  onClickTrackBet: () => void;
  type: string | null;
}

const GameCard = ({
  game,
  onClickFullAnalysis,
  type,
  onClickTrackBet,
}: IGameCard) => {
  const { isAuthenticated } = useAuth();

  return (
    <CardContainer className="tl-gradient-mistBlue-opacity border-border flex flex-col gap-3">
      <GameCardHeader game={game} />

      <div className="bg-surface-secondary border-border flex flex-col gap-2.5 rounded-3xl border p-3">
        <div className="tl-paraghraph2 flex items-center gap-2">
          <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
            <div>
              <AvatarImage src={NBALogoIcon.src} />
            </div>
          </Avatar>
          {type ? type.toUpperCase() : 'NBA'}

          {game?.scoreboard?.label && (
            <>
              <ChevronRightIcon className="text-text-secondary" />
              {game?.scoreboard?.label}
            </>
          )}
        </div>

        <div>
          <Button
            className="pl-0!"
            onClick={onClickFullAnalysis}
            variant="clear"
          >
            Full analysis <ChevronRightIcon />
          </Button>
        </div>

        <Separator />

        {isAuthenticated && <GameBets game={game} />}

        <Button onClick={onClickTrackBet} variant="gradient" className="w-full">
          Track bet
        </Button>
      </div>
    </CardContainer>
  );
};

export default GameCard;

export const GameCardHeader = ({ game }: { game: IGameWithAI }) => {
  const formattedDate = formatUtcToLocalDate(game.game.start_time);
  const formattedTime = formatUtcToLocalTimeAmPm(game.game.start_time);

  return (
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
  );
};

const GameBets = ({ game }: { game: IGameWithAI }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-center text-lg font-semibold">
          Top 3 Best Value Bets
        </p>

        <div className="flex flex-col gap-2">
          {game.prediction?.value_bets
            ?.slice(0, 3)
            .map((bet, index) => <GameBetsItem key={index} text={bet} />)}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-center text-lg font-semibold">
          Top 3 Conservative Bets
        </p>

        <div className="flex flex-col gap-2">
          {game.prediction?.conservative_bets
            ?.slice(0, 3)
            .map((bet, index) => <GameBetsItem key={index} text={bet} />)}
        </div>
      </div>
    </div>
  );
};

const GameBetsItem = ({ text }: { text: string }) => {
  const afterColon = text.match(/:(.*)/)?.[1]?.trim() || text;

  return (
    <Badge
      variant="mistBlue"
      className="text-text-primary w-full rounded-[10px] bg-green-700 px-3 py-1.5 text-center text-base font-semibold break-words whitespace-normal"
    >
      {afterColon}
    </Badge>
  );
};
