import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://e-comm-backend-opal.vercel.app/api',
});

export default axiosInstance;
