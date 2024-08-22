import axios from 'axios';

// Set up Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
