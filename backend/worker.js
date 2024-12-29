import { parentPort, workerData } from 'worker_threads';
import { readFile } from 'fs/promises';

const fetchPicture = async(filePath) => {
    try{
        const bufferedPic = await readFile(filePath);
        return bufferedPic.toString('base64');
    }catch(err){
        console.log("Buffering failed")
    }
}

( async()=>{
    const base64Data = await fetchPicture(workerData);
    parentPort.postMessage(base64Data);
})()