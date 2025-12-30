'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import GameAnalysisModal from '@/components/modals/game-analysis';
import TrackBetsModal from '@/components/modals/TrackBetsModal';
import useModalManager from '@/hooks/useModalManager';
import { cn } from '@/lib/utils';
import apiService from '@/services';
import { useStore } from '@/store';
import { IGame } from '@/types/game';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import CardContainer from '@/ui/containers/CardContainer';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/utils/time';

import GridBgImage from '@/assets/gridBg.png';
import CalendarIcon from '@/assets/icons/calendar.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import NBALogoIcon from '@/assets/nbaLogo.png';
import TeamLogo1Image from '@/assets/teamLogo1.png';
export type CardSize = 'single' | 'multiple';

const CardSizeContext = createContext<CardSize>('multiple');

export const useCardSize = () => useContext(CardSizeContext);

export const CardSizeProvider = ({
  children,
  size,
}: {
  children: React.ReactNode;
  size: CardSize;
}) => {
  return (
    <CardSizeContext.Provider value={size}>{children}</CardSizeContext.Provider>
  );
};

const PickOfDayPage = () => {
  return (
    <div className="tl-container relative mb-[60px]">
      <div className="bg-primary-brand/60 absolute left-1/2 top-1/3 -z-10 h-[250px] w-1/3 -translate-x-1/2 rounded-full blur-[200px]" />
      <div
        style={{ backgroundImage: `url(${GridBgImage.src})` }}
        className="absolute inset-0 -z-10 h-full w-full"
      />

      {/* <FreePickOfDay /> */}

      <PremiumPickOfDay />
    </div>
  );
};

export default PickOfDayPage;

const FreePickOfDay = () => {
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { setTrackedGame, setSelectedGame } = useStore();
  const [picks, setPicks] = useState<any[]>([]);

  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const data = await apiService.getPickOfTheDayList();
        console.log('Free Picks:', data);
        setPicks(data);
      } catch (err) {
        console.error('Failed to fetch free picks', err);
      }
    };

    fetchPicks();
  }, []);

  const onClickFullAnalysis = (game: IGame) => {
    setSelectedGame(game);
    openModal('gameAnalysis');
  };

  const onClickCloseModal = () => {
    closeModal('gameAnalysis');
    setSelectedGame(null);
  };

  const onClickTrackBet = (game: IGame | null) => {
    setTrackedGame(game);
    openModal('track-bet');
  };

  const onClickClearTrackBet = () => {
    setTrackedGame(null);
    closeModal('track-bet');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="text-center align-bottom text-6xl font-medium capitalize">
          today’s Free Pick
        </div>

        <CardSizeProvider size="multiple">
          <div className="flex flex-wrap justify-center gap-8">
            {picks.map((pick, index) => (
              <PickCard
                key={index}
                data={pick}
                onClickTrackBet={() => onClickTrackBet(null)}
                onClickFullAnalysis={() => onClickFullAnalysis(pick)}
              />
            ))}
          </div>
        </CardSizeProvider>
      </div>

      <GameAnalysisModal
        open={isModalOpen('gameAnalysis')}
        onClose={onClickCloseModal}
      />

      <TrackBetsModal
        isOpen={isModalOpen('track-bet')}
        onClose={onClickClearTrackBet}
      />
    </>
  );
};

