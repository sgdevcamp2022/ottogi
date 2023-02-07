import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type UserInfoType = {
  email: string;
  accessToken: string;
};
interface UserState {
  userInfo: UserInfoType;
}

const initialUserInfo = {
  email: "",
  accessToken: "",
};

interface UserAction {
  setUserInfo: (userInfo: UserInfoType) => void;
  setAccessToken: (accessToken: string) => void;
  resetUserInfo: () => void;
}

export const useUserStore = create<UserState & UserAction>()(
  devtools(
    persist(
      (set, get) => ({
        userInfo: initialUserInfo,

        setUserInfo: (userInfo: UserInfoType) => set({ userInfo }),
        setAccessToken: (accessToken: string) => {
          const newUserInfo = get().userInfo;
          if (!newUserInfo) return;
          newUserInfo.accessToken = accessToken;
          return set({ userInfo: newUserInfo });
        },
        resetUserInfo: () => set({ userInfo: initialUserInfo }),
      }),
      { name: "user" }
    )
  )
);