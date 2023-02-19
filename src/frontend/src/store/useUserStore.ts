import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialUser = {
  accessToken: "",
  userInfo: {
    id: -1,
    email: "",
    name: "",
    introduction: "",
    profileImagePath: "",
    createdAt: "",
  },
};

interface UserState {
  accessToken: AccessTokenType;
  userInfo: UserInfoType;
}

interface UserAction {
  setUserInfo: (userInfo: UserInfoType) => void;
  setAccessToken: (accessToken: string) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState & UserAction>()(
  devtools(
    persist(
      (set) => ({
        accessToken: initialUser.accessToken,
        userInfo: initialUser.userInfo,

        setUserInfo: (userInfo: UserInfoType) => set({ userInfo }),
        setAccessToken: (accessToken: string) => set({ accessToken }),

        resetUser: () =>
          set({
            accessToken: initialUser.accessToken,
            userInfo: initialUser.userInfo,
          }),
      }),
      { name: "user" }
    )
  )
);
