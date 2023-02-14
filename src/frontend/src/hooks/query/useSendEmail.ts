import { useMutation } from "@tanstack/react-query";
import authApi from "src/api/auth";

const useSendEmail = () => {
  return useMutation(authApi.register);
};

export default useSendEmail;
