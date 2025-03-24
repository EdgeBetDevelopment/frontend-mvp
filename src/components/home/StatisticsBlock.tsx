import React from 'react';

const STATISTICS = [
  {
    title: 'Success Rate',
    description: 'Increased betting accuracy with AI predictions',
    value: '+200%',
  },
  {
    title: 'Daily Users',
    description: 'Active players on our platform',
    value: '+5 000',
  },
  {
    title: 'ROI',
    description: 'Average return on investment',
    value: '+25%',
  },
  {
    title: 'Won Bets',
    description: 'Monthly winning predictions',
    value: '+10 000',
  },
];

const StatisticsBlock = () => {
  return (
    <div className="tl-container border-border-secondary flex w-full flex-col items-center gap-9 overflow-hidden rounded-3xl border bg-[#32323280] p-8">
      <div className="relative flex flex-col items-center gap-9">
        <div className="absolute top-0 left-0 h-full w-full rounded-full bg-[#84FDF750] blur-[300px]" />

        <h3 className="max-w-[800px] text-center align-bottom text-6xl font-medium capitalize">
          Bet Smarter, Win Bigger
        </h3>

        <p className="max-w-[800px] text-center align-bottom text-base font-normal tracking-normal">
          Elevate your sports betting experience with real-time insights, expert
          predictions, and exclusive offers. Stay ahead of the game and make
          every bet count.
        </p>
      </div>

      <div className="flex w-full items-center justify-center gap-6">
        {STATISTICS.map((statistic) => (
          <StatisticsItem key={statistic.title} {...statistic} />
        ))}
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
    <div className="flex flex-col gap-3">
      <div className="align-middle text-xl leading-6 font-medium tracking-normal">
        {title}
      </div>

      <div className="tl-paraghraph3 max-w-[228px]">{description}</div>

      <div className="text-primary-brand align-middle text-6xl font-bold tracking-normal">
        {value}
      </div>
    </div>
  );
};
