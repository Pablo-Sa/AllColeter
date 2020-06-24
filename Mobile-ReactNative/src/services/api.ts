import axios from 'axios';

const api = axios.create({
    baseURL: 'http://018b40ed011f.ngrok.io'
    }
);

export default api;