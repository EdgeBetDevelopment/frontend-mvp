const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const sanitizeSettlement = (settlement: any) => {
  if (!isPlainObject(settlement)) {
    return undefined;
  }

  const marketType = settlement.market_type;
  if (!marketType || marketType === 'other') {
    return undefined;
  }

  const cleaned: Record<string, any> = { market_type: marketType };
  Object.keys(settlement).forEach((key) => {
    if (key === 'market_type') {
      return;
    }
    const value = settlement[key];
    if (value === undefined || value === null || value === '') {
      return;
    }
    cleaned[key] = value;
  });

  return Object.keys(cleaned).length === 1 ? undefined : cleaned;
};

export const sanitizePickOfTheDayPayload = (data: any) => {
  if (!isPlainObject(data)) {
    return data;
  }

  const result: Record<string, any> = { ...data };
  const settlement = sanitizeSettlement(result.settlement);

  if (settlement) {
    result.settlement = settlement;
  } else {
    delete result.settlement;
  }

  return result;
};

export const diffPickOfTheDay = (data: any, previous: any) => {
  if (!isPlainObject(data)) {
    return data !== previous ? data : undefined;
  }

  const result: Record<string, any> = {};
  Object.keys(data).forEach((key) => {
    const nextValue = data[key];
    const prevValue = previous ? previous[key] : undefined;

    if (isPlainObject(nextValue)) {
      const nested = diffPickOfTheDay(nextValue, prevValue);
      if (isPlainObject(nested) && Object.keys(nested).length === 0) {
        return;
      }
      if (nested !== undefined) {
        result[key] = nested;
      }
      return;
    }

    if (Array.isArray(nextValue)) {
      if (JSON.stringify(nextValue) !== JSON.stringify(prevValue)) {
        result[key] = nextValue;
      }
      return;
    }

    if (nextValue !== prevValue) {
      result[key] = nextValue;
    }
  });

  return result;
};
