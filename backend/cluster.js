import cluster from 'cluster';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const cpuCores = os.cpus().length;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (cluster.isPrimary) {

    console.log(`Primary process ${process.pid} is running`);

    cluster.setupPrimary({
        exec: path.resolve(__dirname, 'index.js')
    })
    
    // Fork workers
    for (let i = 0; i < cpuCores; i++) {
        const worker = cluster.fork({
            // ...process.env, // Ensure existing env vars are passed
            // JWT_SECRET: process.env.JWT_SECRET || 'fallbacksecret', // Explicitly include JWT_SECRET
        });
    
        // Send initial message to the worker
        worker.send(`Worker ${worker.process.pid}, initialize your setup`);
    }
    
    // Listen for messages from workers
    for (const id in cluster.workers) {
        cluster.workers[id].on('message', (msg) => {
            console.log(`Message from Worker ${id}: ${msg}`);
        });
    }
    
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} has disconnected`)
        cluster.fork()
    })
}

export default cluster;