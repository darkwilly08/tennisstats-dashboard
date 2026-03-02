export interface OverviewStats {
    totalMatches: number;
    won: number;
    lost: number;
    winRatio: number; // percentage (0-100)
    totalTimeOnCourtMs: number;
    longestMatchMs: number;
    tiebreaks: {
        total: number;
        won: number;
        lost: number;
        ratio: number; // percentage (0-100)
    };
    bestSetStreak: number;
    currentStreak: number;
}

export interface MatchRow {
    id: string; // generated client side for list keys
    rival: string;
    date: string;
    score: string;
    won: boolean;
    durationString: string;
    meBreaks: number;
    himBreaks: number;
    mePointsWon: number;
    himPointsWon: number;
}

export interface PhysiologicalData {
    activeCalories: number;
    avgHeartRate: number;
    maxHeartRate: number;
    distanceCoveredKm: number;
}

export interface PointBreakdownData {
    breakPoints: { won: number; total: number; percentage: number };
    savedBreakPoints: { saved: number; total: number; percentage: number };
    pointsServing: { won: number; total: number; percentage: number };
    pointsReceiving: { won: number; total: number; percentage: number };
}
