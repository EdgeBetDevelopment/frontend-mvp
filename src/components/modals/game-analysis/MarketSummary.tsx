import React from 'react';

import CardContainer from '@/ui/containers/CardContainer';

const MarketSummary = () => {
  return (
    <div className="space-y-4">
      <h3 className="align-bottom text-lg font-semibold tracking-normal">
        Market summary
      </h3>

      <CardContainer className="flex flex-col gap-3 rounded-lg">
        <MarketSummaryRow
          teamName="Oklahoma City Thunder"
          spread="-3.5"
          spreadOdds="-105"
          total="o218.5"
          totalOdds="-105"
          moneyline="-155"
        />

        <MarketSummaryRow
          teamName="Minnesota Timberwolves"
          spread="+3.5"
          spreadOdds="-115"
          total="u218.5"
          totalOdds="-105"
          moneyline="+130"
        />
      </CardContainer>
    </div>
  );
};

export default MarketSummary;

const MarketSummaryRow = ({
  teamName,
  spread,
  spreadOdds,
  total,
  totalOdds,
  moneyline,
}: {
  teamName: string;
  spread: string;
  spreadOdds: string;
  total: string;
  totalOdds: string;
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
            <span className="text-xs text-gray-400">{spreadOdds}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="mb-1 text-xs text-gray-400">Total</p>
          <div className="flex min-w-[60px] flex-1 flex-col items-center gap-1 rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-2">
            <span className="text-sm font-medium text-white">{total}</span>
            <span className="text-xs text-gray-400">{totalOdds}</span>
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
