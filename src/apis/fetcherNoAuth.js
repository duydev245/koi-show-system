import { BASE_URL } from "../constants";
import { getLocalStorage } from "../utils/index";
import axios from "axios";

const fetcherNoAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// fetcherNoAuth.interceptors.request.use((config) => {
//     const token = getLocalStorage("token");

//     config.headers = {
//         ...config.headers,
//         Authorization: token ? "Bearer ${token}" : "Bearer accessToken",
//     };

//     return config;
// });

export default fetcherNoAuth;
