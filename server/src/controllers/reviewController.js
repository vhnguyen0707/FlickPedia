import responseHandler from "../handlers/responseHandler.js"; 
import Review from '../models/Review.js';

const addReview = async(req, res) => {
    try {
        const { movieId } = req.params;
        const review = await Review.create({
            user:  req.user.id,
            movieId,
            ...req.body
        })
        return responseHandler.created(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        });
    } catch (e){
        responseHandler.error(res);
    }
}

const removeReview = async(req, res) => {
    try  {
        const { reviewId } = req.params;
        const review = await Review.findOne({
            user: req.user.id,
            _id: reviewId
        })
    
        if (!review) return responseHandler.notFound(res);
        await review.remove();
        return responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
}

const getAllReviews = async(req, res) => {
    try {
        const reviews = await Review.find({
            user: req.user.id
        }).sort("-createdAt");
        responseHandler.ok(res, reviews);
    } catch {
        responseHandler.error(res);
    }

}

export default { addReview, removeReview, getAllReviews };