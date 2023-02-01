import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useLoginStore = create(
  devtools((set) => ({
    email: "",
    password: "",

    setEmail: (email: string) => email,
    setPassword: (password: string) => password,
  }))
);
