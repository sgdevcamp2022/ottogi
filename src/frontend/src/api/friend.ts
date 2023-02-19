import clientApi from "./axios";

interface FriendParams {
  email: string;
}

const accessToken = sessionStorage.getItem("accessToken");

const friendApi = {
  getAll: async ({ queryKey }: any) => {
    const { email } = queryKey[1];
    return await clientApi.get(`/user/member/showfriend`, {
      params: { email },
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  request: async ({ email }: FriendParams) => {
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

  accept: async ({ email }: FriendParams) => {
    return await clientApi.post(
      "/user/member/acceptfriend",
      { email },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  reject: async ({ email }: FriendParams) => {
    return await clientApi.delete("/user/member/rejectfriend", {
      data: { email },
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  cancel: async ({ email }: FriendParams) => {
    return await clientApi.post(
      "/user/member/cancelfriend",
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
