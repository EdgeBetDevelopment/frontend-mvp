import dayjs from 'dayjs';

const LB_PER_KG = 2.2046226218;

/** Leading number out of whatever the API sends: 86, '86' or '195 lbs'. */
function toNumber(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string') {
    const match = value.match(/-?\d+(\.\d+)?/);
    if (match) {
      const parsed = Number(match[0]);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
}

/**
 * Birthdays render as MM/DD/YYYY across every player profile.
 * Date-only and ISO payloads are split by hand rather than parsed: dayjs
 * would shift '1997-10-28T00:00:00Z' back a day for anyone west of UTC.
 * An unparseable value passes through verbatim — better the raw string than
 * a blank tile.
 */
export function formatBirthday(value?: unknown): string {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return '';

  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    const [, year, month, day] = iso;
    return `${month}/${day}/${year}`;
  }

  const parsed = dayjs(raw);
  return parsed.isValid() ? parsed.format('MM/DD/YYYY') : raw;
}

/**
 * Weight renders pounds first with the kilos in brackets — '190lb (86kg)' —
 * mirroring how height shows feet before centimetres. Whichever unit the API
 * omits is converted from the other.
 */
export function formatWeight(lb?: unknown, kg?: unknown): string {
  const pounds = toNumber(lb);
  const kilos = toNumber(kg);
  if (pounds === null && kilos === null) return '';

  const lbValue = pounds ?? (kilos as number) * LB_PER_KG;
  const kgValue = kilos ?? (pounds as number) / LB_PER_KG;
  return `${Math.round(lbValue)}lb (${Math.round(kgValue)}kg)`;
}
