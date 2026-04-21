// src/store/auth.store.ts
import { create } from "zustand";
import {
  Company,
  CompanyDetails,
  CompanyShowAllAPI,
  CompanyShowOneAPI,
  CompanyCreateAPI,
  CompanyUpdateAPI,
  CompanyDeleteAPI,
  CompanyApplyAPI,
  CompanyConfirmAPI,
  AddMentorAPI,
} from "@/restApi/company.api";
import getErrorMessage from "@/restApi/helper.api";

interface AuthState {
  company: Company[] | null;
  oneCompany: CompanyDetails | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuth: boolean;
  showAll: (payload: string) => Promise<void>;
  showOne: (id: string) => Promise<void>;
  create: (data: FormData) => Promise<void>;
  update: (id: string, data: FormData) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  apply: (id: string) => Promise<void>;
  confirm: (userId: string, status: string) => Promise<void>;
  addMentor: (teacherId: string, companyId: string) => Promise<void>;
}

const companyStore = create<AuthState>((set) => ({
  company: null,
  oneCompany: null,
  token: null,
  isLoading: false,
  error: null,
  isAuth: true,

  showAll: async (payload: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await CompanyShowAllAPI(payload);
      set({
        company: response.data.items,
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
      const response = await CompanyShowOneAPI(id);
      set({
        oneCompany: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: getErrorMessage(
          error,
          "Something went wrong. Please try again."
        ),
        isLoading: false,
      });
    }
  },

  create: async (data: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await CompanyCreateAPI(data);

      set({
        isLoading: false,
      });
      console.log(response);
    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong, please try again"),
        isLoading: false,
      });
    }
  },

  update: async (id: string, data: FormData) => {
    set({ isLoading: true, error: null });
    try {
      await CompanyUpdateAPI(id, data);
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong, please try again"),
        isLoading: false,
      });
    }
  },

  deleteCompany: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await CompanyDeleteAPI(id);
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong, please try again"),
        isLoading: false,
      });
    }
  },

  apply: async (companyId: string) => {
    set({ isLoading: true, error: null });
    try {
      await CompanyApplyAPI(companyId);
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong, please try again"),
        isLoading: false,
      });
    }
  },

  confirm: async (userId: string, status: string) => {
    set({ isLoading: true, error: null });
    try {
      await CompanyConfirmAPI(userId, status);
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong, please try again"),
        isLoading: false,
      });
    }
  },

  addMentor: async (teacherId: string, companyId: string) => {
    set({ isLoading: true, error: null });
    try {
      await AddMentorAPI(companyId, teacherId);
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error: getErrorMessage(error, "Something went wrong, please try again"),
        isLoading: false,
      });
    }
  },
}));

export default companyStore;
