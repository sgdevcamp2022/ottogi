import authApi from "@api/auth";
import { COOKIE_KEY } from "@configs/cookie";
import axios from "axios";
import { cookies } from "src/App";

const baseURL = process.env.REACT_APP_BASE_URL;

const clientApi = axios.create({
  baseURL,
});

clientApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.log("axios error", err);
    const originalRequest = err.config;
    console.log("originalRequest");

    const errMessage = err.response.data.message as string;
    console.log("message", errMessage);
    if (errMessage) {
      const data: any = await authApi.reissue;
      console.log("tokens", data);

      // 토큰 처리
      const { accessToken, refreshToken } = data;

      cookies.set(COOKIE_KEY, refreshToken);
      sessionStorage.setItem("accessToken", accessToken);

      return clientApi(originalRequest);
    }
    return Promise.reject(err);
  }
);

export default clientApi;
