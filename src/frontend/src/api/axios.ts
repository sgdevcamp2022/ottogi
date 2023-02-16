import axios from "axios";
import { useUserStore } from "@store/useUserStore";

const baseURL = process.env.REACT_APP_BASE_URL;

const clientApi = axios.create({
  baseURL,
});

clientApi.interceptors.request.use(
  (config) => {
    const { userInfo } = useUserStore();
    config.headers["Authorization"] = "Bearer " + userInfo.accessToken;
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default clientApi;
