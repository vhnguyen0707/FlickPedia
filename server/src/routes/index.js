import express from 'express';
import personRouter from './personRouter.js';
import reviewRouter from './reviewRouter.js';
import userRouter from './userRouter.js';
import mediaRouter from './mediaRouter.js';


const router = express.Router();

//defining routes for the router obj - mini application capable of performing
//middleware & routing functions
router.use('/user', userRouter);
router.use('/person', personRouter);
router.use('/reviews', reviewRouter);
router.use('/:mediaType', mediaRouter);

export default router;