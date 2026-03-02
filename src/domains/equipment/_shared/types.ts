export interface Racquet {
    id: string;
    name: string;
    brand: string;
    role: 'primary' | 'backup' | 'retired';
    stringSetup: {
        name: string;
        tension: number;
        unit: 'lbs' | 'kg';
    };
    lastRestringDate: number;
    hoursPlayed: number;
    estimatedLifeHours: number;
    imageUrl?: string;
}

export interface Shoe {
    id: string;
    model: string;
    brand: string;
    status: 'active' | 'retired';
    distanceCoveredKm: number;
    surface: string;
    imageUrl?: string;
}

export interface MaintenanceLogEntry {
    id: string;
    type: 'restring' | 'overgrip' | 'new_gear' | 'repair';
    gearRef: string;
    date: number;
    notes?: string;
}
