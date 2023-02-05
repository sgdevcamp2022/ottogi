import { useMutation } from "@tanstack/react-query";
import friendApi from "../../api/friend";

const useCancelFriend = () => {
  return useMutation(friendApi.cancel);
};

export default useCancelFriend;
