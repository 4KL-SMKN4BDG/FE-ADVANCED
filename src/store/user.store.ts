import { create } from "zustand";
import {
    User,
    UserCreate,
    UserShowAllAPI,
    UserShowOneAPI,
    UserCreateAPI,
    UserUpdateAPI,
    UserDeleteAPI
} from "@/restApi/user.api";
import getErrorMessage from "@/restApi/helper.api";

interface AuthState {
    listUser: User[] | null;
    oneUser: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuth: boolean;
    showAll: (payload: string) => Promise<void>;
    showOne: (id: string) => Promise<void>;
    create: (data: UserCreate) => Promise<void>;
    update: (id: string, data: FormData) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
}

const userStore = create<AuthState>((set) => ({
    listUser: null,
    oneUser: null,
    token: null,
    isLoading: false,
    error: null,
    isAuth: true,

    showAll: async (payload: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await UserShowAllAPI(payload);
      set({
        listUser: response.data.items,
        isLoading: false,
      });

    } catch (error) {
      set({
        error: getErrorMessage(error, "Login failed. Please try again."),
        isLoading: false,
      });
    }
  }, 

  showOne: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await UserShowOneAPI(id);
      set({
        oneUser: response.data,
        isLoading: false
      });

    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong. Please try again."),
        isLoading: false
      });
    }
  },

  create: async (data: UserCreate) => {
    set({ isLoading: true, error: null });
    try{
    const response = await UserCreateAPI(data);

    set({
      isLoading: false,
    });
    console.log(response);
    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong, please try again"),
        isLoading: false
      });
    }
  },

  update: async (id: string, data: FormData) => {
    
    set({ isLoading: true, error: null });
    try {
    await UserUpdateAPI(id, data);
    set({
      isLoading: false,
    })
    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong, please try again"),
        isLoading: false
      });
    }
  },

  deleteUser: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await UserDeleteAPI(id);
      set({
        isLoading: false
      });
    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong, please try again"),
        isLoading: false,
      })
    }
  },

}));

export default userStore;