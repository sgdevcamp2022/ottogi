import { useMutation, useQueryClient } from "@tanstack/react-query";
import friendApi from "src/api/friend";

const useRejectFriend = () => {
  const queryClient = useQueryClient();

  return useMutation(friendApi.reject, {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["friendList"] });
    },
  });
};

export default useRejectFriend;
