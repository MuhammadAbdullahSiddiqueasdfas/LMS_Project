import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    validateStatus: (status) => status >= 200 && status < 500,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
