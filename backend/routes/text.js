import express from 'express';
import { textPost } from '../controller/textController.js';
import { authenticateToken } from '../middleware.js';

const textRouter = express.Router();

/**Ensures all get routes are authenticated from the middleware */
// textRouter.get('*', authenticateToken, (req, res, next) => {
//     console.log(req.user)
//     next();
// })

textRouter.get('/page', textPost);

export default textRouter;