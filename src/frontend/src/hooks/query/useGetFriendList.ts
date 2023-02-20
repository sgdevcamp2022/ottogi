import { useQuery } from "@tanstack/react-query";
import friendApi from "@api/friend";

const useGetFriendList = (email: string) => {
  return useQuery(["friendList", { email }], friendApi.getAll);
};

export default useGetFriendList;
