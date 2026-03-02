import type { Tournament, BracketMatch, TournamentPressureStats } from './types'

export const mockTournament: Tournament = {
    id: 'tourney_1',
    name: 'Roland Garros Club',
    category: 'ATP 1000',
    surface: 'Red Clay Surface',
    location: {
        city: 'Paris',
        country: 'France',
        venue: 'Stade Roland Garros'
    },
    dateRange: {
        start: new Date(new Date().getFullYear(), 4, 26).getTime(), // May 26
        end: new Date(new Date().getFullYear(), 5, 9).getTime()    // Jun 9
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVb5S1JHFe1itNeCb5ljyGZVPtawZFnk_zSwV5XEXla1b3yO6YVwM6ZYnwOXmc6g-pqVfmX5CRk1qG2Yw935Hroluv-lQj78P406xnn8rSzpnjKWH5jUenO0HlNOKdM5YVkSoBBUY8aWrn1gq6c48RgmgGLi8pWYQZqquNOaTwAMOsh-V4c5XYE93uftZRrCjX1rgxlOtZH4eJci7ZHKQAjU1XWmvzx0Nak8SxU2WaaQCWvvibjNZJ9cMjxLHm10gMPnQpGx-ChiQ'
};

export const mockBracketMatches: BracketMatch[] = [
    {
        id: 'match_1',
        round: 'Round of 16',
        score: '6-4, 6-4',
        result: 'win',
        status: 'completed'
    },
    {
        id: 'match_2',
        round: 'Quarter-Finals',
        opponent: 'Alcaraz',
        opponentSeed: 1,
        score: '7-6, 5-7, 6-2',
        result: 'win',
        status: 'completed'
    },
    {
        id: 'match_3',
        round: 'Semi-Finals',
        opponent: 'Novak Djokovic',
        opponentSeed: 2,
        status: 'live',
        court: 'Court Philippe-Chatrier',
        scheduledTime: new Date().setHours(14, 0, 0, 0) // Today 14:00
    },
    {
        id: 'match_4',
        round: 'Final',
        status: 'tbd',
        court: 'Center Court',
        scheduledTime: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).setHours(15, 0, 0, 0) // Tomorrow 15:00
    }
];

export const mockPressureStats: TournamentPressureStats = {
    breakPointsSavedPct: 78,
    tiebreakWinPct: 100,
    tournamentAvgBPSaved: 62,
    historicalAvgTBWin: 55
};
