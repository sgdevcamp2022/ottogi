import { useQuery } from "@tanstack/react-query";
import chatApi from "@api/chat";

const useGetChatFriends = (userId: number) => {
  const { data, isSuccess } = useQuery(
    ["chatFriends", { userId }],
    chatApi.getChatFriends
  );
  console.log("data", data);
  console.log("data2", data?.data.data);

  return { data: data?.data.data, isSuccess };
};

export default useGetChatFriends;
