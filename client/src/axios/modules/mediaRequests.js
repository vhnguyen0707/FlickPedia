import publicClient from "../client/publicClient"; 
import privateClient from "../client/privateClient";
const mediaRequests = {
    getGenres: async ({ mediaType }) => {
        try {
            const response = await publicClient.get(`${mediaType}/genres`);
            return { response };
        } catch (err) { return { err };}
    }, 
    getList: async ({ mediaType, mediaCategory, page }) => {
        try {
            const response = await publicClient.get(`${mediaType}/${mediaCategory}?page=${page}`);
            return { response };
        } catch (err) { return { err };}
    },
    getDetail: async ({ mediaType, mediaId }) => {
        try {
            const response = await privateClient.get(`${mediaType}/detail/${mediaId}`);
            return { response }
        } catch (err) { return { err };}
    }, 
    search: async({ mediaType, query, page }) => {
        try {
            const response = await publicClient.get(
                `${mediaType}/search?query=${query}&page=${page}`
            );
            return { response };
        } catch (err) { return { err };}
    }
}

export default mediaRequests;