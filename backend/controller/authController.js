import jwt from 'jsonwebtoken';


//Verify Token for middleware and every request/response cycle
const verifyToken = (req, res) => {
    if (!req?.cookies?.reflection || !req.user) {
        return res.status(400).json({isValid: false, error: "No authorization, expired cookie!"});
    }
    else{
        return res.status(200).json({isValid: true, user:req.user, message:"Token Valid"})
    }
}

//Login controller for user authentication
const login = (req, res) => {
    const { email, password } = req.body;

    try{
        if (!email || !password) {
            return res.status(400).json({error: "Invalid entries"})
        }

        if (email=="admin@gmail.com" && password=="admin"){
            const user = {email:"admin@gmail.com", password:"admin"}
            const token = jwt.sign({user}, 'secret', {expiresIn: '60m'});
            const cookieOptions = {
                path: '/',
                Secure:true,
                maxAge:60*60*1000,
                SameSite:'None',
                httpOnly:true,
            }
            
            res.cookie('reflection', token, cookieOptions);
          return res.status(200).json({message: "User logged in successfully", user})
        }
        
    }catch(err){
        return res.status(500).json({error: "Login Server Error"})
    }
}

//Controller to logout the user
const logout = (req, res) => {
    try{
        const options = {
            SameSite: 'None',
            Secure: true,
            maxAge: 0,
            httpOnly: true,
            path: '/'
        }
        res.clearCookie('reflection', options);
        res.status(200).json({message: "User successfully logged out"})
    }
    catch(err) {
        return res.status(500).json({error: "Server Error. Unable to logout."})
    }
    
}

export { login, verifyToken, logout }