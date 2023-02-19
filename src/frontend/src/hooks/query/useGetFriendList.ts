import { useQuery } from "@tanstack/react-query";
import friendApi from "@api/friend";

interface useGetFriendListProps {
  email: string;
}

const useGetFriendList = ({ email }: useGetFriendListProps) => {
  return useQuery(["friendList", { email }], friendApi.getAll);
};

export default useGetFriendList;
