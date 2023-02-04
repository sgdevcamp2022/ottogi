import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserInfoType = null | {
  email: string;
  accessToken: string;
  refreshToken: string;
};
interface UserState {
  userInfo: UserInfoType;
}

interface UserAction {
  setUserInfo: (userInfo: UserInfoType) => void;
  resetUserInfo: () => void;
}

export const useUserStore = create<UserState & UserAction>()(
  devtools(
    persist(
      (set) => ({
        userInfo: null,

        setUserInfo: (userInfo: UserInfoType) => set({ userInfo }),
        resetUserInfo: () => set({ userInfo: null }),
      }),
      { name: "user" }
    )
  )
);
