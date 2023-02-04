import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RegisterState {
  step: number;
  email: string;
  username: string;
  password: string;
}

interface RegisterAction {
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  resetStep: () => void;
  resetInputs: () => void;
}

export const useRegisterStore = create<RegisterState & RegisterAction>()(
  devtools((set) => ({
    email: "",
    username: "",
    password: "",
    step: 1,

    setStep: (step: number) => set({ step }),
    setEmail: (email: string) => set({ email }),
    setUsername: (username: string) => set({ username }),
    setPassword: (password: string) => set({ password }),
    resetStep: () => set({ step: 1 }),
    resetInputs: () => set({ email: "", username: "", password: "" }),
  }))
);
