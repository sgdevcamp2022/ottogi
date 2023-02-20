import { COOKIE_KEY } from "@configs/cookie";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@store/useUserStore";
import authApi from "@api/auth";
import { cookies } from "src/App";

const useLogin = () => {
  const { setUserInfo } = useUserStore();
  const navigate = useNavigate();

  return useMutation(authApi.login, {
    onSuccess: async ({
      data: {
        data: { accessToken, refreshToken },
      },
    }: any) => {
      console.log(0);
      const setTokens = async () => {
        console.log(1);
        cookies.set(COOKIE_KEY, refreshToken);
        sessionStorage.setItem("accessToken", accessToken);
      };

      const getUserInfo = async () => {
        const data = await authApi.getUserInfo();
        console.log(111, data);
        setUserInfo(data.data);
      };

      await setTokens();
      getUserInfo();
      console.log(1);
      // navigate("/@me");
    },
  });
};

export default useLogin;
