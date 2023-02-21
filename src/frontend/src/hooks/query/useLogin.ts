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
      const setTokens = async () => {
        cookies.set(COOKIE_KEY, refreshToken);
        localStorage.setItem("accessToken", accessToken);
      };

      const getUserInfo = async () => {
        const data = await authApi.getUserInfo({ accessToken });
        setUserInfo(data.data.data);
      };

      await setTokens();
      await getUserInfo();
      navigate("/@me");
    },
  });
};

export default useLogin;
