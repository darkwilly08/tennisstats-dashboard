import type { Racquet, Shoe, MaintenanceLogEntry } from './types'

export const mockRacquets: Racquet[] = [
    {
        id: 'racquet_1',
        name: 'Babolat Pure Aero',
        brand: 'Babolat',
        role: 'primary',
        stringSetup: {
            name: 'RPM Blast 17g',
            tension: 54,
            unit: 'lbs'
        },
        lastRestringDate: new Date().getTime() - (14 * 24 * 60 * 60 * 1000), // 2 weeks ago
        hoursPlayed: 12,
        estimatedLifeHours: 20,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApA0UIk8t5pJOGLNE7g3qD9NoI9nW4YhkXHGLqpyj8nVKAEBcs95-JpCBdPbltva2mBkM2njOFpZqi3gyqsAyYGbJ3MzyiDkBFyBvOq0Yib-_zSsBTzK964XCBoCiYsMuqCEFAQu3euJJpjNw3rK8VAXBNJwHGSj-YKg8LNfBF-AtNK0xCmnpkxPN_59FLZNzjvmAvRshDNgehJ2zKHL0HE36sLdTsCnsuctb7E4nlcTyQRx0kps1vQ_sE8K4gWdDgCk67g-bN3i8'
    },
    {
        id: 'racquet_2',
        name: 'Wilson Blade v8',
        brand: 'Wilson',
        role: 'backup',
        stringSetup: {
            name: 'Luxilon Alu Power',
            tension: 52,
            unit: 'lbs'
        },
        lastRestringDate: new Date().getTime() - (60 * 24 * 60 * 60 * 1000), // 2 months ago
        hoursPlayed: 32,
        estimatedLifeHours: 20,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjyu1wPML-VqrC6vhJqouuDvuRXYuRbfYFNpUUikuqnjaO-8mgj1En3ayglm5rz1-FRYC1orfnb-fEGFJPCKmeJSZcagLinejRLGQwwCcLVD7MnLKZ29A9ZymuHiwsIfRdj3F-hJyuhgHavkRPZAOOvbtGlcOccaDYXsU_wFbO2Dh38cw8XHc0sop9hOsNW68-uJQVjH5B-FOxly9KF2Yg0YKLoksay043m_nNZrBhibq4uWrk3RumwuOHlpgWLdqmbIihMgEx9P4'
    }
];

export const mockShoes: Shoe[] = [
    {
        id: 'shoe_1',
        model: 'Court FF 3',
        brand: 'Asics',
        status: 'active',
        distanceCoveredKm: 42.8,
        surface: 'Hard Court'
    }
];

export const mockMaintenanceLogs: MaintenanceLogEntry[] = [
    {
        id: 'log_1',
        type: 'overgrip',
        gearRef: 'racquet_1',
        date: new Date().getTime() - (24 * 60 * 60 * 1000), // Yesterday
        notes: 'Babolat VS Original White'
    },
    {
        id: 'log_2',
        type: 'restring',
        gearRef: 'racquet_2',
        date: new Date().getTime() - (60 * 24 * 60 * 60 * 1000), // 2 months ago
        notes: 'Luxilon Alu Power at 52lbs'
    },
    {
        id: 'log_3',
        type: 'new_gear',
        gearRef: 'shoe_1',
        date: new Date().getTime() - (90 * 24 * 60 * 60 * 1000), // 3 months ago
        notes: 'Added Asics Court FF 3 to rotation'
    }
];
