import { COOKIE_KEY } from "@configs/cookie";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@store/useUserStore";
import authApi from "@api/auth";

const useLogin = () => {
  const [cookies, setCookie] = useCookies([COOKIE_KEY]);
  const { setUserInfo } = useUserStore();
  const navigate = useNavigate();

  return useMutation(authApi.login, {
    onSuccess: ({
      data: {
        data: { accessToken, refreshToken },
      },
    }: any) => {
      const setTokens = () => {
        setCookie(COOKIE_KEY, refreshToken);
        sessionStorage.setItem("accessToken", accessToken);
      };

      const getUserInfo = async () => {
        const { data } = await authApi.getUserInfo();
        setUserInfo(data.data);
      };

      setTokens();
      getUserInfo();
      navigate("/@me");
    },
  });
};

export default useLogin;
