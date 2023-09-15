import axios from 'axios';
import queryString from 'query-string';
const baseURL = "http://127.0.0.1:8000/api/";

//custom settings for axios instance (headers for different requests, encode params)
const privateClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params) //escape params
    }
});

privateClient.interceptors.request.use(async config => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('actkn')}`
        }
    };
});

privateClient.interceptors.response.use((response) => {
    if (response && response.data) return response.data;
    return response;
}, (err) => {
    throw err.response.data;
})

export default privateClient;
