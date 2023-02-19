import { useQuery } from "@tanstack/react-query";
import friendApi from "@api/friend";

interface useGetFriendStatusProps {
  userId: number;
}

const useGetFriendStatus = ({ userId }: useGetFriendStatusProps) => {
  return useQuery(["friendStatus", { userId }], friendApi.isOnline);
};

export default useGetFriendStatus;
