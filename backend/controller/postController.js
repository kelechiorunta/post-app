
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import sharp from 'sharp';
import Redis from 'ioredis';

// Initialize Redis client
const redis = new Redis({
    host: 'redis-16067.c259.us-central1-2.gce.redns.redis-cloud.com',
    port:  16067,
    password: 'rLsIBbeDzeoJCGYNdRgNbG56K4Ku61tw', // Replace with your Redis Cloud password
    // tls: {
    //     minVersion: 'TLSv1.2', // Ensure TLS 1.2 or later is used
    //     rejectUnauthorized: false,
    // },
});

const getPostPlaceholderPictures = async (req, res) => {
    const index = req.params.index;

    const pictures = [
        './public/imgs/flower.jpg',
        './public/imgs/flower2.jpg',
        './public/imgs/Kusman.jpg',
        './public/imgs/people.jpg',
        './public/imgs/reflection.jpg',
        './public/imgs/horizon.jpg',
        './public/imgs/laundry.jpg',
        './public/imgs/treatment.jpg',
        './public/imgs/pretreatment.jpg',
        './public/imgs/product1.jpg',
        './public/imgs/product3.jpg',
        './public/imgs/product4.jpg',
        './public/imgs/product6.jpg',
        './public/imgs/product5.jpg',
        './public/imgs/product7.jpg',
        './public/logo512.png',
    ];

    try {
        // Check if placeholder is cached
        const cacheKey = `placeholder:${index}`;
        const cachedPlaceholder = await redis.get(cacheKey);

        if (cachedPlaceholder) {
            console.log('Cache hit for placeholder');
            res.set({
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=6000',
            });
            // console.log('Redis Cached successful')
            return res.send(Buffer.from(cachedPlaceholder, 'base64'));
        }

        // Generate placeholder buffer using sharp
        const placeholderIndexedBuffer = await sharp(pictures[index]).resize(100).toBuffer();

        // Cache the placeholder buffer in Redis
        await redis.set(cacheKey, placeholderIndexedBuffer.toString('base64'), 'EX', 3600); // Cache for 1 hour
        // console.log("Redis successful")

        // Stream the placeholder buffer
        const readPlaceholderBuffers = (buffer) => {
            const readable = new Readable();
            readable.push(buffer);
            readable.push(null);
            return readable;
        };

        const createPictureStream = readPlaceholderBuffers(placeholderIndexedBuffer);

        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });

        createPictureStream.on('error', () => {
            console.log('Error streaming placeholder picture');
        });

        createPictureStream.pipe(res);

        res.prependListener('finish', () => {
            console.log('Placeholder streaming is about to finish');
        });

        res.on('finish', () => {
            console.log('Streamed placeholder picture successfully');
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error. Failed to stream' });
    }
};

const getPostFullPictures = async (req, res) => {
    const index = req.params.index;

    const pictures = [
        './public/imgs/flower.jpg',
        './public/imgs/flower2.jpg',
        './public/imgs/Kusman.jpg',
        './public/imgs/people.jpg',
        './public/imgs/reflection.jpg',
        './public/imgs/horizon.jpg',
        './public/imgs/laundry.jpg',
        './public/imgs/treatment.jpg',
        './public/imgs/pretreatment.jpg',
        './public/imgs/product1.jpg',
        './public/imgs/product3.jpg',
        './public/imgs/product4.jpg',
        './public/imgs/product6.jpg',
        './public/imgs/product5.jpg',
        './public/imgs/product7.jpg',
        './public/logo512.png',
    ];

    try {
        // Check if full picture is cached
        const cacheKey = `fullPicture:${index}`;
        const cachedPicturePath = await redis.get(cacheKey);

        if (cachedPicturePath) {
            console.log('Cache hit for full picture');
            const createPictureStream = createReadStream(cachedPicturePath);

            res.set({
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=6000',
            });

            createPictureStream.on('error', () => {
                console.log('Error streaming full picture');
            });

            createPictureStream.pipe(res);

            res.prependListener('finish', () => {
                console.log('Full picture streaming is about to finish');
            });

            res.on('finish', () => {
                console.log('Streamed full picture successfully');
            });

            return;
        }

        // Cache the full picture path in Redis
        await redis.set(cacheKey, pictures[index], 'EX', 3600); // Cache for 1 hour
        // console.log("Successful Redis caching")
        // Stream the full picture
        const createPictureStream = createReadStream(pictures[index]);

        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });

        createPictureStream.on('error', () => {
            console.log('Error streaming full picture');
        });

        createPictureStream.pipe(res);

        res.prependListener('finish', () => {
            console.log('Full picture streaming is about to finish');
        });

        res.on('finish', () => {
            console.log('Streamed full picture successfully');
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error. Failed to stream' });
    }
};

export { getPostFullPictures, getPostPlaceholderPictures };
