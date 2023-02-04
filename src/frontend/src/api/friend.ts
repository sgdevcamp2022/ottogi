import clientApi from "./axios";

interface HeaderToken {
  accessToken: string;
}

interface FriendParams extends HeaderToken {
  email: string;
}

const friendApi = {
  getAll: async ({ queryKey }: any) => {
    const { email, accessToken } = queryKey[1];
    return await clientApi.get(`/user/member/showfriend`, {
      params: { email },
      headers: {
        hi: "hi",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  request: async ({ email, accessToken }: FriendParams) => {
    console.log("post", email, accessToken);
    return await clientApi.post(
      "/user/member/addfriend",
      { email },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
};

export default friendApi;
