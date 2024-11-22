import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SidebarStore {
    focusState: string;
    setFocusState: (state: string) => void;
}

export const useSidebar = create(
    persist<SidebarStore>(
        (set) => ({
            focusState: "",
            setFocusState: (payload) => set(() => ({ focusState: payload })),
        }),
        {
            name: "sidebar",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
