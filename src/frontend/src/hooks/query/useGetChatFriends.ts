import { useQuery } from "@tanstack/react-query";
import chatApi from "@api/chat";

const useGetChatFriends = (userId: number) => {
  const { data, isSuccess } = useQuery(
    ["chatFriends", { userId }],
    chatApi.getChatFriends,
    {
      staleTime: 1000,
      // cacheTime: Infinity,
    }
  );

  return { data: data?.data.data, isSuccess };
};

export default useGetChatFriends;
