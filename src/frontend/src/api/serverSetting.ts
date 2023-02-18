import clientApi from "./axios";

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
  create: async ({
    // communityName,
    // img,
    // userId,
    accessToken,
    formData,
  }: // profile,
  any) => {
    // console.log(communityName, img, userId, accessToken, profile);
    // formData.append("communityName", communityName);
    // console.log(formData);
    // formData.append("img", img);
    // formData.append("userId", userId);
    // formData.append("profile", profile);
    for (let key of formData.keys()) {
      console.log(key);
      console.log(formData[key]);
    }
    for (let value of formData.values()) {
      console.log(value);
    }
    return await clientApi.post("/community/create", formData, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
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