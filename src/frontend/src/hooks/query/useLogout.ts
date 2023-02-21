import { useMutation } from "@tanstack/react-query";
import authApi from "@api/auth";

const useLogout = () => {
  return useMutation(authApi.logout);
};

export default useLogout;
