import React from 'react';

import { Button } from '../../ui/button';

type Props = {
  isActive?: boolean;
  sport: any;
  onViewPredictions?: () => void;
};

const SportsCard = ({ isActive, sport, onViewPredictions }: Props) => {
  const style = isActive
    ? {
        background: `
        linear-gradient(180deg, rgba(220, 253, 207, 0.07) 0%, rgba(46, 65, 58, 0) 100%),
        linear-gradient(180deg, rgba(220, 253, 207, 0.07) 40.2%, rgba(46, 65, 58, 0) 205.16%)
      `,
      }
    : undefined;

  return (
    <div className="relative h-[240px]">
      {isActive && (
        <div className="bg-primary-brand absolute top-0 left-1/2 -z-10 h-[8px] w-[80px] -translate-1/2 rounded-full" />
      )}

      <div
        style={style}
        className="border-border relative z-10 flex h-full flex-col rounded-[24px] border p-3 backdrop-blur-md sm:p-5"
      >
        <div className="flex flex-1 flex-col gap-3">
          <div className="border-border tl-gradient flex h-12 w-12 items-center justify-center rounded-[10px] border">
            {sport.icon}
          </div>

          <div>
            <div
              title={sport.title}
              className="line-clamp-1 align-middle text-lg leading-6 font-semibold"
            >
              {sport.title}
            </div>
            <div
              title={sport.subtitle}
              className="text-text-secondary tl-paraghraph3 line-clamp-2"
            >
              {sport.subtitle}
            </div>
          </div>
        </div>

        <div>
          <Button onClick={onViewPredictions} variant="gradient">
            View Predictions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SportsCard;

export const EmptyCard = () => {
  return (
    <div className="border-border h-[239px] rounded-[24px] border p-5"></div>
  );
};
