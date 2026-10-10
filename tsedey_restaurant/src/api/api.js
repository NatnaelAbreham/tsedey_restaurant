/* import axios from "axios";

const api = axios.create({
    baseURL: "http://10.13.10.21:8687",
    withCredentials: true,
});

export default api; 

for IIs deployemnt

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});
  
for localdevelopment
const api = axios.create({
    baseURL: "https://localhost:5238/api",
    withCredentials: true,
});  
*/
import axios from "axios";


const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export default api;