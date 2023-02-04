import clientApi from "./axios";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams extends LoginParams {
  name: string;
}

const authApi = {
  login: async ({ email, password }: LoginParams) => {
    return await clientApi.post("/user/auth/login", { email, password });
  },
  register: async ({ email, name, password }: RegisterParams) => {
    return await clientApi.post("/user/auth/register", { email, name, password });
  },
  verify: async (userCode: string) => {
    return await clientApi.post("/user/auth/email", { userCode });
  },
};

export default authApi;
