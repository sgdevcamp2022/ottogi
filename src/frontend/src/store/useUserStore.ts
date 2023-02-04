import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useUserStore = create(devtools((set) => ({})));
