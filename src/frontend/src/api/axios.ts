import { COOKIE_KEY } from "@configs/cookie";
import axios from "axios";
import { cookies } from "src/App";
import authApi from "./auth";

const baseURL = process.env.REACT_APP_BASE_URL;
const accessToken = sessionStorage.getItem("accessToken");

const clientApi = axios.create({
  baseURL,
});

clientApi.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + accessToken;
  return config;
});

clientApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    const errMessage = err.response.data.errorCode;
    console.log("message: ", errMessage);

    if (errMessage !== "AUTH012") return Promise.reject(err);

    // const originalRequest = err.config;
    // console.log("originalRequest: ", originalRequest);

    const { data } = await authApi.reissue({
      refreshToken: cookies.get(COOKIE_KEY),
    });

    const { accessToken, refreshToken } = data.data;
    console.log(accessToken, refreshToken);

    cookies.set(COOKIE_KEY, refreshToken);
    sessionStorage.setItem("accessToken", accessToken);

    // return clientApi(originalRequest);
    return Promise.resolve();
  }
);

export default clientApi;
