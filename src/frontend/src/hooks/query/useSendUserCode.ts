import { useRegisterStore } from "@store/useRegisterStore";
import { useMutation } from "@tanstack/react-query";
import authApi from "@api/auth";

const useSendUserCode = () => {
  const { setStep } = useRegisterStore();

  return useMutation(authApi.verify, {
    onSuccess: () => {
      setStep(3);
    },
  });
};

export default useSendUserCode;
