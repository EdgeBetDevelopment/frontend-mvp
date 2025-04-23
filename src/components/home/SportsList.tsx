'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import useModalManager from '@/hooks/useModalManager';
import { ROUTES } from '@/routes';
import ComingSoonModal from '../modals/ComingSoonModal';

import SportsCard, { EmptyCard } from './SportCard';

import AmericanFootballIcon from '@/assets/icons/american-football.svg';
import BaseballIcon from '@/assets/icons/baseball.svg';
import FootbalIcon from '@/assets/icons/football.svg';
import TennisIcon from '@/assets/icons/tenins.svg';

interface ISport {
  title: string;
  subtitle: string;
  icon: ReactNode;
  link?: string;
}

export const sports: ISport[] = [
  {
    title: 'NCAAF',
    subtitle: 'US College Football',
    icon: <AmericanFootballIcon />,
  },
  {
    title: 'NCAAF Championship Winner',
    subtitle: 'US Football',
    icon: <AmericanFootballIcon />,
  },
  {
    title: 'NFL Super Bowl Winner',
    subtitle: 'Super Bowl Winner 2024/2025',
    icon: <AmericanFootballIcon />,
  },
  {
    title: 'NFL',
    subtitle: 'US Football',
    icon: <AmericanFootballIcon />,
  },
  {
    title: 'Basketball Euroleague',
    subtitle: 'Basketball Euroleague',
    icon: <FootbalIcon />,
  },
  {
    title: 'NBA',
    subtitle: 'US Basketball',
    icon: <FootbalIcon />,
    link: ROUTES.MATCHUP,
  },
  {
    title: 'NCAAB',
    subtitle: 'US College Basketball',
    icon: <BaseballIcon />,
  },
  {
    title: 'NCAAB Championship Winner',
    subtitle: 'US College Basketball Championship Winner',
    icon: <AmericanFootballIcon />,
  },
  {
    title: 'MLB World Series Winner',
    subtitle: 'World Series Winner 2025',
    icon: <BaseballIcon />,
  },
  {
    title: 'MLB',
    subtitle: 'US College Football',
    icon: <FootbalIcon />,
  },

  {
    title: 'Tennis',
    subtitle: 'Grand Slam Tournaments',
    icon: <TennisIcon />,
  },

  {
    title: 'WTA Tours',
    subtitle: 'Masters Tennis',
    icon: <TennisIcon />,
  },
];

const SportsList = () => {
  const { isModalOpen, closeModal, openModal } = useModalManager();
  const router = useRouter();

  const onViewPredictions = (sport: ISport) => {
    if (!!sport.link) {
      router.push(sport.link);
    } else {
      openModal('coming-soon');
    }
  };

  return (
    <>
      <div>
        <div className="grid gap-[18px]">
          <div className="tl-container tl-mask-gradient-top grid w-full grid-cols-4 gap-[18px]">
            <EmptyCard />
            <EmptyCard />
            <EmptyCard />
            <EmptyCard />
          </div>

          <div className="tl-container grid w-full grid-cols-4 gap-[18px]">
            {sports.map((sport, index) => (
              <SportsCard
                onViewPredictions={() => onViewPredictions(sport)}
                isActive={!!sport.link}
                key={index}
                sport={sport}
              />
            ))}
          </div>

          <div className="tl-container tl-mask-gradient-bottom grid w-full grid-cols-4 gap-[18px]">
            <EmptyCard />
            <EmptyCard />
            <EmptyCard />
            <EmptyCard />
          </div>
        </div>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen('coming-soon')}
        onClose={() => closeModal('coming-soon')}
      />
    </>
  );
};

export default SportsList;
