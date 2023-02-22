import { useMutation } from "@tanstack/react-query";
import serverApi from "@api/server";

const useSendInviteToChat = () => {
  return useMutation(serverApi.sendInviteToChat, {
    onMutate: () => {
      console.log("mutate");
    },
    onSuccess: () => {
      console.log("onsuccess");
    },
    onError: () => {
      console.log("onError");
    },
  });
};

export default useSendInviteToChat;
