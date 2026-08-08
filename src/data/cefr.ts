export type CefrBand = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

/** Percentage floor for each band, highest first. */
const BANDS: { band: CefrBand; floor: number }[] = [
  { band: 'C1', floor: 85 },
  { band: 'B2', floor: 70 },
  { band: 'B1', floor: 55 },
  { band: 'A2', floor: 40 },
  { band: 'A1', floor: 0 },
];

export function bandFor(pct: number): CefrBand {
  return (BANDS.find((b) => pct >= b.floor) ?? BANDS[BANDS.length - 1]).band;
}

export const CEFR_NAME: Record<CefrBand, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper intermediate',
  C1: 'Advanced',
};

/** Below this share of the auto-marked points attempted, a band means nothing. */
export const CEFR_MIN_ATTEMPTED = 0.6;
