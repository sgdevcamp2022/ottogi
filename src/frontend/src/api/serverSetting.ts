import clientApi from "./axios";

let formData = new FormData();

const serverSettingApi = {
  // 커뮤니티 리스트 가져옴
  getList: async ({ queryKey }: any) => {
    const { userId, accessToken } = queryKey[1];
    return await clientApi.get(`/community/getlist/`, {
      params: { userId },
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 커뮤니티 생성
  create: async ({ communityName, img, userId, accessToken, profile }: any) => {
    console.log(communityName, img, userId, accessToken, profile);
    formData.append("communityName", communityName);
    formData.append("communit", communityName);
    formData.append("communityName", communityName);
    formData.append("communityName", communityName);
    return await clientApi.post(
      "/community/create",
      {
        communityName,
        // img,
        userId: 4,
        profile,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
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
