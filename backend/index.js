import express from 'express';
import cors from 'cors';
import fs, { createReadStream, read } from 'fs'
import { Readable, Duplex, Transform } from 'stream';
import sharp from 'sharp';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import videoRouter from './routes/video.js';
import textRouter from './routes/text.js';
import postRouter from './routes/post.js';
import pictureRouter from './routes/picture.js';
import { WebSocketServer } from 'ws';
import Redis from 'ioredis';
import path from 'path';
import { Worker } from 'worker_threads';

const dirname_img = path.join(import.meta.dirname, './product9.jpg')

const redis = new Redis({
    host: 'redis-16067.c259.us-central1-2.gce.redns.redis-cloud.com',
    port:  16067,
    password: 'rLsIBbeDzeoJCGYNdRgNbG56K4Ku61tw',
})

const server = express();

const allowedOrigins = ['https://node-test-bice.vercel.app', '*', 'http://localhost:3000', , 'http://localhost:6379' ]
let corsSetup = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin){
            return callback(null, true)
        }else{
            return callback("Not an allowed domain", false)
        }
    },
    credentials: true,
    method: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

server.use(cors(corsSetup));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/auth', authRouter);
server.use('/video', videoRouter);
server.use('/text', textRouter);
server.use('/post', postRouter);
server.use('/picture', pictureRouter);

// server.get('/landingPlaceholder', async(req, res) => {
//     let cachedKey;
//     let isCached = false;
//     try {

//         // Check if placeholder is cached
//         // const cachedKey = `placeholder:${index}`; // const cachedPlaceholder = await redis.get(cacheKey);

//         const cachedlandingPlaceholder = await redis.get(cachedKey);

//         if (cachedlandingPlaceholder) {
//             isCached = true;
//             res.set({
//                 'Content-Type': 'image/jpeg',
//                 'Cache-Control': 'public, max-age=6000',
//             });
//             console.log('Cached landing placeholder successful', cachedlandingPlaceholder)
//             return res.send(Buffer.from(cachedlandingPlaceholder, 'base64'));

//         }
//         // Generate a placeholder image (resize and optimize with sharp)
//         const placeholderBuffer = await sharp('./public/imgs/reflection.jpg')
//             .resize(100) // Resize to a smaller width for placeholder
//             .toBuffer();

//         // Cache the placeholder buffer in Redis
//         await redis.set(cachedKey, placeholderBuffer.toString('base64'), 'EX', 3600); // Cache for 1 hour
//         console.log("Redis landing placeoilder successful", isCached)

//         // Convert the buffer into a readable stream
//         const placeholderReadable = new Readable();
//         placeholderReadable.push(placeholderBuffer);
//         placeholderReadable.push(null);

//         // Set appropriate headers for an image response
//         res.set({
//             'Content-Type': 'image/jpeg',
//             'Cache-Control': 'public, max-age=6000',
//         });

//         // Pipe the readable stream to the response
//         placeholderReadable.pipe(res);

//         // Handle errors on the readable stream
//         placeholderReadable.on('error', (err) => {
//             console.error('Error streaming placeholder:', err);
//             res.statusCode = 500;
//             res.end('Internal Server Error');
//         });

//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.statusCode = 500;
//         res.end('Internal Server Error');
//     }
// })

// server.get('/landingPicture', async(req, res) => {
//     try {
//         const readableStream = fs.createReadStream('./public/imgs/reflection.jpg')

//         // Set appropriate headers for an image response
//         res.set({
//             'Content-Type': 'image/jpeg',
//             'Cache-Control': 'public, max-age=6000',
//         });

//         // Pipe the readable stream to the response
//         readableStream.pipe(res);

//         // Handle errors on the readable stream
//         readableStream.on('error', (err) => {
//             console.error('Error streaming placeholder:', err);
//             res.statusCode = 500;
//             res.end('Internal Server Error');
//         });

//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.statusCode = 500;
//         res.end('Internal Server Error');
//     }
// })


