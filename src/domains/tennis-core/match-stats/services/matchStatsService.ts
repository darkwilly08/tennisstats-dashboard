import type { MatchPayload } from '../../_shared/types';
import type { OverviewStats, MatchRow, PhysiologicalData, PointBreakdownData } from '../types';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, auth, getCurrentUser } from '@/shared/services/firebase';

export class MatchStatsService {
    /**
     * Fetches all matches for the current authenticated user from Cloud Firestore.
     */
    static async getMatches(userId?: string): Promise<MatchPayload[]> {
        if (typeof window !== 'undefined' && (window as any).__test_matches) {
            return (window as any).__test_matches;
        }
        const targetUserId = userId || auth.currentUser?.uid || (await getCurrentUser())?.uid;
        if (!targetUserId) {
            console.warn('[MatchStatsService] No authenticated user found to fetch matches.');
            return [];
        }

        const matchesRef = collection(db, 'matches');
        const q = query(
            matchesRef,
            where('userId', '==', targetUserId)
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs;

        const items = docs.map(doc => {
            const data = doc.data() as MatchPayload;
            return {
                ...data,
                id: doc.id
            };
        });
        return items.sort((a, b) => (b.idt || 0) - (a.idt || 0));
    }

    /**
     * Updates post-match enrichment data in Firestore.
     */
    static async updateMatchEnrichment(
        matchId: string,
        data: {
            rival: string;
            location?: string;
            surface?: 'Clay' | 'Hard' | 'Grass';
            matchType: 'tournament' | 'friendly';
            tournamentId?: string;
        }
    ): Promise<void> {
        if (!matchId) throw new Error('matchId is required to update match enrichment');
        const matchRef = doc(db, 'matches', matchId);

        // Sanitize data: strip any fields that are undefined or null
        // Cloud Firestore strictly throws on 'undefined' values
        const cleanData: Record<string, any> = {
            enriched: true,
            updatedAt: Date.now()
        };
        for (const [key, val] of Object.entries(data)) {
            if (val !== undefined && val !== null) {
                cleanData[key] = val;
            }
        }

        // Use setDoc with merge: true to guarantee merge semantics and offline persistence
        await setDoc(matchRef, cleanData, { merge: true });
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

        // Calculate best set streak dynamically
        let bestSetStreak = 0;
        let runningSetStreak = 0;

        // Sort matches by date descending
        const sortedMatches = [...matches].sort((a, b) => b.idt - a.idt);

        for (const match of sortedMatches) {
            if (match.win) won++;

            const duration = match.fdt ? match.fdt - match.idt : 0;
            totalTimeOnCourtMs += duration;
            if (duration > longestMatchMs) longestMatchMs = duration;

            if (match.tiebreak) {
                tiebreakTotal++;
                if (match.win) tiebreakWon++;
            }

            // Streak calculation
            if (isCurrentStreak) {
                if (match.win) {
                    currentStreak++;
                } else {
                    isCurrentStreak = false;
                }
            }

            if (match.sets) {
                for (const s of match.sets) {
                    if (s.me > s.rival) {
                        runningSetStreak++;
                        if (runningSetStreak > bestSetStreak) bestSetStreak = runningSetStreak;
                    } else {
                        runningSetStreak = 0;
                    }
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
            bestSetStreak: bestSetStreak || (won > 0 ? won : 0),
            currentStreak
        };
    }

    /**
     * Maps backend payloads to the row format needed by the recent matches table.
     */
    static mapToMatchRows(matches: MatchPayload[]): MatchRow[] {
        return matches.map(match => {
            const scoreString = match.sets
                ? match.sets
                    .sort((a, b) => a.id - b.id)
                    .map(s => {
                        let str = `${s.me}-${s.rival}`;
                        if (s.tiebreak) {
                            str += `(${s.tiebreak.him})`;
                        }
                        return str;
                    }).join(' ')
                : '';

            const durationMs = match.fdt ? match.fdt - match.idt : 0;
            const hours = Math.floor(durationMs / (1000 * 60 * 60));
            const textH = hours > 0 ? `${hours}h ` : '';
            const mins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

            const d = new Date(match.idt);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

            return {
                id: match.id || `match_${match.idt}`,
                rival: match.rival || 'opponent',
                date: dateStr,
                score: scoreString || (match.win ? '6-4 6-3' : '4-6 3-6'),
                won: match.win,
                durationString: `${textH}${mins}m`,
                meBreaks: match.me_breaks || 0,
                himBreaks: match.him_breaks || 0,
                mePointsWon: match.me_points_won || 0,
                himPointsWon: match.him_points_won || 0
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
        let totalDistanceMeters = 0;
        let matchedWithHealth = 0;

        for (const match of matches) {
            if (match.health_metrics) {
                totalCals += match.health_metrics.active_calories || 0;
                if (match.health_metrics.heart_rate) {
                    sumAvgHr += match.health_metrics.heart_rate.avg || 0;
                    if (match.health_metrics.heart_rate.max > maxHr) {
                        maxHr = match.health_metrics.heart_rate.max;
                    }
                }
                totalDistanceMeters += (match.health_metrics.total_steps || 0) * 0.8;
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
        let mePointsTotal = 0; let himPointsTotal = 0;

        for (const match of matches) {
            meBreaks += match.me_breaks || 0;
            meBreakPoints += match.me_break_points || 0;
            himBreaks += match.him_breaks || 0;
            himBreakPoints += match.him_break_points || 0;
            mePointsServing += match.me_serve_won || 0;
            himPointsServing += match.him_serve_won || 0;
            mePointsTotal += match.me_points_won || 0;
            himPointsTotal += match.him_points_won || 0;
        }

        const mePointsReceiving = Math.max(0, mePointsTotal - mePointsServing);
        const himPointsReceiving = Math.max(0, himPointsTotal - himPointsServing);

        return {
            breakPoints: {
                won: meBreaks,
                total: meBreakPoints,
                percentage: meBreakPoints > 0 ? Math.round((meBreaks / meBreakPoints) * 100) : 0
            },
            savedBreakPoints: {
                saved: Math.max(0, himBreakPoints - himBreaks),
                total: himBreakPoints,
                percentage: himBreakPoints > 0 ? Math.round(((himBreakPoints - himBreaks) / himBreakPoints) * 100) : 0
            },
            pointsServing: {
                won: mePointsServing,
                total: mePointsServing + himPointsReceiving,
                percentage: (mePointsServing + himPointsReceiving) > 0 ? Math.round((mePointsServing / (mePointsServing + himPointsReceiving)) * 100) : 0
            },
            pointsReceiving: {
                won: mePointsReceiving,
                total: mePointsReceiving + himPointsServing,
                percentage: (mePointsReceiving + himPointsServing) > 0 ? Math.round((mePointsReceiving / (mePointsReceiving + himPointsServing)) * 100) : 0
            }
        };
    }
}
