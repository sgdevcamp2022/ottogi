import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type MainStatusType = "온라인" | "모두" | "대기 중" | "친구 추가하기";

interface TabState {
  mainStatus: MainStatusType;
}

interface TabAction {
  setMainStatus: (mainStatus: MainStatusType) => void;
}

const useTabStore = create<TabState & TabAction>()(
  devtools((set) => ({
    mainStatus: "온라인",

    setMainStatus: (mainStatus: MainStatusType) => set({ mainStatus }),
  }))
);

export default useTabStore;
