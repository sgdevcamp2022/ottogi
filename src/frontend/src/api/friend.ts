import clientApi from "./axios";

interface FriendParams {
  email: string;
}

const friendApi = {
  getAll: async ({ queryKey }: any) => {
    const { email } = queryKey[1];
    return await clientApi.get(`/user/member/showfriend`, {
      params: { email },
    });
  },

  request: async ({ email }: FriendParams) => {
    return await clientApi.post("/user/member/addfriend", { email });
  },

  accept: async ({ email }: FriendParams) => {
    return await clientApi.post("/user/member/acceptfriend", { email });
  },

  reject: async ({ email }: FriendParams) => {
    return await clientApi.delete("/user/member/rejectfriend", {
      params: { email },
    });
  },

  cancel: async ({ email }: FriendParams) => {
    return await clientApi.post("/user/member/cancelfriend", { email });
  },
};

export default friendApi;
