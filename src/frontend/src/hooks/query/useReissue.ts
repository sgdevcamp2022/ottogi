import { COOKIE_KEY } from "@configs/cookie";
import { useMutation } from "@tanstack/react-query";
import authApi from "@api/auth";
import { cookies } from "src/App";

const useReissue = () => {
  return useMutation(authApi.reissue, {
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data;

      cookies.set(COOKIE_KEY, refreshToken);
      localStorage.setItem("accessToken", accessToken);
    },
  });
};

export default useReissue;
