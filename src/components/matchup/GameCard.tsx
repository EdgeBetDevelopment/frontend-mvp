'use client';

import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';

import { IGameWithAI } from '@/types/game';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import CardContainer from '../../ui/containers/CardContainer';

import CalendarIcon from '@/assets/icons/calendar.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import NFLLogoImage from '@/assets/nflLogo.png';
import TeamLogo1Image from '@/assets/teamLogo1.png';
import TeamLogo2Image from '@/assets/teamLogo2.png';

interface IGameCard {
  game: IGameWithAI;
  onClickFullAnalysis: () => void;
  onClickTrackBet: () => void;
}

const GameCard = ({
  game,
  onClickFullAnalysis,
  onClickTrackBet,
}: IGameCard) => {
  const formattedDate = dayjs(game.game.start_time).format('MM/DD/YYYY');
  const formattedTime = dayjs(game.game.start_time).format('HH:mm');

  const isHomePredicted =
    game.prediction.predicted_winner === game.game.home_team;

  const recommendedBet = isHomePredicted
    ? {
        label: 'Recommended bet',
        team: game.game.home_team,
        odd: game.prediction.odds_home,
      }
    : {
        label: 'Recommended bet',
        team: game.game.away_team,
        odd: game.prediction.odds_away,
      };

  const saferBet = !isHomePredicted
    ? {
        label: 'Safer bet',
        team: game.game.home_team,
        odd: game.prediction.odds_home,
      }
    : {
        label: 'Safer bet',
        team: game.game.away_team,
        odd: game.prediction.odds_away,
      };

  return (
    <CardContainer className="tl-gradient-mistBlue border-border flex flex-col gap-3">
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
            <Link href={'#'} className="text-text-primary">
              {game.game.home_team}
            </Link>
            <div>vs</div>
            <Link href={'#'} className="text-text-primary">
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
              <AvatarImage src={NFLLogoImage.src} />
            </div>
          </Avatar>
          NFL
          <ChevronRightIcon className="text-text-secondary" />
          NFC North Wild Card Playoff Game
        </div>

        <div className="tl-paraghraph2 text-text-primary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
          similique.
        </div>

        <div>
          <Button onClick={onClickFullAnalysis} variant="clear">
            Full analysis <ChevronRightIcon />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge size="md" variant="mistBlue">
            {recommendedBet.label}:{' '}
            <span className="text-text-primary">{recommendedBet.odd}</span>
          </Badge>

          <Badge size="md" variant="mistBlue">
            Best value <span className="text-text-primary">2.29</span>
          </Badge>

          <Badge size="md" variant="mistBlue">
            {saferBet.label}:{' '}
            <span className="text-text-primary">{saferBet.odd}</span>
          </Badge>
        </div>

        <Button onClick={onClickTrackBet} variant="gradient" className="w-full">
          Track bet
        </Button>
      </div>
    </CardContainer>
  );
};

export default GameCard;
