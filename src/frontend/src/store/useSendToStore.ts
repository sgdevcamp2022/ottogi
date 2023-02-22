import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SendToState {
  sendTo: string;
}

interface SendToAction {
  setSendTo: (sendTo: string) => void;
}

const useSendToStore = create<SendToState & SendToAction>()(
  devtools(
    persist(
      (set) => ({
        sendTo: "",

        setSendTo: (sendTo: string) => set({ sendTo }),
      }),
      { name: "sendTo" }
    )
  )
);

export default useSendToStore;
