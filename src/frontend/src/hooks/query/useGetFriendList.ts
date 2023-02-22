import { useQuery } from "@tanstack/react-query";
import friendApi from "@api/friend";

const useGetFriendList = (email: string) => {
  const { data, isSuccess } = useQuery(
    ["friendList", { email }],
    friendApi.getAll
  );

  return { data: data?.data.data, isSuccess };
};

export default useGetFriendList;
