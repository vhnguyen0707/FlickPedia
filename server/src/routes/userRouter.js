import express from 'express';  
import authentication from "../controllers/authentication.js";
import { body } from 'express-validator';
import favoriteController from "../controllers/favoriteController.js";
import User from "../models/User.js";
import requestHandler from '../handlers/requestHandler.js';
import auth from '../middlewares/authentication.js';

const router = express.Router(); //-> modular, mountable route handlers

router.post('/signup',
    body('username')
        .exists().withMessage('Username is required')
        .isLength({ min: 8}).withMessage('Username must be at least 8 characters')
        .custom(async value => {
            const user = await User.findOne({username: value});
            if (user) return Promise.reject('Username already in use');
        }),
    body('password')
        .exists().withMessage('Password is required')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters'),
    requestHandler.validate,
    authentication.signUp
)

router.post('/signin', authentication.signIn);
router.get('/info', auth.authenticate, authentication.getInfo);

router.get('/favorites', auth.authenticate, favoriteController.getAllFavorites);
router.post('/favorites', auth.authenticate, favoriteController.addFavorite);
router.delete('/favorites/:favoriteId',
        auth.authenticate,
        favoriteController.removeFavorite);


export default router;