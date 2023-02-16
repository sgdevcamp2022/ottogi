import clientApi from "./axios";

interface HeaderToken {
  accessToken: string;
}

const serverSettingApi = {
  // 커뮤니티 생성
  create: async ({ communityName, img, userId }: any) => {
    return await clientApi.post("/community/create", {
      communityName,
      img,
      userId,
    });
  },
  // 커뮤니티 이름 변경
  update: async ({ communityName, img, userId }: any) => {
    return await clientApi.patch("/community/update", {
      communityName,
      img,
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
export default serverSettingApi;
