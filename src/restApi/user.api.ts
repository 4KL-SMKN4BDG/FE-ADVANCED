import apiClient from "./base.api";
import { Company } from "./company.api"

export interface UserPaginate {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: User[];
};

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
};

export interface Role {
  id: string,
  code: string,
  description: string,
  createdAt: string,
  updatedAt: string
};

export interface UserPaginateResponse {
  status: boolean;
  message: string;
  data: UserPaginate;
};

export interface UserManyResponse {
  status: boolean;
  message: string;
  data: User[];
};

export interface UserOneResponse {
  status: boolean;
  message: string;
  data: User;
};

export interface NewUsers {
  name: string;
  nomorInduk: string;
}

export interface UserCreate {
  role: string;
  newUsers: NewUsers[];
}

export interface UserUpdate {
  name: string | null;
  nomorInduk: string | null;
  email: string | null;
  
  class: string | null;
  major: string | null;
  status: string | null;

  organizationDesc: string | null;
  experienceDesc: string | null;

  birthPlace: string | null;
  birthDate: string | null;
  address: string | null;
  profilePhoto: File | null;
}

export const UserShowAllAPI = async (payload: string) => {
  const response = await apiClient.get<UserPaginateResponse>(
    `/api/v1/user/show-all?${payload}`
  );
  return response.data;
};

export const UserShowOneAPI = async (id: string) => {
  const response = await apiClient.get<UserOneResponse>(
    `/api/v1/user/show-one/${id}`
  );
  return response.data;
};

// Ini yang diganti pin jadi, FormData diganti jadi JSON biar kebaca katanya.
export const UserCreateAPI = async (data: UserCreate) => {
  const response = await apiClient.post<UserManyResponse>(
    "/api/v1/user/create",
    data
  );
  return response.data;
};

export const UserUpdateAPI = async (id: string, data: FormData) => {
  const response = await apiClient.put<UserOneResponse>(
    `/api/v1/user/update/${id}`,
    data
  );
  return response.data;
};

export const UserDeleteAPI = async (id: string) => {
  const response = await apiClient.delete(
    `/api/v1/user/delete/${id}`
  );
  return response.data;
};
