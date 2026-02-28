import React from 'react';

import { BackgroundOverlay } from '@/shared/components';
import { STATISTICS } from '../constants';

const StatisticsBlock = () => {
  return (
    <div className="relative">
      <BackgroundOverlay />

      <div className="tl-container">
        <div className="border-border-secondary flex w-full flex-col items-center gap-9 overflow-hidden rounded-3xl border bg-[#32323280] p-5 sm:p-8">
          <div className="relative flex flex-col items-center gap-6 md:gap-9">
            <div className="absolute top-0 left-0 h-full w-full rounded-full bg-[#84FDF750] blur-[300px]" />

            <h3 className="max-w-[800px] text-center align-bottom text-[40px] font-medium tracking-normal capitalize md:text-6xl md:font-bold">
              Bet Smarter, Win Bigger
            </h3>

            <p className="max-w-[800px] text-center align-bottom text-base font-normal tracking-normal">
              Elevate your sports betting experience with real-time insights,
              expert predictions, and exclusive offers. Stay ahead of the game
              and make every bet count.
            </p>
          </div>

          <div className="relative grid w-full grid-cols-2 items-stretch justify-center gap-3 sm:items-start sm:gap-6 md:flex">
            {STATISTICS.map((statistic) => (
              <StatisticsItem key={statistic.title} {...statistic} />
            ))}

            <div className="bg-border absolute top-1/2 left-1/2 -z-10 h-[1px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full md:hidden" />
            <div className="bg-border absolute top-1/2 left-1/2 -z-10 h-full w-[1px] -translate-x-1/2 -translate-y-1/2 rounded-full md:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBlock;

interface IStatisticsItem {
  title: string;
  description: string;
  value: string;
}

const StatisticsItem = ({ title, description, value }: IStatisticsItem) => {
  return (
    <div className="flex flex-col items-center gap-3 md:items-start">
      <div className="align-middle text-xl leading-6 font-medium tracking-normal">
        {title}
      </div>

      <div className="tl-paraghraph3 min-h-[54px] max-w-[228px] text-center sm:min-h-[40px] md:text-left">
        {description}
      </div>

      <div className="text-primary-brand align-middle text-3xl font-bold tracking-normal sm:text-4xl md:text-6xl">
        {value}
      </div>
    </div>
  );
};
