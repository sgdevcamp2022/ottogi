import clientApi from "./axios";

const serverApi = {
  sendInvite: async ({ communityId, userId, shortUrl }: any) => {
    return await clientApi.post(`/invite/member`, {
      communityId,
      userId,
      shortUrl,
    });
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
    // 폼 객체 key 값을 순회.
    let keys = formData.keys();
    for (const pair of keys) {
      console.log(pair);
    }

    // 폼 객체 values 값을 순회.
    let values = formData.values();
    for (const pair of values) {
      console.log(pair);
    }
    return await clientApi.post("/community/create", formData);
  },
  // 커뮤니티 이미지 변경
  modifyImage: async ({ formData }: any) => {
    let keys = formData.keys();
    for (const pair of keys) {
      console.log(pair);
    }

    // 폼 객체 values 값을 순회.
    let values = formData.values();
    for (const pair of values) {
      console.log(pair);
    }
    return await clientApi.patch("/community/imgupload", formData);
  },
  // 커뮤니티 삭제
  delete: async ({ communityId, userId }: any) => {
    return await clientApi.patch("/community/delete", { communityId, userId });
  },
  // 커뮤니티 이름 변경
  update: async ({ communityName, communityId, userId }: any) => {
    return await clientApi.patch("/community/update", {
      communityName,
      communityId,
      userId,
    });
  },
};
export default serverApi;
