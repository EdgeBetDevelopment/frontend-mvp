import React from 'react';

import { Button } from '../ui/button';

import AmericanFootballIcon from '@/assets/icons/american-football.svg';

const SportsList = () => {
  return (
    <div>
      <div className="grid gap-[18px]">
        <div className="tl-container tl-mask-gradient-top grid w-full grid-cols-4 gap-[18px]">
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
        </div>

        <div className="tl-container grid w-full grid-cols-4 gap-[18px]">
          <SposrtCard />
          <SposrtCard />
          <SposrtCard />
          <SposrtCard />
          <SposrtCard />
          <SposrtCard />
          <SposrtCard />
          <SposrtCard />
        </div>

        <div className="tl-container tl-mask-gradient-bottom grid w-full grid-cols-4 gap-[18px]">
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
        </div>
      </div>
    </div>
  );
};

export default SportsList;

const SposrtCard = () => {
  return (
    <div className="relative">
      <div className="bg-primary-brand absolute top-0 left-1/2 -z-10 h-[8px] w-[80px] -translate-1/2 rounded-full" />

      <div
        style={{
          background: `
        linear-gradient(180deg, rgba(220, 253, 207, 0.07) 0%, rgba(46, 65, 58, 0) 100%),
        linear-gradient(180deg, rgba(220, 253, 207, 0.07) 40.2%, rgba(46, 65, 58, 0) 205.16%)
      `,
        }}
        className="border-border relative z-10 flex flex-col gap-11 rounded-[24px] border p-5 backdrop-blur-md"
      >
        <div className="flex flex-col gap-3">
          <div className="border-border tl-gradient flex h-12 w-12 items-center justify-center rounded-[10px] border">
            <AmericanFootballIcon />
          </div>

          <div>
            <div className="align-middle text-lg leading-6 font-semibold">
              Basketball Euroleague
            </div>

            <div className="text-text-secondary tl-paraghraph3">
              Basketball Euroleague
            </div>
          </div>
        </div>

        <div>
          <Button variant="gradient">View Predictions</Button>
        </div>
      </div>
    </div>
  );
};

const EmptyCard = () => {
  return (
    <div className="border-border h-[239px] rounded-[24px] border p-5"></div>
  );
};
