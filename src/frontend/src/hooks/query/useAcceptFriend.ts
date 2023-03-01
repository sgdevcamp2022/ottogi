import { useMutation, useQueryClient } from "@tanstack/react-query";
import friendApi from "@api/friend";

const useAcceptFriend = () => {
  const queryClient = useQueryClient();

  return useMutation(friendApi.accept, {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["friendList"] });
    },
  });
};

export default useAcceptFriend;
