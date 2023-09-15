import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import responseHandler from "../handlers/responseHandler.js";

const signUp = async(req, res) => {
    try {
        const { username, password, displayName } = req.body;
        const validUser = await User.findOne({ username });
        if (validUser) return responseHandler.badRequest(res, "Username already in use.");

        const user = new User({
            username, 
            displayName
        })
        
        user.setPassword(password);
        await user.save();

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET, 
            {
                algorithm: 'HS256', 
                expiresIn: '24h'
            }
        );

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        });
    } catch {
        responseHandler.error(res);
    }
}

const signIn = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select("username password id displayName");

        if (!user) return responseHandler.badRequest(res, "User not exist");
        const IsValidPassword = await user.validPassword(password);
        if (!IsValidPassword) {
            return responseHandler.unauthorized(res);
        }
        
        
        const token = jwt.sign(
            { id: user.id},
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256', 
                expiresIn: '24h'
            }
        );

        user.password = undefined;
        user.salt = undefined;

        responseHandler.ok(res, {
            token,
            ...user._doc,
            id: user.id
        })
    } catch {
        responseHandler.error(res)
    }
}

const getInfo = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) return responseHandler.notFound(res);

        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res);
    }
}

export default { signIn, signUp, getInfo }