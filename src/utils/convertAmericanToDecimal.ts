import { BetPick } from '@/store/slices/matchupSlice';

export const convertAmericanToDecimal = (odds: number): number => {
  if (odds > 0) {
    return +(odds / 100 + 1).toFixed(2);
  } else {
    return +(100 / Math.abs(odds) + 1).toFixed(2);
  }
};

export const convertAmericanToEuropean = (odds: number): number => {
  if (odds > 0) {
    return +(odds / 100 + 1).toFixed(2);
  } else {
    return +(100 / Math.abs(odds) + 1).toFixed(2);
  }
};

const americanToDecimal = (odds: number) =>
  odds > 0 ? odds / 100 + 1 : 100 / Math.abs(odds) + 1;

export const calcParlayOddsDecimal = (bets: BetPick[]) =>
  bets.reduce((acc, b) => acc * americanToDecimal(b.odds), 1);
