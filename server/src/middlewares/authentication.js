import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/responseHandler.js';
import User from '../models/User.js';


const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];
            return jwt.verify(token, process.env.JWT_SECRET, {algorithm: 'HS256'}); 
        }
        return false;
    } catch {
        return false;
    }
}
async function authenticate(req, res, next){
    const tokenDecoded = tokenDecode(req);
    if (!tokenDecoded) return responseHandler.unauthorized(res);
    const user = await User.findById(tokenDecoded.id);
    if (!user) return responseHandler.unauthorized(res);
    req.user = user;
    next();
}

export default {tokenDecode, authenticate}