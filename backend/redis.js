// Create a single Redis client instance
import Redis from 'ioredis';

// Reuse this instance throughout your app
const redis = new Redis({
    host: 'redis-16067.c259.us-central1-2.gce.redns.redis-cloud.com',
    port: 16067,
    password: 'rLsIBbeDzeoJCGYNdRgNbG56K4Ku61tw',
});

export default redis; // Export the instance for reuse
