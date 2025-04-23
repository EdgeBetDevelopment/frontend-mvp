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
    <div className="relative">
      {isActive && (
        <div className="bg-primary-brand absolute top-0 left-1/2 -z-10 h-[8px] w-[80px] -translate-1/2 rounded-full" />
      )}

      <div
        style={style}
        className="border-border relative z-10 flex flex-col gap-11 rounded-[24px] border p-5 backdrop-blur-md"
      >
        <div className="flex flex-col gap-3">
          <div className="border-border tl-gradient flex h-12 w-12 items-center justify-center rounded-[10px] border">
            {sport.icon}
          </div>

          <div>
            <div className="align-middle text-lg leading-6 font-semibold">
              {sport.title}
            </div>
            <div className="text-text-secondary tl-paraghraph3">
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
