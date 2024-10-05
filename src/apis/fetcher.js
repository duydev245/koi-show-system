import { BASE_URL } from "../constants";
import { getLocalStorage, removeLocalStorage } from "../utils/index";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// check token expiration
const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);

    if (!decodedToken || !decodedToken.exp) {
      return false;
    }

    const currentTime = (Math.floor(Date.now() / 1000)) - 5;

    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Invalid Token:", error);
    return false;
  }
};

const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use((config) => {
  const token = getLocalStorage("token");

  if (token && isTokenValid(token)) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  } else {
    console.log('Expired Token:');
    removeLocalStorage("user");
    removeLocalStorage("token");
    window.location.href = '/auth/login';
  }

  return config;
});

export default fetcher;
