export type MatchOutcome = 'all' | 'wins' | 'losses';
export type MatchClassification = 'all' | 'tournament' | 'friendly';
export type CourtSurface = 'Clay' | 'Hard' | 'Grass' | 'Indoor';
export type DatePreset = 'all' | '7d' | '30d' | '3m' | '6m' | 'year';
export type SetsCountFilter = 'all' | '2' | '3' | '5';
export type OpponentHand = 'all' | 'right' | 'left';
export type OpponentBackhand = 'all' | '1h' | '2h';

export interface FilterState {
  searchQuery: string;
  outcome: MatchOutcome;
  matchType: MatchClassification;
  surfaces: CourtSurface[];
  tournaments: string[];
  rivals: string[];
  datePreset: DatePreset;
  setsCount: SetsCountFilter;
  withTiebreak: boolean;
  comebackOnly: boolean;
  withBagel: boolean;
  opponentHand: OpponentHand;
  opponentBackhand: OpponentBackhand;
}

export const createDefaultFilterState = (): FilterState => ({
  searchQuery: '',
  outcome: 'all',
  matchType: 'all',
  surfaces: [],
  tournaments: [],
  rivals: [],
  datePreset: 'all',
  setsCount: 'all',
  withTiebreak: false,
  comebackOnly: false,
  withBagel: false,
  opponentHand: 'all',
  opponentBackhand: 'all',
});

export const countActiveFilters = (state: FilterState): number => {
  let count = 0;
  if (state.searchQuery && state.searchQuery.trim()) count++;
  if (state.outcome !== 'all') count++;
  if (state.matchType !== 'all') count++;
  if (state.surfaces && state.surfaces.length > 0) count += state.surfaces.length;
  if (state.tournaments && state.tournaments.length > 0) count += state.tournaments.length;
  if (state.rivals && state.rivals.length > 0) count += state.rivals.length;
  if (state.datePreset && state.datePreset !== 'all') count++;
  if (state.setsCount && state.setsCount !== 'all') count++;
  if (state.withTiebreak) count++;
  if (state.comebackOnly) count++;
  if (state.withBagel) count++;
  if (state.opponentHand && state.opponentHand !== 'all') count++;
  if (state.opponentBackhand && state.opponentBackhand !== 'all') count++;
  return count;
};
