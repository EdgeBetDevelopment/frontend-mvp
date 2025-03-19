import React from 'react';

import HeroBlock from '@/components/home/HeroBlock';
import SportsList from '@/components/home/SportsList';
import StatisticsBlock from '@/components/home/StatisticsBlock';

export default function Home() {
  return (
    <div>
      <HeroBlock />

      <SportsList />

      <StatisticsBlock />
    </div>
  );
}
