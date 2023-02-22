import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalState {
  inviteFriendModal: boolean;
}

interface ModalAction {
  setInviteFriendModal: (inviteFriendModal: boolean) => void;
}

const useModalStore = create<ModalState & ModalAction>()(
  devtools((set) => ({
    inviteFriendModal: true,

    setInviteFriendModal: (inviteFriendModal: boolean) =>
      set({ inviteFriendModal }),
  }))
);

export default useModalStore;