server.get('/landingPlaceholder', async (req, res) => {
    const cachedKey = 'landingPlaceholder';
    try {
        // Check if placeholder is cached
        const cachedlandingPlaceholder = await redis.get(cachedKey);

        if (cachedlandingPlaceholder) {
            console.log('Cache hit: landing placeholder');
            res.set({
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=6000',
            });
            return res.send(Buffer.from(cachedlandingPlaceholder, 'base64'));
        }

        // Generate a placeholder buffer using sharp
        const placeholderBuffer = await sharp('./public/imgs/reflection.jpg')
            .resize(100) // Resize to a smaller width for placeholder
            .toBuffer();

        // Cache the placeholder buffer in Redis
        await redis.set(cachedKey, placeholderBuffer.toString('base64'), 'EX', 3600); // Cache for 1 hour
        console.log("Cached landingbuffer")
        // Set appropriate headers and send the buffer
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });
        res.send(placeholderBuffer);

        console.log('Generated and cached placeholder successfully');
    } catch (error) {
        console.error('Error processing placeholder request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.get('/landingPicture', async (req, res) => {
    const cachedKey = 'landingPicture';
    try {
        // Check if the full image is cached
        const cachedLandingPicture = await redis.get(cachedKey);

        if (cachedLandingPicture) {
            console.log('Cache hit: landing picture');
            res.set({
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=6000',
            });
            return res.send(Buffer.from(cachedLandingPicture, 'base64'));
        }

        // Read the image from disk and cache it
        const pictureBuffer = await fs.promises.readFile('./public/imgs/reflection.jpg');
        await redis.set(cachedKey, pictureBuffer.toString('base64'), 'EX', 3600); // Cache for 1 hour
        console.log("Cached landingPicture")
        // Set headers and send the image
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });
        res.send(pictureBuffer);

        console.log('Generated and cached landing picture successfully');
    } catch (error) {
        console.error('Error processing picture request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


server.get('/naturePlaceholder', async(req, res) => {
    try {
        // Generate a placeholder image (resize and optimize with sharp)
        const placeholderBuffer = await sharp('./public/imgs/flower2.jpg')
            .resize(100) // Resize to a smaller width for placeholder
            .toBuffer();

        // Convert the buffer into a readable stream
        const placeholderReadable = new Readable();
        placeholderReadable.push(placeholderBuffer);
        placeholderReadable.push(null);

        // Set appropriate headers for an image response
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });
        // Pipe the readable stream to the response
        placeholderReadable.pipe(res);

        // Handle errors on the readable stream
        placeholderReadable.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})

server.get('/naturePicture', async(req, res) => {
    try {
        const readableStream = fs.createReadStream('./public/imgs/flower2.jpg')

        // Set appropriate headers for an image response
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });
        // Pipe the readable stream to the response
        readableStream.pipe(res);

        // Handle errors on the readable stream
        readableStream.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})

server.get('/peoplePlaceholder', async(req, res) => {
    try {
        // Generate a placeholder image (resize and optimize with sharp)
        const placeholderBuffer = await sharp('./public/imgs/people.jpg')
            .resize(100) // Resize to a smaller width for placeholder
            .toBuffer();

        // Convert the buffer into a readable stream
        const placeholderReadable = new Readable();
        placeholderReadable.push(placeholderBuffer);
        placeholderReadable.push(null);

        // Set appropriate headers for an image response
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });

        // Pipe the readable stream to the response
        placeholderReadable.pipe(res);

        // Handle errors on the readable stream
        placeholderReadable.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})

server.get('/peoplePicture', async(req, res) => {
    try {
        const readableStream = fs.createReadStream('./public/imgs/people.jpg')

        // Set appropriate headers for an image response
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });

        // Pipe the readable stream to the response
        readableStream.pipe(res);

        // Handle errors on the readable stream
        readableStream.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})

server.get('/profilePlaceholder', async(req, res) => {
    try {
        // Generate a placeholder image (resize and optimize with sharp)
        const placeholderBuffer = await sharp('./public/imgs/flower.jpg')
            .resize(100) // Resize to a smaller width for placeholder
            .toBuffer();

        // Convert the buffer into a readable stream
        const placeholderReadable = new Readable();
        placeholderReadable.push(placeholderBuffer);
        placeholderReadable.push(null);

        // Set appropriate headers for an image response
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });

        // Pipe the readable stream to the response
        placeholderReadable.pipe(res);

        // Handle errors on the readable stream
        placeholderReadable.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})

server.get('/profilePicture', async(req, res) => {
    try {
        const readableStream = fs.createReadStream('./public/imgs/flower.jpg')

        // Set appropriate headers for an image response
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=6000',
        });

        // Pipe the readable stream to the response
        readableStream.pipe(res);

        // Handle errors on the readable stream
        readableStream.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})

server.get('/dashboardPlaceholder', async(req, res) => {
    try {
        // Generate a placeholder image (resize and optimize with sharp)
        const placeholderBuffer = await sharp('./public/imgs/flower2.jpg')
            .resize(100) // Resize to a smaller width for placeholder
            .toBuffer();

        // Convert the buffer into a readable stream
        const placeholderReadable = new Readable();
        placeholderReadable.push(placeholderBuffer);
        placeholderReadable.push(null);

        // Set appropriate headers for an image response
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=9000',
        });
        // Pipe the readable stream to the response
        placeholderReadable.pipe(res);

        // Handle errors on the readable stream
        placeholderReadable.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})

