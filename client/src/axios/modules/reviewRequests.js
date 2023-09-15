import privateClient from "../client/privateClient";

const reviewRequests = {
    add: async({mediaId, mediaType, mediaTitle, mediaPoster, content}) => {
        try {
            const response = await privateClient.post(
                'reviews',
                {mediaId, mediaType, mediaTitle, mediaPoster, content}
            );
            return {  response };
        } catch (err) { return { err };}
    },
    remove: async({ reviewId }) => {
        try {
            const response = await privateClient.delete(`reviews/${reviewId}`);
            return { response };
        } catch (err) {  return { err };}
    },
    getList: async() => {
        try {
            const response = await privateClient.get('reviews');
            return { response }
        } catch (err) { return { err };}
    }
}

export default reviewRequests;