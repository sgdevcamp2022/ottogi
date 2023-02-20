import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ModalState {
  serverSettingModal: boolean;
}

interface ModalAction {
  setServerSettingModal: (serverSettingModal: boolean) => void;
}

const useServerSettingModalStore = create<ModalState & ModalAction>()(
  devtools(
    persist(
      (set) => ({
        serverSettingModal: true,

        setServerSettingModal: (serverSettingModal: boolean) =>
          set({ serverSettingModal }),
      }),
      { name: "main" }
    )
  )
);

export default useServerSettingModalStore;
