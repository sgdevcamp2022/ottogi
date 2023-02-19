import { COOKIE_KEY } from "@configs/cookie";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import authApi from "@api/auth";

const useReissue = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);

  return useMutation(authApi.reissue, {
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data;

      setCookies(COOKIE_KEY, refreshToken);
      sessionStorage.setItem("accessToken", accessToken);
    },
  });
};

export default useReissue;
