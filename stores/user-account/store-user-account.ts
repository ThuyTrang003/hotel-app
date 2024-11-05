import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserAcountStore {
    userAccount: { id: string; role: string } | null;
    setUserAccount: (id: string, role: string) => void;
    resetUserAccount: () => void;
}

export const useUserAccount = create(
    persist<UserAcountStore>(
        (set) => ({
            userAccount: null,
            setUserAccount: (id, role) =>
                set(() => ({
                    userAccount: {
                        id: id,
                        role: role,
                    },
                })),
            resetUserAccount: () => set(() => ({ userAccount: null })),
        }),
        {
            name: "userAccount",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
