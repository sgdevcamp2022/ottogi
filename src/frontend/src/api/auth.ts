import axios from "axios";
import clientApi from "./axios";

interface ReissueParams {
  refreshToken: string;
}
interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams extends LoginParams {
  name: string;
}

const baseURL = process.env.REACT_APP_BASE_URL;
const accessToken = sessionStorage.getItem("accessToken");

const authApi = {
  login: async ({ email, password }: LoginParams) => {
    return await axios.post(`${baseURL}/user/auth/login`, { email, password });
  },

  register: async ({ email, name, password }: RegisterParams) => {
    return await axios.post(`${baseURL}/user/auth/register`, {
      email,
      name,
      password,
    });
  },

  logout: async () => {
    return clientApi.get(
      "/user/member/logout"
      // {
      //   headers: { Authorization: "Bearer " + accessToken },
      // }
    );
  },

  getUserInfo: async () => {
    return await clientApi.get(
      "/user/member/info"
      // {
      //   headers: { Authorization: "Bearer " + accessToken },
      // }
    );
  },

  verify: async (userCode: string) => {
    return await axios.post(`${baseURL}/user/auth/email`, { userCode });
  },

  reissue: async ({ refreshToken }: ReissueParams) => {
    return await clientApi.post("/user/auth/reissue", {
      accessToken,
      refreshToken,
    });
  },
};

export default authApi;
