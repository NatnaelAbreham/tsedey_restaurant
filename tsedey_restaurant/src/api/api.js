import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:5238",
    withCredentials: true,
});

export default api;