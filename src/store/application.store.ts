import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthStore, authStoreSlice } from "./auth-store/auth.store";

export const useApplicationStore = create<AuthStore>()(
  persist(
    immer((...a) => ({
      ...authStoreSlice(...a),
    })),
    {
      partialize: ({ token, user }) => ({
        token,
        user,
      }),
      name: "application-store",
    }
  )
);
