import privateClient from "../client/privateClient";

const favoriteRequests = {
    getList: async() => {
        try {
            const response = await privateClient.get('user/favorites');
            return { response }
        } catch (err) { return { err };}
    },
    add: async({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate}) => {
        try {
            const response = await privateClient.post(
                'user/favorites',
                {
                    mediaId, mediaType, mediaTitle, mediaPoster, mediaRate
                }    
            );
            return { response }
        } catch (err) { return { err };}
    },
    remove: async({ favoriteId }) => {
        try {
            const response = await privateClient.delete(`user/favorites/${favoriteId}`);
            return { response }
        } catch (err) { return { err };}
    }
}

export default favoriteRequests;