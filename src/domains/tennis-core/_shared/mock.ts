import type { MatchPayload } from './types'

export const mockMatches: MatchPayload[] = [
    {
        idt: new Date('2024-02-25T20:12:00').getTime(),
        fdt: new Date('2024-02-25T21:23:00').getTime(),
        rival: "J. Rodriguez",
        win: true,
        firstService: true,
        games: 17,
        tiebreak: false,
        supertb: false,
        me_points_won: 45,
        me_breaks: 6,
        me_break_points: 9,
        me_serve_won: 22,
        him_points_won: 31,
        him_breaks: 0,
        him_break_points: 1,
        him_serve_won: 15,
        health_metrics: {
            active_calories: 450,
            total_steps: 2800,
            duration_ms: 4260000,
            heart_rate: { avg: 138, max: 175 }
        },
        sets: [
            {
                id: 1, idt: 1, me: 6, rival: 2, is_complete: true,
                stats: { me: { breaks: 3, break_points: 4, points_won_serving: 12 }, him: { breaks: 0, break_points: 0, points_won_serving: 8 } }
            },
            {
                id: 2, idt: 2, me: 6, rival: 3, is_complete: true,
                stats: { me: { breaks: 3, break_points: 5, points_won_serving: 10 }, him: { breaks: 0, break_points: 1, points_won_serving: 7 } }
            }
        ]
    },
    {
        idt: new Date('2024-02-18T18:00:00').getTime(),
        fdt: new Date('2024-02-18T20:15:00').getTime(),
        rival: "Marian",
        win: true,
        firstService: false,
        games: 26,
        tiebreak: false,
        supertb: false,
        me_points_won: 65,
        me_breaks: 5,
        me_break_points: 8,
        me_serve_won: 30,
        him_points_won: 55,
        him_breaks: 2,
        him_break_points: 5,
        him_serve_won: 28,
        health_metrics: {
            active_calories: 520,
            total_steps: 3500,
            duration_ms: 8100000,
            heart_rate: { avg: 145, max: 182 }
        },
        sets: [
            {
                id: 1, idt: 1, me: 6, rival: 2, is_complete: true,
                stats: { me: { breaks: 2, break_points: 3, points_won_serving: 10 }, him: { breaks: 0, break_points: 1, points_won_serving: 5 } }
            },
            {
                id: 2, idt: 2, me: 3, rival: 6, is_complete: true,
                stats: { me: { breaks: 1, break_points: 2, points_won_serving: 8 }, him: { breaks: 2, break_points: 3, points_won_serving: 15 } }
            },
            {
                id: 3, idt: 3, me: 6, rival: 3, is_complete: true,
                stats: { me: { breaks: 2, break_points: 3, points_won_serving: 12 }, him: { breaks: 0, break_points: 1, points_won_serving: 8 } }
            }
        ]
    },
    {
        idt: new Date('2024-02-10T09:30:00').getTime(),
        fdt: new Date('2024-02-10T11:45:00').getTime(),
        rival: "Marian",
        win: false,
        firstService: true,
        games: 32,
        tiebreak: true,
        supertb: false,
        me_points_won: 72,
        me_breaks: 4,
        me_break_points: 10,
        me_serve_won: 38,
        him_points_won: 78,
        him_breaks: 6,
        him_break_points: 9,
        him_serve_won: 41,
        health_metrics: {
            active_calories: 680,
            total_steps: 4200,
            duration_ms: 8100000,
            heart_rate: { avg: 151, max: 188 }
        },
        sets: [
            {
                id: 1, idt: 1, me: 6, rival: 7, is_complete: true,
                tiebreak: { me: 5, him: 7 },
                stats: { me: { breaks: 1, break_points: 3, points_won_serving: 18 }, him: { breaks: 1, break_points: 2, points_won_serving: 20 } }
            },
            {
                id: 2, idt: 2, me: 6, rival: 3, is_complete: true,
                stats: { me: { breaks: 2, break_points: 4, points_won_serving: 12 }, him: { breaks: 0, break_points: 1, points_won_serving: 8 } }
            },
            {
                id: 3, idt: 3, me: 4, rival: 6, is_complete: true,
                stats: { me: { breaks: 1, break_points: 3, points_won_serving: 8 }, him: { breaks: 5, break_points: 6, points_won_serving: 13 } }
            }
        ]
    },
    {
        idt: new Date('2024-01-28T16:00:00').getTime(),
        fdt: new Date('2024-01-28T17:10:00').getTime(),
        rival: "Cano",
        win: false,
        firstService: false,
        games: 17,
        tiebreak: false,
        supertb: false,
        me_points_won: 30,
        me_breaks: 1,
        me_break_points: 3,
        me_serve_won: 15,
        him_points_won: 48,
        him_breaks: 4,
        him_break_points: 6,
        him_serve_won: 22,
        health_metrics: {
            active_calories: 320,
            total_steps: 2100,
            duration_ms: 4200000,
            heart_rate: { avg: 132, max: 168 }
        },
        sets: [
            {
                id: 1, idt: 1, me: 3, rival: 6, is_complete: true,
                stats: { me: { breaks: 1, break_points: 2, points_won_serving: 8 }, him: { breaks: 2, break_points: 3, points_won_serving: 12 } }
            },
            {
                id: 2, idt: 2, me: 2, rival: 6, is_complete: true,
                stats: { me: { breaks: 0, break_points: 1, points_won_serving: 7 }, him: { breaks: 2, break_points: 3, points_won_serving: 10 } }
            }
        ]
    },
    {
        idt: new Date('2023-12-15T18:30:00').getTime(),
        fdt: new Date('2023-12-15T20:00:00').getTime(),
        rival: "Jonathann",
        win: true,
        firstService: true,
        games: 21,
        tiebreak: true,
        supertb: false,
        me_points_won: 55,
        me_breaks: 4,
        me_break_points: 7,
        me_serve_won: 25,
        him_points_won: 42,
        him_breaks: 2,
        him_break_points: 5,
        him_serve_won: 20,
        sets: [
            {
                id: 1, idt: 1, me: 7, rival: 6, is_complete: true,
                tiebreak: { me: 7, him: 4 },
                stats: { me: { breaks: 2, break_points: 4, points_won_serving: 15 }, him: { breaks: 2, break_points: 3, points_won_serving: 12 } }
            },
            {
                id: 2, idt: 2, me: 6, rival: 2, is_complete: true,
                stats: { me: { breaks: 2, break_points: 3, points_won_serving: 10 }, him: { breaks: 0, break_points: 2, points_won_serving: 8 } }
            }
        ]
    }
];
