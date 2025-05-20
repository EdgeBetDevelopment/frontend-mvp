'use client';

import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
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

        <div className="flex max-h-[70vh] flex-col gap-3.5">
          <Card
            title="Prediction"
            icon={<StatisticsIcon />}
            className="w-full flex-1/3"
          >
            <CardContainer className="tl-paraghraph2 max-h-[250px] overflow-y-auto rounded-xl">
              {game.prediction?.analysis}
            </CardContainer>
          </Card>

          <div className="flex items-stretch gap-3.5">
            <Card
              title="Favorite Team"
              icon={<StatisticsIcon />}
              className="flex-1/2"
            >
              <CardContainer className="tl-paraghraph2 flex flex-1 items-center gap-2 rounded-xl">
                <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
                  <div>
                    <AvatarImage src={favoriteTeamInfo?.logo} />
                  </div>
                </Avatar>

                <Link
                  href={ROUTES.TEAM(favoriteTeamInfo?.id || '')}
                  className="text-text-primary hover:underline"
                >
                  {favoriteTeamInfo?.name}
                </Link>
              </CardContainer>
            </Card>

            <Card
              title="Predicted Winner"
              icon={<StatisticsIcon />}
              className="flex-1/2"
            >
              <CardContainer className="tl-paraghraph2 flex flex-1 items-center gap-2 rounded-xl">
                <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
                  <div>
                    <AvatarImage src={predictedWinnerInfo?.logo} />
                  </div>
                </Avatar>
                <Link
                  href={ROUTES.TEAM(predictedWinnerInfo?.id || '')}
                  className="text-text-primary hover:underline"
                >
                  {predictedWinnerInfo?.name}
                </Link>
              </CardContainer>
            </Card>
          </div>

          <Card title="Historical Outcomes" icon={<ClockBackIcon />}>
            <div className="flex items-center gap-2.5">
              <AnalysisTeamCard
                id={game.game.home_team_id || ''}
                name={game.game.home_team}
                logo={game.game.home_team_logo}
                winProbability={game.prediction?.win_probability_home}
                odd={game.prediction?.odds_home}
              />
              <AnalysisTeamCard
                id={game.game.away_team_id || ''}
                name={game.game.away_team}
                logo={game.game.away_team_logo}
                winProbability={game.prediction?.win_probability_away}
                odd={game.prediction?.odds_away}
              />
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameAnalysisModal;

const Card = ({
  children,
  className,
  title,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <CardContainer
      className={cn(
        'tl-gradient-mistBlue flex flex-1/2 flex-col gap-2 rounded-2xl',
        className,
      )}
    >
      <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
        {icon}
        {title}
      </div>

      {children}
    </CardContainer>
  );
};

const AnalysisTeamCard = ({
  id,
  name,
  winProbability = 0,
  odd = 0,
  logo,
}: {
  id: string | number;
  name: string;
  winProbability?: number;
  odd?: number;
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
        <p>Win Probability: {((winProbability || 0) * 100).toFixed(0)}%</p>
        <p>Odd: {(odd || 0).toFixed(2)}</p>
      </div>
    </CardContainer>
  );
};
