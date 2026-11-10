export type MatchOutcome = 'all' | 'wins' | 'losses';
export type MatchClassification = 'all' | 'tournament' | 'friendly';
export type CourtSurface = 'Clay' | 'Hard' | 'Grass';
export type DatePreset = 'all' | '7d' | '30d' | 'year';

export interface FilterState {
  searchQuery: string;
  outcome: MatchOutcome;
  matchType: MatchClassification;
  surfaces: CourtSurface[];
  tournaments: string[];
  rivals: string[];
  datePreset: DatePreset;
}

export const createDefaultFilterState = (): FilterState => ({
  searchQuery: '',
  outcome: 'all',
  matchType: 'all',
  surfaces: [],
  tournaments: [],
  rivals: [],
  datePreset: 'all',
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
  return count;
};
