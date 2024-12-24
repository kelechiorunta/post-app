import { createReadStream } from 'fs';
import { Readable, Transform } from 'stream';

const textPost = (req, res) => {
    try {
        const readStream = createReadStream('Introduction.html', { encoding: 'utf8' });

        const transform = new Transform({
            transform(chunk, encoding, callback) {
                // Convert the chunk (Buffer) to a string if needed
                let content = chunk.toString();

                // Optionally modify the HTML content (e.g., add KC or a newline for full stops)
                content = content.replace(/\./g, '.\n');

                // Push the modified content to the next stream
                this.push(content);

                // Signal that the chunk processing is complete
                callback();
            }
        });

        // Set appropriate response headers
        res.set({
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=0',
        });

        // Pipe the readStream through the transform stream and then to the response
        readStream.on('error', (err) => {
            console.error('Error reading the HTML file:', err);
            res.status(500).send('Internal Server Error');
        });

        readStream.pipe(transform).pipe(res);

        // Optional: Add listeners for response stream lifecycle events
        res.prependListener('finish', () => {
            console.log('Text Stream about to finish');
        });

        res.on('finish', () => {
            console.log('Text Stream finished!');
        });
    } catch (err) {
        console.error('Error in textPost handler:', err);
        return res.status(500).json({ error: 'Unable to continue streaming' });
    }
};

export {textPost}