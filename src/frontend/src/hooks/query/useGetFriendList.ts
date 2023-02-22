import { useQuery } from "@tanstack/react-query";
import friendApi from "@api/friend";

const useGetFriendList = (email: string, options: any = {}) => {
  const { data, isSuccess } = useQuery(
    ["friendList", { email }],
    friendApi.getAll,
    options
  );

  return { data: data?.data.data, isSuccess };
};

export default useGetFriendList;
