import { useMutation } from "@tanstack/react-query";
import authApi from "@api/auth";

const useRegister = () => {
  return useMutation(authApi.register);
};

export default useRegister;
