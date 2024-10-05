import { BASE_URL } from "../constants";
import { getLocalStorage } from "../utils/index";
import axios from "axios";

const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use((config) => {
  const currentUser = getLocalStorage("user");

  config.headers = {
    ...config.headers,
    Authorization: currentUser ? `Bearer ${currentUser.token}` : "accessToken",
  };

  return config;
});

export default fetcher;