const PremiumPickOfDay = () => {
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { setTrackedGame, setSelectedGame } = useStore();

  const {
    data: picks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['picks'],
    queryFn: () => apiService.getPickOfTheDayList(),
  });

  const onClickFullAnalysis = (game: IGame) => {
    const simplifiedGame = {
      id: game?.game_prediction?.id,
      game: {
        ...game?.game_prediction?.game,
        home_team_id: game?.game_prediction?.home_team_id,
        home_team_logo: game?.game_prediction?.home_team_logo,
        away_team_logo: game?.game_prediction?.away_team_logo,
        away_team_id: game?.game_prediction?.away_team_id,
        home_team: game?.game_prediction?.game?.home_team,
        away_team: game?.game_prediction?.game?.away_team,
      },
      prediction: {
        win_probability_away: game?.game_prediction?.win_probability_away,
        win_probability_home: game?.game_prediction?.win_probability_home,
        odds_away: game?.game_prediction?.odds_away,
        odds_home: game?.game_prediction?.odds_home,
        favorite_team: game?.game_prediction?.favorite_team,
        predicted_winner: game?.game_prediction?.predicted_winner,
        analysis: game?.game_prediction?.analysis,
      },
      nba_game_id: game?.game_prediction?.game?.nba_game_id,
      start_time: game?.game_prediction?.game?.start_time,
      status: game?.game_prediction?.game?.status,
      final_score: game?.game_prediction?.game?.final_score,
      scoreboard: null,
    };

    setSelectedGame(simplifiedGame);
    openModal('gameAnalysis');
  };

  const onClickCloseModal = () => {
    closeModal('gameAnalysis');
    setSelectedGame(null);
  };

  const onClickTrackBet = (game: IGame | null) => {
    const simplifiedGame = {
      game: {
        id: game?.game_prediction?.game?.id,
        game_prediction: game?.game_prediction,
        home_team_id: game?.game_prediction?.home_team_id,
        home_team_logo: game?.game_prediction?.home_team_logo,
        away_team_logo: game?.game_prediction?.away_team_logo,
        away_team_id: game?.game_prediction?.away_team_id,
        home_team: game?.game_prediction?.game?.home_team,
        away_team: game?.game_prediction?.game?.away_team,
        start_time: game?.game_prediction?.game?.start_time,
        status: game?.game_prediction?.game?.status,
        final_score: game?.game_prediction?.game?.final_score,
        nba_game_id: game?.game_prediction?.game?.nba_game_id,
      },
      prediction: {
        win_probability_away: game?.game_prediction?.win_probability_away,
        win_probability_home: game?.game_prediction?.win_probability_home,
        odds_away: game?.game_prediction?.odds_away,
        odds_home: game?.game_prediction?.odds_home,
        favorite_team: game?.game_prediction?.favorite_team,
        predicted_winner: game?.game_prediction?.predicted_winner,
        analysis: game?.game_prediction?.analysis,
      },
      scoreboard: null,
    };
    console.log(simplifiedGame);
    setTrackedGame(simplifiedGame);
    openModal('track-bet');
  };

  const onClickClearTrackBet = () => {
    setTrackedGame(null);
    closeModal('track-bet');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="text-center align-bottom text-6xl font-medium capitalize">
          Your Premium Pick
        </div>

        <CardSizeProvider size={'multiple'}>
          <div className="grid w-full grid-cols-1 items-center justify-center gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {picks.map((pick, index) => (
              <PickCard
                key={index}
                data={pick}
                onClickTrackBet={() => onClickTrackBet(pick)}
                onClickFullAnalysis={() => onClickFullAnalysis(pick)}
              />
            ))}
          </div>
        </CardSizeProvider>
      </div>

      <GameAnalysisModal
        open={isModalOpen('gameAnalysis')}
        onClose={onClickCloseModal}
      />

      <TrackBetsModal
        isOpen={isModalOpen('track-bet')}
        onClose={onClickClearTrackBet}
      />
    </>
  );
};

interface IPickCard {
  data: any;
  onClickFullAnalysis?: () => void;
  onClickTrackBet: () => void;
}

