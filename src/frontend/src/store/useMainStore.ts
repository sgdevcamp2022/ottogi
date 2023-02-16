import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type MainStatusType = "온라인" | "모두" | "대기 중" | "친구 추가하기";

interface TabState {
  mainStatus: MainStatusType;
}

interface TabAction {
  setMainStatus: (mainStatus: MainStatusType) => void;
}

const useMainStore = create<TabState & TabAction>()(
  devtools(
    persist(
      (set) => ({
        mainStatus: "온라인",
        mainTab: "친구",

        setMainStatus: (mainStatus: MainStatusType) => set({ mainStatus }),
      }),
      { name: "main" }
    )
  )
);

export default useMainStore;
