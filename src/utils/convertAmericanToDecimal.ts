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
