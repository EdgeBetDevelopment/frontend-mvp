'use client';

import React from 'react';
import Link from 'next/link';

import { ROUTES } from '@/routes';
import { IGameWithAI } from '@/types/game';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { formatUtcToLocalDate, formatUtcToLocalTime } from '@/utils/time';
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
  const formattedDate = formatUtcToLocalDate(game.game.start_time);
  const formattedTime = formatUtcToLocalTime(game.game.start_time);

  const isHomePredicted =
    game.prediction?.predicted_winner === game.game.home_team;

  const recommendedBet = isHomePredicted
    ? {
        label: 'Recommended bet',
        team: game.game.home_team,
        odd: game.prediction?.odds_home,
      }
    : {
        label: 'Recommended bet',
        team: game.game.away_team,
        odd: game.prediction?.odds_away,
      };

  const saferBet = !isHomePredicted
    ? {
        label: 'Safer bet',
        team: game.game.home_team,
        odd: game.prediction?.odds_home,
      }
    : {
        label: 'Safer bet',
        team: game.game.away_team,
        odd: game.prediction?.odds_away,
      };

  return (
    <CardContainer className="tl-gradient-mistBlue border-border flex flex-col gap-3">
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
          {type ? type.toUpperCase() : 'NBA'}
          <ChevronRightIcon className="text-text-secondary" />
          NFC North Wild Card Playoff Game
        </div>

        <div className="tl-paraghraph2 text-text-primary line-clamp-1">
          {game.prediction?.analysis}
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

        <div className="flex flex-col items-center gap-2">
          <Badge className="w-full" size="md" variant="mistBlue">
            {recommendedBet.label}:{' '}
            <span className="text-text-primary">{recommendedBet.odd}</span>
          </Badge>

          <div className="flex w-full items-center gap-2">
            <Badge className="flex-1" size="md" variant="mistBlue">
              Best value <span className="text-text-primary">2.29</span>
            </Badge>

            <Badge className="flex-1" size="md" variant="mistBlue">
              {saferBet.label}:{' '}
              <span className="text-text-primary">{saferBet.odd}</span>
            </Badge>
          </div>
        </div>

        <Button onClick={onClickTrackBet} variant="gradient" className="w-full">
          Track bet
        </Button>
      </div>
    </CardContainer>
  );
};

export default GameCard;
