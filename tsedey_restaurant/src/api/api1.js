import axios from "axios";

const api = axios.create({
    baseURL: "http://10.13.10.21:8086",
    withCredentials: true,
});

export default api;