import express from 'express';
import { getVideo } from '../controller/videoController.js';

const videoRouter = express.Router();

videoRouter.get('/:slide', getVideo)

export default videoRouter;