server.get('/dashboardPicture', async(req, res) => {
    try {
        const readableStream = fs.createReadStream('./public/imgs/flower2.jpg')

        // Set appropriate headers for an image response
        res.set({
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=9000',
        });
        // Pipe the readable stream to the response
        readableStream.pipe(res);

        // Handle errors on the readable stream
        readableStream.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})

server.get('/intros/:id', async(req, res) => {
        const id = req.params.id
    try {
        const intros = [
            "Daily Inspirations and Affirmations",
            "Get a boost of Motivational Quotes",
            "Memorable Bible Stories & Lessons",
            "Be Inspired with the right words"
        ]
        // const readableStream = fs.createReadStream('Hello there, Buddy!')
        const readGreeting = (buffer) => {
            const readable = new Readable();
            readable.push(buffer);
            readable.push(null)
            return readable;
        }
        const readableStream = readGreeting(intros[id])
        // Set appropriate headers for an image response
        res.setHeader('Content-Type', 'text/plain');

        // Pipe the readable stream to the response
        readableStream.pipe(res);

        // Handle errors on the readable stream
        readableStream.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})

server.get('/transformgreetings', async(req, res) => {
    try {
        // const readableStream = fs.createReadStream('Hello there, Buddy!')
        const readGreeting = (buffer) => {
            const readable = new Readable();
            readable.push(buffer);
            readable.push(null)
            return readable;
        }

        const transform = new Transform({
            transform(buffer, encoding, callback){
                this.push(buffer.toString().toUpperCase());
                this.push(null)
            }
        })

        const duplexStream = new Duplex({
            write(chunk, encoding, callback){
                console.log("Writing", chunk.toString())
                this.push(chunk)
                this.push(null)
                callback();
            },
            read(size){
                console.log("Sizes", size);
            }
        })

        duplexStream.on('data', (chunk) => {
            console.log('Read', chunk.toString())
        })

        const readableStream = readGreeting("Daily Reflections")
        // Set appropriate headers for an image response
        res.setHeader('Content-Type', 'text/plain');

        // Pipe the readable stream to the response
        readableStream.pipe(transform).pipe(res);

        // Handle errors on the readable stream
        readableStream.on('error', (err) => {
            console.error('Error streaming placeholder:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
})
let reqNum = 0;

server.get('/base', (req, res) => {
    reqNum++;
    console.log(reqNum)
    // Create Worker instance
    const worker = new Worker(path.resolve('./backend/worker.js'), {
        workerData: path.resolve('./public/imgs/product5.jpg'),
    });

    // console.log('Worker initialized:', worker);

    worker.on('message', (data) => {
        if (reqNum > 3) {
            console.log("Hit five times");

            // Ensure response is not sent more than once
            if (!res.headersSent) {
                res.status(200).json({ message: 'Hit five times', workerData: data.toString() });
            }
        }
    });

    worker.on('error', (err) => {
        console.error("Worker's failure:", err);

        // Ensure response is sent for worker error
        if (!res.headersSent) {
            res.status(500).json({ error: "Worker error occurred" });
        }
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);

            // Ensure response is sent for worker exit errors
            if (!res.headersSent) {
                res.status(500).json({ error: `Worker exited with code ${code}` });
            }
        }
    });

    // Stream the file
    try {
        const readableStream = fs.createReadStream('./public/imgs/product5.jpg');

        readableStream.on('error', (err) => {
            console.error("ReadStream failed:", err);

            // Ensure response is sent for stream errors
            if (!res.headersSent) {
                res.status(500).json({ error: "ReadStream failed" });
            }
        });

        // Pipe the stream to the response
        if (!res.headersSent) {
            // res.setHeader('Content-Type', 'image/jpeg')
            res.set({
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, maxAge=6000'
            })
            readableStream.pipe(res);
        }
    } catch (err) {
        console.error("Stream error:", err.message);

        // Ensure response is sent for stream errors
        if (!res.headersSent) {
            res.status(500).json({ error: "Unable to stream" });
        }
    }
});

server.listen(7000, () => {
    console.log(`Server is listening at port ${7000}`);
})

process.on('message', (msg, handler) => {
    console.log(`Message recieved was ${msg} from ${process.pid}`)
})

const sockServer = new WebSocketServer({port: 7500});

sockServer.on('connection', ws => {
    console.log('New client connected!')
    
    ws.send('Connection Established')
    
    ws.on('close', () => console.log('Client has disconnected!'))

    ws.on('message', data => {
        sockServer.clients.forEach(client => {
        console.log(`distributing message: ${data}`)
        client.send(`${data}`)
        })
    })
    
    ws.onerror = function () {
        console.log('websocket error')
    }
})

export default server