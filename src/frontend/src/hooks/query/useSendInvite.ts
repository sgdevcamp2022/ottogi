import { useMutation } from "@tanstack/react-query";
import serverApi from "@api/server";

const useSendInvite = () => {
  return useMutation(serverApi.sendInvite, {
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

export default useSendInvite;
