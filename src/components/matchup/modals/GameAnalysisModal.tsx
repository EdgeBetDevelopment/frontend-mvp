'use client';

import React from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import CardContainer from '@/components/ui/containers/CardContainer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useStore } from '@/store';
import { ITeam } from '@/types/game';

import ClockBackIcon from '@/assets/icons/clock-back.svg';
import StatisticsIcon from '@/assets/icons/statistics.svg';
import NFLLogoImage from '@/assets/nflLogo.png';

interface IGameAnalysisModal {
  open: boolean;
  onClose: () => void;
}

const GameAnalysisModal = ({ open, onClose }: IGameAnalysisModal) => {
  const { selectedGame: game } = useStore();

  if (!game) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle>Detailed write-ups for projections</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-3.5">
            <CardContainer className="tl-gradient-mistBlue flex max-w-[400px] flex-col gap-2 rounded-2xl">
              <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
                <StatisticsIcon />
                Player Performance Trends +0.4
              </div>

              <CardContainer className="tl-paraghraph2 rounded-xl">
                Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </CardContainer>
            </CardContainer>
          </div>
          <CardContainer className="tl-gradient-mistBlue flex flex-col gap-2 rounded-2xl">
            <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
              <ClockBackIcon />
              Historical Outcomes +1.2
            </div>

            <div className="flex items-center gap-2.5">
              <AnalysisTeamCard team={game.homeTeam} />
              <AnalysisTeamCard team={game.awayTeam} />
            </div>
          </CardContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameAnalysisModal;

const AnalysisTeamCard = ({ team }: { team: ITeam }) => {
  return (
    <CardContainer className="flex flex-col gap-2 rounded-xl p-3">
      <div className="tl-paraghraph2 flex items-center gap-2">
        <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
          <div>
            <AvatarImage src={NFLLogoImage.src} />
          </div>
        </Avatar>

        <div className="text-text-primary">{team.teamName}</div>
      </div>

      <div className="tl-paraghraph3">
        Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge size="md" variant="green">
          <span className="text-text-primary">Number of wins</span> {team.wins}
        </Badge>
        <Badge size="md" variant="orange">
          <span className="text-text-primary">In draws</span> 20
        </Badge>
        <Badge size="md" variant="red">
          <span className="text-text-primary">Losses</span> {team.losses}
        </Badge>
      </div>
    </CardContainer>
  );
};
