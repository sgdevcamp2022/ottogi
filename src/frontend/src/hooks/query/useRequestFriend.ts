import { useMutation } from "@tanstack/react-query";
import friendApi from "@api/friend";

//todo: options 타입 지정
const useRequestFriend = (options?: any) => {
  return useMutation(friendApi.request, options);
};

export default useRequestFriend;
