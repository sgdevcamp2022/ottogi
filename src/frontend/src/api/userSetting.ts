import clientApi from "./axios";

const userSettingApi = {
  // 사용자명 변경
  modifyName: async ({ name, password }: any) => {
    return await clientApi.patch("/user/member/modify/name", {
      name,
      originalPassword: password,
    });
  },

  // 비밀번호 변경
  modifyPassword: async ({ password, originalPassword }: any) => {
    return await clientApi.patch("/user/member/modify/password", {
      password,
      originalPassword,
    });
  },

  // 계정 삭제하기
  deleteUser: async () => {
    return await clientApi.delete("/user/member/userdelete");
  },

  // 유저 이미지 변경
  modifyImage: async ({ formData }: any) => {
    return await clientApi.patch("/user/member/modify/image", formData);
  },

  // 유저 자기 소개 변경

  modifyIntro: async ({ introduction }: any) => {
    return await clientApi.patch("/user/member/modify/introduction", {
      introduction,
    });
  },

  // 서버 프로필명 이름 변경
  communityUpdate: async ({
    communityId,
    userId,
    userName,
    img,
    introduction,
  }: any) => {
    return await clientApi.patch("/community/profile", {
      communityId,
      userId,
      profile: {
        userName,
        img,
        introduction,
      },
    });
  },
};

export default userSettingApi;
