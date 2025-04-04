'use client';

import React from 'react';
import dayjs from 'dayjs';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IGame } from '@/types/game';
import CardContainer from '../ui/containers/CardContainer';

import CalendarIcon from '@/assets/icons/calendar.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import NFLLogoImage from '@/assets/nflLogo.png';
import TeamLogo1Image from '@/assets/teamLogo1.png';
import TeamLogo2Image from '@/assets/teamLogo2.png';

interface IGameCard {
  game: IGame;
  onClickFullAnalysis: () => void;
  onClickTrackBet: () => void;
}

const GameCard = ({
  game,
  onClickFullAnalysis,
  onClickTrackBet,
}: IGameCard) => {
  const formattedDate = dayjs(game.gameTimeUTC).format('MM/DD/YYYY');
  const formattedTime = dayjs(game.gameTimeUTC).format('HH:mm');

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
          NFL
          <ChevronRightIcon className="text-text-secondary" />
          NFC North Wild Card Playoff Game
        </div>

        <div className="tl-paraghraph2 text-text-primary">
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </div>

        <div>
          <Button onClick={onClickFullAnalysis} variant="clear">
            Full analysis <ChevronRightIcon />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge size="md" variant="mistBlue">
            Recommended bet <span className="text-text-primary">1.61</span>
          </Badge>

          <Badge size="md" variant="mistBlue">
            Best value <span className="text-text-primary">2.29</span>
          </Badge>

          <Badge size="md" variant="mistBlue">
            Safer bet <span className="text-text-primary">1.4</span>
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
