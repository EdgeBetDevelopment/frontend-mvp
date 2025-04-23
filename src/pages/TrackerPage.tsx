'use client';

import React from 'react';

import PageTitle from '@/components/PageTitle';
import BetTrackerTable from '@/components/tracker/BetTrackerTable';

import GridBgImage from '@/assets/gridBg.png';

const TrackerPage = () => {
  return (
    <div className="relative h-full w-full overflow-hidden py-10">
      <div className="bg-primary-brand/60 absolute top-1/3 left-1/2 -z-10 h-[200px] w-1/3 -translate-x-1/2 rounded-full blur-[300px]" />
      <div
        style={{ backgroundImage: `url(${GridBgImage.src})` }}
        className="absolute inset-0 -z-10 h-full w-full"
      />

      <div className="relative flex flex-col items-center gap-11">
        <PageTitle
          className="max-w-[1100px]"
          title={
            <div>
              Your <span className="text-primary-brand">Bet Tracker</span>
            </div>
          }
          description={
            <p className="max-w-[850px]">
              Track and analyze your betting history across all sports. Monitor
              performance, review outcomes, and improve your strategy
            </p>
          }
        />

        <BetTrackerTable />
      </div>
    </div>
  );
};

export default TrackerPage;
