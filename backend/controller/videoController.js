import { Buffer } from 'buffer';
import { createReadStream } from 'fs';
import { Readable, Transform } from 'stream';


// var videoStream;
const getVideo = (req, res) => {
    // var n = 3;
    const n = req.params.slide;
try{
    const lessons = ['lesson.mp4', 'Ghostbusters2016.mp4', 'Ghostbusters2.mp4', 'GreatGhostbusters.mp4', 'PastorChris.mp4']
    var videoStream = createReadStream(lessons[n]);
    res.set({
         'Content-Type': 'video/mp4',
         'Cache-Control': 'public, max-age=6000',
    }
    );

    videoStream.on('error', () => {
        console.log('Error streaming video');
    })

    videoStream.pipe(res);

    res.prependListener('finish', ()=> {
        console.log("About to finish")
    })

    res.on('finish', () => {
        console.log("Stream finished!", n)
    })
}catch(err){
    return res.status(500).json({error: "Unable to stream video"})
}
    
}

export { getVideo }