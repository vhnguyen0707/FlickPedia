import publicClient from "../client/publicClient";

const personRequests = {
    getDetail: async({ personId }) => {
        try {
            const response = await publicClient.get(`person/${personId}`);
            return { response }
        } catch(err) { return { err }}
    },
    getMedias: async({ personId}) => {
        try {
            const response = await publicClient.get(`person/${personId}/medias`);
            return { response };
        } catch (err) { return { err }};
    }
}

export default personRequests;