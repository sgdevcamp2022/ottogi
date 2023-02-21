import clientApi from "./axios";

const serverApi = {
  sendInvite: async ({ communityId, userId, shortUrl }: any) => {
    return await clientApi.post(
      `/invite/member`,
      { communityId, userId, shortUrl }
      // {
    );
  },

  sendInviteToChat: async ({ sender, channelId, linkMessage }: any) => {
    return await clientApi.post(`/chat/invite`, {
      sender,
      channelId,
      linkMessage,
    });
  },

  // 커뮤니티 리스트 가져옴
  getList: async ({ queryKey }: any) => {
    const { userId } = queryKey[1];
    return await clientApi.get(`/community/getlist/`, {
      params: { userId },
    });
  },
  // 커뮤니티의 채널리스트 가져옴
  getChannel: async ({ queryKey }: any) => {
    const { communityId } = queryKey[1];
    return await clientApi.get(`/community/getoption/`, {
      params: { communityId },
    });
  },
  // 커뮤니티 생성
  create: async ({ formData }: any) => {
    return await clientApi.post("/community/create", formData);
  },
  // 커뮤니티 이름 변경
  update: async ({ communityName, communityId, userId }: any) => {
    return await clientApi.patch("/community/update", {
      communityName,
      communityId,
      userId,
    });
  },
  // 커뮤니티 삭제
  delete: async (communityId: string) => {
    return await clientApi.delete("/community/delete", {
      params: { communityId },
    });
  },
};
export default serverApi;
