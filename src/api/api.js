import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5001/api"


const instance = axios.create(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json'
        }

    }
)


instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Request with token:", {
            url: config.url,
            method: config.method,
            tokenLength: token.length,
            tokenStart: token.substring(0, 20),
            headers: config.headers
        });
    } else {
        delete config.headers.Authorization;
        console.log("Request without token:", {
            url: config.url,
            method: config.method
        });
    }
    return config;
});
export default instance;