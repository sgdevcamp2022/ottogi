import axios from "axios";
import clientApi from "./axios";

interface GetUserInfoProps {
  accessToken: string;
}
interface ReissueProps {
  refreshToken: string;
}
interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps extends LoginProps {
  name: string;
}

const baseURL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

const authApi = {
  login: async ({ email, password }: LoginProps) => {
    return await axios.post(`${baseURL}/user/auth/login`, { email, password });
  },

  register: async ({ email, name, password }: RegisterProps) => {
    return await axios.post(`${baseURL}/user/auth/register`, {
      email,
      name,
      password,
    });
  },

  logout: async () => {
    return await clientApi.post("/user/member/logout");
  },

  getUserInfo: async ({ accessToken }: GetUserInfoProps) => {
    return await axios.get(`${baseURL}/user/member/info`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
  },

  verify: async (userCode: string) => {
    return await axios.post(`${baseURL}/user/auth/email`, { userCode });
  },

  reissue: async ({ refreshToken }: ReissueProps) => {
    return await clientApi.post("/user/auth/reissue", {
      accessToken,
      refreshToken,
    });
  },
};

export default authApi;
