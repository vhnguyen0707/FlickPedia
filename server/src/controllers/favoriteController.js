import responseHandler from "../handlers/responseHandler.js";
import Favorite from "../models/Favorite.js";


//only saved to database, not actually post to tmdb server
const addFavorite = async (req, res) => {
    try {
        const isFavorite = await Favorite.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        });
        
        if (isFavorite) return responseHandler.ok(res, isFavorite);
        const favorite = await Favorite.create({
            ...req.body,
            user: req.user.id
        });
        return responseHandler.created(res, favorite);
    } catch {
        responseHandler.error(res);
    }
}

const removeFavorite = async(req, res) => {
    try {
        const { favoriteId } = req.params;
        const favorite = await Favorite.findOne({
            user: req.user.id,
            _id: favoriteId
        });

        if (!favorite) return responseHandler.notFound(res);

        await favorite.remove();
        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
}

const getAllFavorites = async(req, res) => {
    try {
        const favorite = await Favorite.find({ user: req.user.id}).sort("-createdAt");

        responseHandler.ok(res,favorite);
    } catch {
        responseHandler.error(res);
    }
}

export default { addFavorite, removeFavorite, getAllFavorites }