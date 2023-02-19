import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ModalState {
  inviteFriendModal: boolean;
}

interface ModalAction {
  setInviteFriendModal: (inviteFriendModal: boolean) => void;
}

const useModalStore = create<ModalState & ModalAction>()(
  devtools(
    persist(
      (set) => ({
        inviteFriendModal: true,

        setInviteFriendModal: (inviteFriendModal: boolean) =>
          set({ inviteFriendModal }),
      }),
      { name: "main" }
    )
  )
);

export default useModalStore;
