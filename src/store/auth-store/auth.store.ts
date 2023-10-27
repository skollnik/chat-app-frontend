import { toast } from "react-toastify";
import { StateCreator } from "zustand";
import { User } from "../../auth/model/user.model";
import { LoginCredentials } from "./types/login-credentials.type";
import { axiosInstance } from "../../api/useAxios";

type AuthStoreActions = {
  login: (data: LoginCredentials) => Promise<{ user?: User }>;
  logout: () => void;
  getMe: (token: string) => Promise<User | undefined>;
};

type AuthStoreState = {
  token: string | null;
  user: User | null;
};

export type AuthStore = AuthStoreActions & AuthStoreState;

const state: AuthStoreState = {
  token: null,
  user: null,
};

export const authStoreSlice: StateCreator<AuthStore> = (set, get) => ({
  ...state,
  login: async (data: LoginCredentials) => {
    const resp = await axiosInstance.post("/auth/login", data);
    set((state) => ({ token: resp.data.access_token }));
    const user = await get().getMe(resp.data.access_token);
    // toast.success("Successfully logged in!", {
    //   position: "bottom-right",
    // });
    return { user };
  },

  logout: () => {
    set((state) => ({ token: null, user: null }));
  },
  getMe: async (token: string) => {
    try {
      const resp = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({ user: resp.data }));
      return resp.data;
    } catch (error: any) {
      console.log(error);
    }
  },
});
