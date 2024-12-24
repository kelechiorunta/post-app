import express from 'express';
import redis from '../redis.js';
import { getPicture, getIntroPic, getIntroPlaceholder } from '../controller/loadPicture.js';

const pictureRouter = express.Router();

const cacheIntroPic = async(req, res, next) => {

    try{
        const cachedPic = await redis.get('introPic');
         if (cachedPic) {
            res.set({
                'Content-Type' : 'image/jpeg',
                'Cache-Control' : 'public, maxAge=6000' 
            })
            console.log('Cache still active')
            return res.send(Buffer.from(cachedPic, 'base64'))
         } else {
            console.log('Cache has expired')
            next();
         }
    } catch(err) {
        return res.status(404).json({error: err.message})
    }
}

const cachePicture = async (req, res, next) => {
    const pictureId = req.params.id;

    try {
        // Check if the picture is cached in Redis
        const cachedPic = await redis.get(`picture:${pictureId}`);
        if (cachedPic) {
            console.log('Cache hit for picture:', pictureId);

            // Return the cached picture as a response
            res.set({
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=6000',
            });
            return res.send(Buffer.from(cachedPic, 'base64'));
        }

        console.log('Cache miss for picture:', pictureId);
        next(); // Proceed to the controller if not cached
    } catch (err) {
        console.error('Error accessing Redis cache:', err.message);
        return res.status(500).json({ error: 'Failed to retrieve picture from cache' });
    }
};

const cacheIntroPlaceholder = async(req, res, next) => {
    try{
        const cachedPlaceholder = await redis.get('placeholderKey');
        if (cachedPlaceholder) {
            res.set({
                'Content-Type' : 'image/jpeg',
                'Cache-Control': 'public, maxAge=6000'
            })
            return res.send(Buffer.from(cachedPlaceholder, 'base64'))
        }else{
            console.log("Cache Expired or null")
            next();
        }
    }catch(err){
        console.error("Unable to cache");
        return res.status(500).json({error: err.message})
    }
}

// pictureRouter.get('/:id', cachePicture, getPicture);
pictureRouter.get('/pic', cacheIntroPic, getIntroPic);
pictureRouter.get('/pholder', cacheIntroPlaceholder, getIntroPlaceholder);

export default pictureRouter;