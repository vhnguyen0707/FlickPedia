import express from 'express';
import reviewController from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authentication.js';

const router = express.Router({ mergeParams: true});

router.get('/', 
    authMiddleware.authenticate,
    reviewController.getAllReviews
)

router.post('/', 
    authMiddleware.authenticate,
    reviewController.addReview)
router.delete('/:reviewId',
    authMiddleware.authenticate,
    reviewController.removeReview
)

export default router;