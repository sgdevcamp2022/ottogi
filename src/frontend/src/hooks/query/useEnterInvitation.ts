import chatApi from "@api/chat";
import { useMutation } from "@tanstack/react-query";

const useEnterInvitation = () => {
  return useMutation(chatApi.enter);
};

export default useEnterInvitation;
