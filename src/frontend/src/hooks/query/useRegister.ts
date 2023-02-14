import { useMutation } from "@tanstack/react-query";
import authApi from "src/api/auth";

const useRegister = () => {
  return useMutation(authApi.register);
};

export default useRegister;
