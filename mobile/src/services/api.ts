import axios from 'axios';

const api = axios.create({
    baseURL: 'http://36e13b3c766b.ngrok.io'
    }
);

export default api;