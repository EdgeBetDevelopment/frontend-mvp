import React from 'react';

import CTABlock from '@/components/CTABlock';
import HeroBlock from '@/components/home/HeroBlock';
import SportsList from '@/components/home/SportsList';
import StatisticsBlock from '@/components/home/StatisticsBlock';
import { UserReviews } from '@/components/home/UserReviews';
import WhopAuthHandler from '@/components/home/WhopAuthHandler';

export default function Home() {
  return (
    <div>
      <WhopAuthHandler />
      <div className="my-[90px] flex flex-col gap-[60px] md:gap-[90px]">
        <HeroBlock />

        <SportsList />

        <StatisticsBlock />

        {/* <div className="tl-container w-full">
          <EventsTableBlock />
        </div> */}

        <UserReviews />

        <div className="tl-container w-full">
          <CTABlock />
        </div>
      </div>
    </div>
  );
}
