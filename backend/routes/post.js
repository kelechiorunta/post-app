import express from 'express';
import { getPostFullPictures,  getPostPlaceholderPictures } from '../controller/postController.js';


const postRouter = express.Router();

postRouter.get('/fullPicture/:index', getPostFullPictures);
postRouter.get('/placeholderPicture/:index', getPostPlaceholderPictures);

export default postRouter;