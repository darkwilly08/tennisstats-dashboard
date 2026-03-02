export interface MatchPayload {
    idt: number;
    fdt?: number;
    rival: string;
    win: boolean;
    firstService: boolean;
    games: number;
    tiebreak: boolean;
    supertb: boolean;

    // Owner stats
    me_points_won: number;
    me_breaks: number;
    me_break_points: number;
    me_serve_won: number;

    // Rival stats
    him_points_won: number;
    him_breaks: number;
    him_break_points: number;
    him_serve_won: number;

    sets: SetPayload[];
    health_metrics?: HealthMetricsPayload;
}

export interface SetPayload {
    id: number;
    idt: number;
    fdt?: number;
    me: number;
    rival: number;
    is_complete: boolean;
    stats: {
        me: {
            breaks: number;
            break_points: number;
            points_won_serving: number;
        };
        him: {
            breaks: number;
            break_points: number;
            points_won_serving: number;
        };
    };
    tiebreak?: {
        me: number;
        him: number;
    };
}

export interface HealthMetricsPayload {
    active_calories: number;
    total_steps: number;
    duration_ms: number;
    heart_rate: {
        avg: number;
        max: number;
    };
}
