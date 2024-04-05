import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserState = {
 mode: "Searching" | "Hiring";
};

export const useUserStore = create<UserState>()(
 devtools(
  persist(
   (set) => ({
    mode: "Searching",
    setMode: (newMode: "Searching" | "Hiring") => set({ mode: newMode }),
   }),
   { name: "user-store" }
  )
 )
);
