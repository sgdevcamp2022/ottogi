import { useMutation } from "@tanstack/react-query";
import authApi from "@api/auth";

const useSendEmail = (options: any) => {
  return useMutation(authApi.register, options);
};

export default useSendEmail;
