import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type MainStatusType = "온라인" | "모두" | "대기 중" | "친구 추가하기";

interface TabState {
  mainStatus: MainStatusType;
  userId: number;
  userName: string;
  deleteFriendEmail: string;
}

interface TabAction {
  setMainStatus: (mainStatus: MainStatusType) => void;
  setUserId: (userId: number) => void;
  setUserName: (userName: string) => void;
  setDeleteFriendEmail: (deleteFriendEmail: string) => void;
}

const useMainStore = create<TabState & TabAction>()(
  devtools(
    persist(
      (set) => ({
        mainStatus: "온라인",
        userId: -1,
        userName: "",
        deleteFriendEmail: "",

        setMainStatus: (mainStatus: MainStatusType) => set({ mainStatus }),
        setUserId: (userId: number) => set({ userId }),
        setUserName: (userName: string) => set({ userName }),
        setDeleteFriendEmail: (deleteFriendEmail: string) =>
          set({ deleteFriendEmail }),
      }),
      { name: "main" }
    )
  )
);

export default useMainStore;
