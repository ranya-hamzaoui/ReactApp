import axios from "axios";
import { BASE_URL } from "../config/.env";
import { store } from "../redux/store";

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

AxiosInstance.interceptors.request.use(
  function (config) {
    let token = store.getState().auth.tokens.token
    config.headers.Authorization = `Authorization ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);