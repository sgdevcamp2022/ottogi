import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface DeviceState {
  mic: boolean;
  sound: boolean;
}

interface DeviceAction {
  setMic: (mic: boolean) => void;
  setSound: (sound: boolean) => void;
}

const useDeviceStore = create<DeviceState & DeviceAction>()(
  devtools(
    persist(
      (set) => ({
        mic: false,
        sound: false,

        setMic: (mic: boolean) => set({ mic }),
        setSound: (sound: boolean) => set({ sound }),
      }),
      { name: "main" }
    )
  )
);

export default useDeviceStore;
