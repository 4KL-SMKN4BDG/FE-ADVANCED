// src/api/authAPI.ts
// import { reset } from "canvas-confetti";
import apiClient from "./base.api";
// import { Role } from "./utils/user";

export interface User {
  id: string;
  name: string;
  nomorInduk: string;
  email: string | null;

  class: string | null;
  major: string | null;
  status: string | null;

  organizationDesc: string | null;
  experienceDesc: string | null;

  birthPlace: string | null;
  birthDate: string | null;
  address: string | null;
  profilePhoto: string | null;
  companyId: string | null;
  createdAt: string;
  updatedAt: string;

  roles: Role[];
  company: Company | null;
}

export interface Company {
  id: string
}

export interface Role {
  id: string,
  code: string,
  description: string,
  createdAt: string,
  updatedAt: string
}

export interface LoginData {
  user: User;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: LoginData;
}

export interface LoginCredentials {
  nomorInduk: string;
  password: string;
}

export interface ResetPassword{
  resetToken: string;
  newPassword: string;
}

export interface ForgotPassword {
  email: string;
}

export const loginAPI = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/api/v1/auth/login",

    credentials,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const forgotPasswordAPI = async (
  email: ForgotPassword
): Promise<void> => {
  const response = await apiClient.post(
    "/api/v1/auth/forgot-password",
    email,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }
    }
  )
  return response.data;
}

export const resetPasswordAPI = async (
  data: ResetPassword
): Promise<void> => {
  const token = sessionStorage.getItem("token");
  const response = await apiClient.post(
  "/api/v1/auth/reset-password",
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);
  return response.data;
};

export const refreshTokenAPI = async (
  refreshToken: string
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/api/v1/auth/refresh", {
    refreshToken,
  });
  return response.data;
};
