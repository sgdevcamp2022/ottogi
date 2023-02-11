import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// export type MainStatusType = "온라인" | "모두" | "대기 중" | "친구 추가하기";
export type ServerSettingType = "일반" | "멤버" | "초대";

interface TabState {
  setStatus: ServerSettingType;
}

interface TabAction {
  setSettingStatus: (userStatus: ServerSettingType) => void;
}

const useServerSetStore = create<TabState & TabAction>()(
  devtools(
    persist(
      (set) => ({
        setStatus: "일반",

        setSettingStatus: (setStatus: ServerSettingType) => set({ setStatus }),
      }),
      { name: "server" }
    )
  )
);

export default useServerSetStore;
