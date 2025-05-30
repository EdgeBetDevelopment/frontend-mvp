import React from 'react';

import CardContainer from '@/ui/containers/CardContainer';

const MarketSummary = ({ prediction }: { prediction: any }) => {
  return (
    <div className="space-y-4">
      <h3 className="align-bottom text-lg font-semibold tracking-normal">
        Market summary
      </h3>

      <CardContainer className="flex flex-col gap-3 rounded-lg">
        <MarketSummaryRow
          teamName="Oklahoma City Thunder"
          spread={prediction?.spread_home}
          total={prediction?.total_line}
          moneyline={prediction?.moneyline_home}
        />

        <MarketSummaryRow
          teamName="Minnesota Timberwolves"
          spread={prediction?.spread_away}
          total={prediction?.total_line}
          moneyline={prediction?.moneyline_away}
        />
      </CardContainer>
    </div>
  );
};

export default MarketSummary;

const MarketSummaryRow = ({
  teamName,
  spread,
  total,
  moneyline,
}: {
  teamName: string;
  spread: string;
  total: string;
  moneyline: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="font-medium text-white">{teamName}</p>
      </div>

      <div className="flex items-stretch gap-2">
        <div className="flex flex-col items-center">
          <p className="mb-1 text-xs text-gray-400">Spread</p>
          <div className="flex min-w-[60px] flex-1 flex-col items-center gap-1 rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-2">
            <span className="text-sm font-medium text-white">{spread}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="mb-1 text-xs text-gray-400">Total</p>
          <div className="flex min-w-[60px] flex-1 flex-col items-center gap-1 rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-2">
            <span className="text-sm font-medium text-white">{total}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="mb-1 text-xs text-gray-400">ML</p>
          <div className="flex min-w-[60px] flex-1 items-center justify-center rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-2">
            <span className="text-sm font-medium text-white">{moneyline}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
