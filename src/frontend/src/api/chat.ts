import clientApi from "./axios";

const chatApi = {
  getChatFriends: async ({ queryKey }: any) => {
    const { userId } = queryKey[1];

    return await clientApi.get("/state/getchannel", {
      params: {
        userId,
      },
    });
  },

  enter: async () => {
    return await clientApi.post("/chat/community_enter", {
      name: "종인",
      channelId: "220",
    });
  },
};

export default chatApi;