export const PickCard = ({
  data,
  onClickFullAnalysis,
  onClickTrackBet,
}: IPickCard) => {
  const isSingle = useCardSize() === 'single';
  const formattedDate = formatUtcToLocalDate(
    data?.game_prediction?.game?.start_time,
  );
  const formattedTime = formatUtcToLocalTimeAmPm(
    data?.game_prediction?.game?.start_time,
  );

  const homeTeam = data?.game_prediction?.game?.home_team || 'Team A';
  const awayTeam = data?.game_prediction?.game?.away_team || 'Team B';
  const oddsHome = data?.game_prediction?.odds_home ?? '-';
  const oddsAway = data?.game_prediction?.odds_away ?? '-';

  const homeTeamLogo =
    data?.game_prediction?.home_team_logo || TeamLogo1Image.src;
  const awayTeamLogo =
    data?.game_prediction?.away_team_logo || TeamLogo1Image.src;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 overflow-hidden lg:max-w-[720px]">
      <div
        className={cn(
          'flex items-center gap-6',
          !isSingle && 'tl-flex-between w-full',
        )}
      >
        <TeamItem name={homeTeam} logo={homeTeamLogo} />
        <div
          className={`text-center align-bottom font-medium capitalize ${
            isSingle ? 'text-6xl' : 'text-4xl'
          }`}
        >
          VS
        </div>
        <TeamItem name={awayTeam} logo={awayTeamLogo} />
      </div>

      <CardContainer className="relative z-10 flex w-full flex-col gap-3 overflow-hidden border-border p-8">
        <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-full bg-[#337587] blur-[150px]" />

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
              <AvatarImage src={NBALogoIcon.src} />
            </Avatar>
            <div className={isSingle ? 'text-2xl' : 'text-xl'}>NFL</div>
            <ChevronRightIcon />
            <div className={isSingle ? 'text-2xl' : 'text-xl'}>
              {data?.game_prediction?.game?.title || 'NFC Wild Card Game'}
            </div>
          </div>

          <div
            className={`text-text-secondary flex items-center gap-4 align-middle font-normal tracking-normal ${
              isSingle ? 'text-xl' : 'text-sm'
            }`}
          >
            <div className="flex items-center gap-1">
              <CalendarIcon /> {formattedDate}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon /> {formattedTime}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <TeamOddItem name={homeTeam} odds={oddsHome} logo={homeTeamLogo} />
            <TeamOddItem name={awayTeam} odds={oddsAway} logo={awayTeamLogo} />
          </div>

          {!isSingle && onClickFullAnalysis && (
            <div>
              <Button onClick={onClickFullAnalysis} variant="clear">
                Full analysis <ChevronRightIcon />
              </Button>
            </div>
          )}

          <Button
            onClick={onClickTrackBet}
            variant="gradient"
            className="w-full"
          >
            Bet Now
          </Button>
        </div>
      </CardContainer>
    </div>
  );
};

const TeamItem = ({ name, logo }: { name: string; logo: string }) => {
  const isSingle = useCardSize() === 'single';

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-[#33758780] px-4 py-2">
      <Avatar className="h-11 w-11 rounded-full p-1.5">
        <AvatarImage src={logo} />
      </Avatar>
      <div
        className={`text-center align-bottom font-bold tracking-normal ${
          isSingle ? 'text-2xl' : 'text-base'
        }`}
      >
        {name}
      </div>
    </div>
  );
};

const TeamOddItem = ({
  name,
  odds,
  logo,
}: {
  name: string;
  odds: string | number;
  logo: string;
}) => {
  const isSingle = useCardSize() === 'single';

  return (
    <div className="tl-flex-between">
      <div className="flex items-center gap-3">
        <Avatar className="bg-surface-secondary h-11 w-11 rounded-full border border-border p-1.5">
          <AvatarImage src={logo} />
        </Avatar>
        <div
          className={`text-center align-bottom font-bold tracking-normal ${
            isSingle ? 'text-2xl' : 'text-base'
          }`}
        >
          {name}
        </div>
      </div>

      <div
        className={`rounded-xl bg-[#33758780] px-6 py-2 text-center align-bottom font-semibold capitalize ${
          isSingle ? 'text-2xl' : 'text-base'
        }`}
      >
        {odds}
      </div>
    </div>
  );
};
