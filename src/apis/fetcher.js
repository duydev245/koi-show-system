import { getLocalStorage } from "../utils/index";
import axios from "axios";
import { BASE_URL } from "../constants/urlConfig";

const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use((config) => {
  // const token = getLocalStorage("token");

  config.headers = {
    ...config.headers,
    token: "accessToken",
  };

  return config;
});

export default fetcher;
