'use client';

import React from 'react';
import Link from 'next/link';

import { ROUTES } from '@/routes';
import { useStore } from '@/store';
import { Avatar, AvatarImage } from '@/ui/avatar';
import CardContainer from '@/ui/containers/CardContainer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { getTeamInfoByName } from '@/utils/team';

import ClockBackIcon from '@/assets/icons/clock-back.svg';
import StatisticsIcon from '@/assets/icons/statistics.svg';

interface IGameAnalysisModal {
  open: boolean;
  onClose: () => void;
}

const GameAnalysisModal = ({ open, onClose }: IGameAnalysisModal) => {
  const { selectedGame: game } = useStore();

  if (!game) {
    return null;
  }

  const predictedWinnerInfo = getTeamInfoByName(
    game.prediction?.predicted_winner,
    game.game,
  );
  const favoriteTeamInfo = getTeamInfoByName(
    game.prediction?.favorite_team,
    game.game,
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle>Detailed write-ups for projections</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[70vh] flex-col gap-3.5 overflow-y-auto">
          <CardContainer className="tl-gradient-mistBlue flex w-full flex-1/3 flex-col gap-2 rounded-2xl">
            <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
              <StatisticsIcon />
              Prediction
            </div>

            <CardContainer className="tl-paraghraph2 h-52 overflow-y-auto rounded-xl">
              {game.prediction?.analysis}
            </CardContainer>
          </CardContainer>

          <div className="flex items-stretch gap-3.5">
            <CardContainer className="tl-gradient-mistBlue flex flex-1/2 flex-col gap-2 rounded-2xl">
              <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
                <StatisticsIcon />
                Favorite Team
              </div>

              <CardContainer className="tl-paraghraph2 flex flex-1 items-center gap-2 rounded-xl">
                <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
                  <div>
                    <AvatarImage src={favoriteTeamInfo?.logo} />
                  </div>
                </Avatar>

                <Link
                  href={ROUTES.TEAM(favoriteTeamInfo?.id)}
                  className="text-text-primary hover:underline"
                >
                  {favoriteTeamInfo?.name}
                </Link>
              </CardContainer>
            </CardContainer>

            <CardContainer className="tl-gradient-mistBlue flex flex-1/2 flex-col gap-2 rounded-2xl">
              <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
                <StatisticsIcon />
                Predicted Winner
              </div>

              <CardContainer className="tl-paraghraph2 flex flex-1 items-center gap-2 rounded-xl">
                <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
                  <div>
                    <AvatarImage src={predictedWinnerInfo?.logo} />
                  </div>
                </Avatar>
                <Link
                  href={ROUTES.TEAM(predictedWinnerInfo?.id)}
                  className="text-text-primary hover:underline"
                >
                  {predictedWinnerInfo?.name}
                </Link>
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
                id={game.game.home_team_id}
                name={game.game.home_team}
                logo={game.game.home_team_logo}
                winProbability={game.prediction?.win_probability_home}
                odd={game.prediction?.odds_home}
              />
              <AnalysisTeamCard
                id={game.game.away_team_id}
                name={game.game.away_team}
                logo={game.game.away_team_logo}
                winProbability={game.prediction?.win_probability_away}
                odd={game.prediction?.odds_away}
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
  id,
  name,
  winProbability,
  odd,
  logo,
}: {
  id: string | number;
  name: string;
  winProbability: number;
  odd: number;
  logo: string;
}) => {
  return (
    <CardContainer className="flex w-full flex-col gap-2 rounded-xl p-3">
      <div className="tl-paraghraph2 flex items-center gap-2">
        <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
          <div>
            <AvatarImage src={logo} />
          </div>
        </Avatar>

        <Link
          href={ROUTES.TEAM(id)}
          className="text-text-primary hover:underline"
        >
          {name}
        </Link>
      </div>

      <div className="tl-paraghraph3">
        <p>Win Probability: {winProbability * 100}%</p>
        <p>Odd: {odd}</p>
      </div>
    </CardContainer>
  );
};
