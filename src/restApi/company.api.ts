import apiClient from "./base.api";
import { User } from "./user.api";

export interface CompanyPaginate {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: Company[];
  };

export interface Company {
  id: string;
  name: string;
  description: string | null;
  adress: string | null;
  maps: string | null;
  logo: string | null;
  capacity: number;
  createdAt: string;
  updatedAt: string;
};

export interface CompanyDetails {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  maps: string | null;
  logo: string | null;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  teachers: User[] | null;
  students: User[] | null;
};

export interface CompanyPaginateResponse {
  status: boolean;
  message: string;
  data: CompanyPaginate;
};

export interface CompanyManyResponse {
  status: boolean;
  message: string;
  data: Company[];
};

export interface CompanyOneResponse {
  status: boolean;
  message: string;
  data: Company;
}

export interface CompanyDetailResponse {
  status: boolean;
  message: string;
  data: CompanyDetails;
};

export interface CompanyCreate {
  name: string[];
  description: string[];
  address: string[];
  logo: File[];
  capacity: number[];
};

export interface CompanyUpdate {
  name: string;
  description: string;
  address: string;
  logo: File;
  capacity: number;
}

export const CompanyShowAllAPI = async (payload: string) => {
  const response = await apiClient.get<CompanyPaginateResponse>(
    `/api/v1/company/show-all?${payload}`
  );
  return response.data;
};

export const CompanyShowOneAPI = async (id: string) => {
  const response = await apiClient.get<CompanyDetailResponse>(
    `/api/v1/company/show-one/${id}`
  );
  return response.data;
};

export const CompanyCreateAPI = async (data: FormData) => {
  const response = await apiClient.post<CompanyManyResponse>(
    "/api/v1/company/create",
    data
  );
  return response.data;
};

export const CompanyUpdateAPI = async (id: string, data: FormData) => {
  const response = await apiClient.put<CompanyOneResponse>(
    `/api/v1/company/update/${id}`,
    data
  );
  return response.data;
};

export const CompanyDeleteAPI = async (id: string) => {
  const response = await apiClient.delete(
    `/api/v1/company/delete/${id}`
  );
  return response.data;
};

export const CompanyApplyAPI = async (companyId: string) => {
  const response = await apiClient.post(
    "/api/v1/company/apply",
    { companyId }
  );
  return response.data;
};

export const CompanyConfirmAPI = async (userId: string, status: string) => {
  const response = await apiClient.post(
    "/api/v1/company/response",
    {userId, status}
  );
  return response.data;
};

export const AddMentorAPI = async (companyId: string, teacherId: string) => {
  const response = await apiClient.post(
    "/api/v1/company/add-mentor",
    {teacherId, companyId}
  );
  return response.data;
};