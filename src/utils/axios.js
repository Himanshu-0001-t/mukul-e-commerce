import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://gadgetstore-34q8n2kx.b4a.run/api',
});

export default axiosInstance;
