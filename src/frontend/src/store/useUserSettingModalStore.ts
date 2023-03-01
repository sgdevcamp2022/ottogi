import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ModalState {
  userSettingModal: boolean;
}

interface ModalAction {
  setUserSettingModal: (userSettingModal: boolean) => void;
}

const useUserSettingModalStore = create<ModalState & ModalAction>()(
  devtools(
    (set) => ({
      userSettingModal: false,

      setUserSettingModal: (userSettingModal: boolean) =>
        set({ userSettingModal }),
    }),
    { name: "main" }
  )
);

export default useUserSettingModalStore;
