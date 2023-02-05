import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import friendApi from "../../api/friend";

const useRequestFriend = (options?: UseMutationOptions) => {
  return useMutation(friendApi.request, options);
};

export default useRequestFriend;
