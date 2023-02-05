import { useMutation } from "@tanstack/react-query";
import friendApi from "../../api/friend";

const useAcceptFriend = () => {
  return useMutation(friendApi.accept);
};

export default useAcceptFriend;
