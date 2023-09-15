import privateClient from "../client/privateClient";
import publicClient from "../client/publicClient";

const userRequests = {
    signin: async({ username, password }) => {
        try{
            const response = await publicClient.post(
                'user/signin',
                {username, password}
            );
            return { response }
        } catch (err) { 
            return { err };
        }
    },
    signup: async({username, password, confirmPassword, displayName}) => {
        try {
            const response = await publicClient.post(
                'user/signup',
                { username, password, confirmPassword, displayName }
            );
            return { response }
        } catch (err) { return { err }}
    },
    getInfo: async() => {
        try {
            const response = await privateClient.get('user/info');
            return { response };
        } catch (err) { return { err }}
    }
}

export default userRequests;