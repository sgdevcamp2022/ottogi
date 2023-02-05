import { useMutation } from "@tanstack/react-query";
import friendApi from "../../api/friend";

const useRejectFriend = () => {
  return useMutation(friendApi.reject);
};

export default useRejectFriend;
