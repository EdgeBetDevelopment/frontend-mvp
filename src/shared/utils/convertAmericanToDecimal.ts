import { BetPick } from '@/store/slices/matchupSlice';

export const convertAmericanToDecimal = (odds: number): number => {
  if (odds == null || !Number.isFinite(odds) || odds === 0) return 1;
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

export const calcParlayOddsDecimal = (bets: BetPick[]) => {
  const total = bets.reduce((acc, b) => acc * americanToDecimal(b.odds), 1);
  return +total.toFixed(2);
};

export const convertEuropeanToAmerican = (decimal: number): number => {
  if (decimal == null || !Number.isFinite(decimal) || decimal === 0) return 1;
  if (decimal >= 2.0) {
    return Math.round((decimal - 1) * 100);
  } else {
    return Math.round(-100 / (decimal - 1));
  }
};

export const makeId = () =>
  Math.random().toString(36).slice(2, 8) + Date.now().toString(36);
