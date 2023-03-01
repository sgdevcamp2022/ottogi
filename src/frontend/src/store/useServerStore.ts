import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ServerState {
  server: string;
}

interface ServerAction {
  setServer: (server: string) => void;
}

const useServerStore = create<ServerState & ServerAction>()(
  devtools(
    persist(
      (set) => ({
        server: "메인",

        setServer: (server: string) => set({ server }),
      }),
      { name: "userSetting" }
    )
  )
);

export default useServerStore;
