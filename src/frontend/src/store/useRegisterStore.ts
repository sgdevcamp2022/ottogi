import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RegisterState {
  step: number;
  email: string;
  name: string;
  password: string;
}

interface RegisterAction {
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  resetStep: () => void;
  resetInputs: () => void;
}

export const useRegisterStore = create<RegisterState & RegisterAction>()(
  devtools((set) => ({
    email: "",
    name: "",
    password: "",
    step: 1,

    setStep: (step: number) => set({ step }),
    setEmail: (email: string) => set({ email }),
    setName: (name: string) => set({ name }),
    setPassword: (password: string) => set({ password }),
    resetStep: () => set({ step: 1 }),
    resetInputs: () => set({ email: "", name: "", password: "" }),
  }))
);
