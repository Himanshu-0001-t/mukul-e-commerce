import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://e-comm-backend-pkj2.onrender.com/api',
});

export default axiosInstance;
