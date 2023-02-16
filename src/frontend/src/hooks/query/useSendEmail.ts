import { useMutation } from "@tanstack/react-query";
import authApi from "@api/auth";

const useSendEmail = () => {
  return useMutation(authApi.register);
};

export default useSendEmail;
