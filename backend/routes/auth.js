import express from 'express';
import { login, verifyToken, logout } from '../controller/authController.js';
import { authenticateToken } from '../middleware.js';

const authRouter = express.Router();

/**Ensures all get routes are authenticated from the middleware */
authRouter.get('*', authenticateToken, (req, res, next) => {
    console.log(req.user)
    next();
})

authRouter.get('/verify-token', verifyToken);
authRouter.get('/logout', logout);
authRouter.post('/login', login);

export default authRouter;