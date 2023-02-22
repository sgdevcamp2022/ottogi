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
};

export default chatApi;
