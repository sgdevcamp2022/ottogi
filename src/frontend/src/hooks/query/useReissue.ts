import { useUserStore } from "./../../store/useUserStore";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/auth";
import { COOKIE_KEY } from "../../configs/cookie";

const useReissue = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);
  const { setAccessToken } = useUserStore();

  return useMutation(authApi.reissue, {
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data;

      setCookies(COOKIE_KEY, refreshToken);
      setAccessToken(accessToken);
    },
  });
};

export default useReissue;
