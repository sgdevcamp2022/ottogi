import clientApi from "./axios";

// interface HeaderToken {
//   accessToken: string;
// }

const userSettingApi = {
  // 사용자명 변경
  modifyName: async ({ name, password }: any) => {
    return await clientApi.patch("/user/member/modify/name", {
      name,
      password,
    });
  },
  // 비밀번호 변경
  modifyPassword: async ({ password, originPassword }: any) => {
    return await clientApi.patch("/user/member/modify/password", {
      password,
      originPassword,
    });
  },
  // 계정 삭제하기
  deleteUser: async () => {
    return await clientApi.delete("user/member/userdelete");
  },
  // 유저 이미지 변경
  modifyImage: async () => {
    return await clientApi.patch("user/member/userdelete");
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