import responseHandler from "../handlers/responseHandler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import User from "../models/User.js";
import Favorite from "../models/Favorite.js";
import Review from "../models/Review.js";
import authentication from "../middlewares/authentication.js";
const getList = async (req, res) => {
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory } = req.params;

        const data = await tmdbApi.mediaList({mediaType, mediaCategory, page});
        return responseHandler.ok(res, data);
    } catch {
        responseHandler.error(res);
    }
}

const getDetail = async(req, res) => {
    try {
        const { mediaType, mediaId } = req.params;
        const media = await tmdbApi.mediaDetail({ mediaType, mediaId});
        media.credits = await tmdbApi.mediaCredits({ mediaType, mediaId });
        media.videos = await tmdbApi.mediaVideos({mediaType, mediaId});
        const recommends = await tmdbApi.mediaRecommend({mediaType, mediaId});
        media.recommend = recommends.results;
        media.images = await tmdbApi.mediaImages({mediaType, mediaId});

        const tokenDecoded = authentication.tokenDecode(req);

        if (tokenDecoded) {
            const user = await User.findById(tokenDecoded.id);

            if (user) {
                const isFavorite = await Favorite.findOne({user: user.id, mediaId});
                media.isFavorite = isFavorite !== null;
            }
        }
        media.reviews = await Review.find({ mediaId }).populate("user").sort("createdAt");
        return responseHandler.ok(res, media);
    } catch (e) {
        responseHandler.error(res);
    }
}

const getGenres = async(req, res) => {
    try {
        const { mediaType } = req.params;
        const data = await tmdbApi.mediaGenres({ mediaType });
        return responseHandler.ok(res, data);
    } catch {
        responseHandler.error(res);
    }
}

const search = async(req, res) => {
    try {
        const {mediaType} = req.params;
        const { query, page } = req.query;

        const data = await tmdbApi.mediaSearch({ 
            mediaType: mediaType === 'people' ? 'person' : mediaType,
            query, 
            page 
        });
        return responseHandler.ok(res, data);
    } catch {
        responseHandler.error(res);
    }
}

export default {
    getList,
    getDetail,
    getGenres,
    search
}