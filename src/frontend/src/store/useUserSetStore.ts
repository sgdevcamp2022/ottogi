import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// export type MainStatusType = "온라인" | "모두" | "대기 중" | "친구 추가하기";
export type UserSettingType = "내 계정" | "프로필" | "알림";

interface TabState {
  userStatus: UserSettingType;
}

interface TabAction {
  userSettingStatus: (userStatus: UserSettingType) => void;
}

const useUserSetStore = create<TabState & TabAction>()(
  devtools(
    persist(
      (set) => ({
        userStatus: "내 계정",
        userTab: "친구",

        userSettingStatus: (userStatus: UserSettingType) => set({ userStatus }),
      }),
      { name: "userSetting" }
    )
  )
);

export default useUserSetStore;
