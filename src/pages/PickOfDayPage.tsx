'use client';

import React, { createContext, useContext } from 'react';

import GameAnalysisModal from '@/components/matchup/modals/GameAnalysisModal';
import TrackBetsModal from '@/components/modals/TrackBetsModal';
import useModalManager from '@/hooks/useModalManager';
import { cn } from '@/lib/utils';
import { useStore } from '@/store';
import { IGame } from '@/types/game';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import CardContainer from '@/ui/containers/CardContainer';

import GridBgImage from '@/assets/gridBg.png';
import CalendarIcon from '@/assets/icons/calendar.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import NFLLogoImage from '@/assets/nflLogo.png';
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
      <div className="bg-primary-brand/60 absolute top-1/3 left-1/2 -z-10 h-[250px] w-1/3 -translate-x-1/2 rounded-full blur-[200px]" />
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
  const { setTrackedGame } = useStore();

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

        <CardSizeProvider size="single">
          <PickCard onClickTrackBet={() => onClickTrackBet(null)} />
        </CardSizeProvider>
      </div>

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
          Your Premium Pick
        </div>

        <CardSizeProvider size={'multiple'}>
          <div className="flex items-center gap-8">
            <PickCard
              onClickTrackBet={() => onClickTrackBet(null)}
              onClickFullAnalysis={() => onClickFullAnalysis({} as IGame)}
            />
            <PickCard
              onClickTrackBet={() => onClickTrackBet(null)}
              onClickFullAnalysis={() => onClickFullAnalysis({} as IGame)}
            />
            <PickCard
              onClickTrackBet={() => onClickTrackBet(null)}
              onClickFullAnalysis={() => onClickFullAnalysis({} as IGame)}
            />
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
  onClickFullAnalysis?: () => void;
  onClickTrackBet: () => void;
}

export const PickCard = ({
  onClickFullAnalysis,
  onClickTrackBet,
}: IPickCard) => {
  const isSingle = useCardSize() === 'single';

  return (
    <div className="flex w-full max-w-[720px] flex-col items-center justify-center gap-4 overflow-hidden">
      <div
        className={cn(
          'flex items-center gap-6',
          !isSingle && 'tl-flex-between w-full',
        )}
      >
        <TeamItem />

        <div
          className={`text-center align-bottom font-medium capitalize ${
            isSingle ? 'text-6xl' : 'text-4xl'
          }`}
        >
          VS
        </div>

        <TeamItem />
      </div>

      <CardContainer className="border-border relative z-10 flex w-full flex-col gap-3 overflow-hidden p-8">
        <div className="absolute top-0 left-0 -z-10 h-full w-full rounded-full bg-[#337587] blur-[150px]" />

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
              <AvatarImage src={NFLLogoImage.src} />
            </Avatar>
            <div className={isSingle ? 'text-2xl' : 'text-xl'}>NFL</div>
            <ChevronRightIcon />
            <div className={isSingle ? 'text-2xl' : 'text-xl'}>
              NFC North Wild Card Playoff Game
            </div>
          </div>

          <div
            className={`text-text-secondary flex items-center gap-4 align-middle font-normal tracking-normal ${
              isSingle ? 'text-xl' : 'text-sm'
            }`}
          >
            <div className="flex items-center gap-1">
              <CalendarIcon /> formattedDate
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon /> formattedTime
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <TeamOddItem />
            <TeamOddItem />
          </div>

          {!isSingle && (
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

export const TeamItem = () => {
  const isSingle = useCardSize() === 'single';

  return (
    <div className="border-border flex items-center gap-3 rounded-xl border bg-[#33758780] px-4 py-2">
      <Avatar className="h-11 w-11 rounded-full p-1.5">
        <AvatarImage src={TeamLogo1Image.src} />
      </Avatar>

      <div
        className={`text-center align-bottom font-bold tracking-normal ${
          isSingle ? 'text-2xl' : 'text-base'
        }`}
      >
        Phoenix
      </div>
    </div>
  );
};

export const TeamOddItem = () => {
  const isSingle = useCardSize() === 'single';

  return (
    <div className="tl-flex-between">
      <div className="flex items-center gap-3">
        <Avatar className="border-border bg-surface-secondary h-11 w-11 rounded-full border p-1.5">
          <AvatarImage src={TeamLogo1Image.src} />
        </Avatar>

        <div
          className={`text-center align-bottom font-bold tracking-normal ${
            isSingle ? 'text-2xl' : 'text-base'
          }`}
        >
          Phoenix
        </div>
      </div>

      <div
        className={`rounded-xl bg-[#33758780] px-6 py-2 text-center align-bottom font-semibold capitalize ${
          isSingle ? 'text-2xl' : 'text-base'
        }`}
      >
        1.45
      </div>
    </div>
  );
};
