import jwt from 'jsonwebtoken'
// import { connectDB } from './db.js';

const authenticateToken = async(req, res, next) => {

    // if (!process.env.JWT_SECRET){
    //     return res.status(401).json({error: "No secret key"})
    // }

    if (!req.cookies?.reflection) {
        return res.redirect('/login');
    }

    jwt.verify(req.cookies.reflection, 'secret', (err, decoded) => {
        if (err) {
            return res.status(400).json({error: "Expired or Invalid Token"});
        }
        const token = decoded.user
        req.user = token;
        next();
    })
}

export { authenticateToken }