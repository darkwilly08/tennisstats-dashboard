export interface Tournament {
  id: string;
  userId: string;
  name: string;
  location: string;
  surface: 'Clay' | 'Hard' | 'Grass';
  category?: string;
  startDate?: number;
  endDate?: number;
  status: 'active' | 'completed' | 'upcoming';
  imageUrl?: string;
}

export interface BracketMatch {
  id: string;
  round: string;
  opponent?: string;
  opponentSeed?: number;
  score?: string;
  result?: 'win' | 'loss';
  status: 'completed' | 'upcoming' | 'live' | 'tbd';
  court?: string;
  scheduledTime?: number;
}

export interface TournamentPressureStats {
  breakPointsSavedPct: number;
  tiebreakWinPct: number;
  tournamentAvgBPSaved: number;
  historicalAvgTBWin: number;
}
