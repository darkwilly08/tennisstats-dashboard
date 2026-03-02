import type { MatchPayload } from '../../_shared/types';

import { mockMatches } from '../../_shared/mock';
import type { OverviewStats, MatchRow, PhysiologicalData, PointBreakdownData } from '../types';

export class MatchStatsService {
    /**
     * Fetches all matches for the current user.
     */
    static async getMatches(): Promise<MatchPayload[]> {
        // In the future: return await HttpClient.get<MatchPayload[]>('/api/matches');
        // Using mock data for now
        return Promise.resolve(mockMatches);
    }

    /**
     * Computes overview statistics from a list of matches.
     */
    static computeOverviewStats(matches: MatchPayload[]): OverviewStats {
        if (!matches.length) {
            return {
                totalMatches: 0, won: 0, lost: 0, winRatio: 0,
                totalTimeOnCourtMs: 0, longestMatchMs: 0,
                tiebreaks: { total: 0, won: 0, lost: 0, ratio: 0 },
                bestSetStreak: 0, currentStreak: 0
            };
        }

        let won = 0;
        let totalTimeOnCourtMs = 0;
        let longestMatchMs = 0;
        let tiebreakTotal = 0;
        let tiebreakWon = 0;
        let currentStreak = 0;
        let isCurrentStreak = true;

        // Sort matches by date descending (assuming they correspond to timeline)
        const sortedMatches = [...matches].sort((a, b) => b.idt - a.idt);

        for (const match of sortedMatches) {
            if (match.win) won++;

            const duration = match.fdt ? match.fdt - match.idt : 0;
            totalTimeOnCourtMs += duration;
            if (duration > longestMatchMs) longestMatchMs = duration;

            if (match.tiebreak) {
                tiebreakTotal++;
                // Very simplified estimation of tiebreak win
                if (match.win) tiebreakWon++;
            }

            // Streak calculation (matches)
            if (isCurrentStreak) {
                if (match.win) {
                    currentStreak++;
                } else {
                    isCurrentStreak = false; // streak ended
                }
            }
        }

        return {
            totalMatches: matches.length,
            won,
            lost: matches.length - won,
            winRatio: Math.round((won / matches.length) * 100),
            totalTimeOnCourtMs,
            longestMatchMs,
            tiebreaks: {
                total: tiebreakTotal,
                won: tiebreakWon,
                lost: tiebreakTotal - tiebreakWon,
                ratio: tiebreakTotal > 0 ? Math.round((tiebreakWon / tiebreakTotal) * 100) : 0
            },
            bestSetStreak: 10, // Mocked for now, complex to calculate across sets
            currentStreak
        };
    }

    /**
     * Maps backend payloads to the row format needed by the recent matches table.
     */
    static mapToMatchRows(matches: MatchPayload[]): MatchRow[] {
        return matches.map(match => {
            // Calculate score string from sets
            const scoreString = match.sets
                .sort((a, b) => a.id - b.id)
                .map(s => {
                    let str = `${s.me}-${s.rival}`;
                    if (s.tiebreak) {
                        // simplified representation
                        str += `(${s.tiebreak.him})`; // show loser score of tiebreak usually
                    }
                    return str;
                }).join(' ');

            const durationMs = match.fdt ? match.fdt - match.idt : 0;
            const hours = Math.floor(durationMs / (1000 * 60 * 60));
            const textH = hours > 0 ? `${hours}h ` : '';
            const mins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

            // format date "2024-02-25 20:12"
            const d = new Date(match.idt);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

            return {
                id: `match_${match.idt}`,
                rival: match.rival,
                date: dateStr,
                score: scoreString,
                won: match.win,
                durationString: `${textH}${mins}m`,
                meBreaks: match.me_breaks,
                himBreaks: match.him_breaks,
                mePointsWon: match.me_points_won,
                himPointsWon: match.him_points_won
            };
        });
    }

    /**
     * Aggregates physiological metrics across matches.
     */
    static computePhysiologicalData(matches: MatchPayload[]): PhysiologicalData {
        let totalCals = 0;
        let maxHr = 0;
        let sumAvgHr = 0;
        let totalDistanceMeters = 0; // estimation: roughly 0.8m per step
        let matchedWithHealth = 0;

        for (const match of matches) {
            if (match.health_metrics) {
                totalCals += match.health_metrics.active_calories;
                sumAvgHr += match.health_metrics.heart_rate.avg;
                if (match.health_metrics.heart_rate.max > maxHr) {
                    maxHr = match.health_metrics.heart_rate.max;
                }
                totalDistanceMeters += match.health_metrics.total_steps * 0.8;
                matchedWithHealth++;
            }
        }

        return {
            activeCalories: totalCals,
            avgHeartRate: matchedWithHealth > 0 ? Math.round(sumAvgHr / matchedWithHealth) : 0,
            maxHeartRate: maxHr,
            distanceCoveredKm: Number((totalDistanceMeters / 1000).toFixed(1))
        };
    }

    /**
     * Aggregates point breakdown details across matches.
     */
    static computePointBreakdown(matches: MatchPayload[]): PointBreakdownData {
        let meBreaks = 0; let meBreakPoints = 0;
        let himBreaks = 0; let himBreakPoints = 0;
        let mePointsServing = 0; let himPointsServing = 0;
        // Total points won/lost to estimate receiving
        let mePointsTotal = 0; let himPointsTotal = 0;

        for (const match of matches) {
            meBreaks += match.me_breaks;
            meBreakPoints += match.me_break_points;
            himBreaks += match.him_breaks;
            himBreakPoints += match.him_break_points;
            mePointsServing += match.me_serve_won;
            himPointsServing += match.him_serve_won;
            mePointsTotal += match.me_points_won;
            himPointsTotal += match.him_points_won;
        }

        const mePointsReceiving = mePointsTotal - mePointsServing;
        const himPointsReceiving = himPointsTotal - himPointsServing;

        return {
            breakPoints: {
                won: meBreaks,
                total: meBreakPoints,
                percentage: meBreakPoints > 0 ? Math.round((meBreaks / meBreakPoints) * 100) : 0
            },
            savedBreakPoints: {
                saved: himBreakPoints - himBreaks,
                total: himBreakPoints,
                percentage: himBreakPoints > 0 ? Math.round(((himBreakPoints - himBreaks) / himBreakPoints) * 100) : 0
            },
            pointsServing: {
                won: mePointsServing,
                total: mePointsServing + himPointsReceiving, // My serve won + His receiving won
                percentage: (mePointsServing + himPointsReceiving) > 0 ? Math.round((mePointsServing / (mePointsServing + himPointsReceiving)) * 100) : 0
            },
            pointsReceiving: {
                won: mePointsReceiving,
                total: mePointsReceiving + himPointsServing, // My receiving won + His serve won
                percentage: (mePointsReceiving + himPointsServing) > 0 ? Math.round((mePointsReceiving / (mePointsReceiving + himPointsServing)) * 100) : 0
            }
        };
    }
}
