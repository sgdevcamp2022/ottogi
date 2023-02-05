import { useCookies } from "react-cookie";
import { useUserStore } from "./../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/auth";
import { COOKIE_KEY } from "../../configs/cookie";

const useLogin = (email: string) => {
  const [cookies, setCookie] = useCookies([COOKIE_KEY]);
  const { setUserInfo } = useUserStore();
  const navigate = useNavigate();

  return useMutation(authApi.login, {
    onSuccess: ({
      data: {
        data: { accessToken, refreshToken },
      },
    }: any) => {
      setCookie(COOKIE_KEY, refreshToken);
      setUserInfo({ email, accessToken });
      navigate("/@me");
    },
  });
};

export default useLogin;
