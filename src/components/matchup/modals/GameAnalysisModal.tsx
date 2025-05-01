'use client';

import React from 'react';

import { useStore } from '@/store';
import { Avatar, AvatarImage } from '@/ui/avatar';
import CardContainer from '@/ui/containers/CardContainer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';

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
          <div className="flex items-stretch gap-3.5">
            <CardContainer className="tl-gradient-mistBlue flex max-w-[400px] flex-1/3 flex-col gap-2 rounded-2xl">
              <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
                <StatisticsIcon />
                Prediction
              </div>

              <CardContainer className="tl-paraghraph2 rounded-xl">
                {game.prediction.analysis}
              </CardContainer>
            </CardContainer>

            <CardContainer className="tl-gradient-mistBlue flex max-w-[400px] flex-1/3 flex-col gap-2 rounded-2xl">
              <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
                <StatisticsIcon />
                Favorite Team
              </div>

              <CardContainer className="tl-paraghraph2 flex flex-1 items-center gap-2 rounded-xl">
                <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
                  <div>
                    <AvatarImage src={NFLLogoImage.src} />
                  </div>
                </Avatar>
                {game.prediction.favorite_team}
              </CardContainer>
            </CardContainer>

            <CardContainer className="tl-gradient-mistBlue flex max-w-[400px] flex-1/3 flex-col gap-2 rounded-2xl">
              <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
                <StatisticsIcon />
                Predicted Winner
              </div>

              <CardContainer className="tl-paraghraph2 flex flex-1 items-center gap-2 rounded-xl">
                <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
                  <div>
                    <AvatarImage src={NFLLogoImage.src} />
                  </div>
                </Avatar>
                {game.prediction.predicted_winner}
              </CardContainer>
            </CardContainer>
          </div>
          <CardContainer className="tl-gradient-mistBlue flex flex-col gap-2 rounded-2xl">
            <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
              <ClockBackIcon />
              Historical Outcomes +1.2
            </div>

            <div className="flex items-center gap-2.5">
              <AnalysisTeamCard
                name={game.game.home_team}
                winProbability={game.prediction.win_probability_home}
                odd={game.prediction.odds_home}
              />
              <AnalysisTeamCard
                name={game.game.away_team}
                winProbability={game.prediction.win_probability_away}
                odd={game.prediction.odds_away}
              />
            </div>
          </CardContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameAnalysisModal;

const AnalysisTeamCard = ({
  name,
  winProbability,
  odd,
}: {
  name: string;
  winProbability: number;
  odd: number;
}) => {
  return (
    <CardContainer className="flex w-full flex-col gap-2 rounded-xl p-3">
      <div className="tl-paraghraph2 flex items-center gap-2">
        <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
          <div>
            <AvatarImage src={NFLLogoImage.src} />
          </div>
        </Avatar>

        <div className="text-text-primary">{name}</div>
      </div>

      <div className="tl-paraghraph3">
        <p>Win Probability: {winProbability * 100}%</p>
        <p>Odd: {odd}</p>
      </div>

      {/* <div className="flex flex-wrap items-center gap-2">
        <Badge size="md" variant="green">
          <span className="text-text-primary">Number of wins</span> {team?.wins}
        </Badge>
        {team?.draws && (
          <Badge size="md" variant="orange">
            <span className="text-text-primary">In draws</span> {team?.draws}
          </Badge>
        )}
        <Badge size="md" variant="red">
          <span className="text-text-primary">Losses</span> {team?.losses}
        </Badge>
      </div> */}
    </CardContainer>
  );
};
