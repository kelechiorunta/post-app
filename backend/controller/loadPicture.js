import fs from 'fs';
import { createReadStream } from 'fs';
import redis from '../redis.js';
import sharp from 'sharp';
import { Readable } from 'stream';

const pictures = [
    './public/imgs/Logo15.png',
    './public/imgs/Logo14.png',
    './public/imgs/Logo9.png',
];

const getPicture = async (req, res) => {
    const pictureId = req.params.id;

    try {
        // Validate if the picture ID exists in the array
        if (!pictures[pictureId]) {
            return res.status(404).json({ error: 'Picture not found' });
        }

        const filePath = pictures[pictureId];

        // Read the picture as a stream for immediate response
        const readStream = createReadStream(filePath);
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });

        // Stream the picture to the client
        readStream.pipe(res);

        readStream.on('error', (error) => {
            console.error('Error streaming picture:', error);
            res.status(500).json({ error: 'Failed to stream picture' });
        });

        readStream.on('end', async () => {
            console.log('Picture streamed successfully.');

            // Cache the picture in Redis after streaming
            try {
                const pictureBuffer = await fs.promises.readFile(filePath);
                await redis.set(
                    `picture:${pictureId}`, 
                    pictureBuffer.toString('base64'), 
                    'EX', 
                    3600
                ); // Cache for 1 hour
                console.log('Picture cached successfully in Redis.');
            } catch (cacheError) {
                console.error('Error caching picture in Redis:', cacheError.message);
            }
        });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return res.status(500).json({ error: 'Failed to process picture request' });
    }
};

const getIntroPic = async(req, res) => {
    try{
        const readStream = createReadStream('./public/imgs/image2.png');

        res.set({
            'Content-Type' : 'image/jpeg',
            'Cache-Control': 'public, maxAge=6000'
        })

        readStream.on('error', () => {
            console.log('Error in streaming')
            res.status(500).json({error: "Unable to stream"})
        })

        readStream.pipe(res);

        readStream.on('end', async() => {
            try{
                const introPicBuffer = await fs.promises.readFile('./public/imgs/image2.png');
                await redis.set('introPic', introPicBuffer.toString('base64'), 'EX', 6000);
                console.log("Cached successfully in redis");
            }
            catch(err){
                console.error('Cached failed in Redis')
            }
        })
    } catch(err) {
        console.error("Failed streaming and caching operation")
        return res.status(500).json({error: "Failed to stream and cache"})
    }
}

const getIntroPlaceholder = async(req, res) => {
    try{
        const placeholderBuffer = await sharp('./public/imgs/image2.png').resize(100).toBuffer();

        const createReadStream = (buffer) => {
            const readable = new Readable();
            readable.push(buffer);
            readable.push(null);
            return readable;
        }

        const readStream = createReadStream(placeholderBuffer);
        
        readStream.on('error', () => {
            console.error("Unable to stream further");
            return res.status(500).json({error: "Server stream error"})
        })
        
        readStream.pipe(res);

        readStream.on('end', async() => {
            try {
                console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);
                await redis.set('placeholderKey', placeholderBuffer.toString('base64'), 'EX', 6000);
                // console.log("Cached successfully in Redis")
            }catch(err){
                console.log('Cache issue');
                return res.status(500).json({error: "Cached issues"})
            }
        })
    }catch(err){
        console.log("Error in caching and streaming");
        return res.status(500).json({error: "Server Error: Failed to stream and cache"})
    }
}

export { getPicture, getIntroPic, getIntroPlaceholder };
