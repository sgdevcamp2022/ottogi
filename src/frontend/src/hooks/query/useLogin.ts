import { useUserStore } from "./../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/auth";

const useLogin = (email: string) => {
  const { setUserInfo } = useUserStore();
  const navigate = useNavigate();

  return useMutation(authApi.login, {
    onSuccess: ({
      data: {
        data: { accessToken, refreshToken },
      },
    }: any) => {
      console.log(accessToken);
      setUserInfo({ email, accessToken, refreshToken });
      navigate("/");
    },
  });
};

export default useLogin;
