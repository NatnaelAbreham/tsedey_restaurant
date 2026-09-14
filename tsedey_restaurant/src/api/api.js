/* import axios from "axios";

const api = axios.create({
    baseURL: "http://10.13.10.21:8687",
    withCredentials: true,
});

export default api; */
import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export default api;