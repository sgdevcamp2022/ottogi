import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

const clientApi = axios.create({
  baseURL,
});

clientApi.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + accessToken;
  return config;
});

// clientApi.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const errMessage = err.response.data.errorCode;
//     console.log("message: ", errMessage);

//     if (errMessage !== "AUTH012") return Promise.reject(err);

//     // const originalRequest = err.config;
//     // console.log("originalRequest: ", originalRequest);

//     const { data } = await authApi.reissue({
//       refreshToken: cookies.get(COOKIE_KEY),
//     });

//     const { accessToken, refreshToken } = data.data;
//     console.log(accessToken, refreshToken);

//     cookies.set(COOKIE_KEY, refreshToken);
//     localStorage.setItem("accessToken", accessToken);

//     // return clientApi(originalRequest);
//     return Promise.resolve();
//   }
// );

export default clientApi;
