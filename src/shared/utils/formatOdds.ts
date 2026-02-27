export function formatOddsWithSign(
  value: string | number | null | undefined,
  isAmerican: boolean = true,
): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return '-';
  }

  if (isAmerican) {
    if (numValue > 0) {
      return `+${numValue}`;
    }
    return `${numValue}`;
  }

  return numValue.toFixed(2);
}

export function formatSpread(
  value: string | number | null | undefined,
): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return '-';
  }

  if (numValue > 0) {
    return `+${numValue}`;
  } else if (numValue < 0) {
    return `${numValue}`;
  }

  return '0';
}
