import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserState = {
 mode: "Searching" | "Hiring";
};

type UserActions = {
 setMode: (newMode: "Searching" | "Hiring") => void;
};

export const useUserStore = create<UserState & UserActions>()(
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
