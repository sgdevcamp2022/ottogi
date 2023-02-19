import { useQuery } from "@tanstack/react-query";
import friendApi from "@api/friend";

interface useGetFriendListProps {
  email: string;
  accessToken: AccessTokenType;
}

const useGetFriendList = ({ email, accessToken }: useGetFriendListProps) => {
  return useQuery(["friendList", { email, accessToken }], friendApi.getAll);
};

export default useGetFriendList;
