import { useMutation, useQueryClient } from "@tanstack/react-query";
import friendApi from "src/api/friend";

const useCancelFriend = () => {
  const queryClient = useQueryClient();

  return useMutation(friendApi.cancel, {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["friendList"] });
    },
  });
};

export default useCancelFriend;
