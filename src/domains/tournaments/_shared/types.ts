export interface Tournament {
    id: string;
    name: string;
    category: string;
    surface: string;
    location: {
        city: string;
        country: string;
        venue: string;
    };
    dateRange: {
        start: number;
        end: number;
    };
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
