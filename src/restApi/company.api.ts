import apiClient from "./base.api";

export interface CompanyData {
  total_items: number;
  page: number;
  limit: number;
  total_pages: 2;
  items: Company[];
  };

export interface Company {
  id: string;
  name: string;
  description: string | null;
  adress: string | null;
  logo: string | null;
  capacity: number;
  createdAt: string;
  updatedAt: string;
};

export interface CompanyDetails {
  id: string;
  name: string;
  description: string | null;
  adress: string | null;
  logo: string | null;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  user: string;
}

export interface CompanyResponse {
  status: boolean;
  message: string;
  data: CompanyData;
};

export interface CompanyCreate {
  name: string[];
  description: string[];
  address: string[];
  logo: File[];
  capacity: number[];
};

export interface CompanyCreateResponse {
  status: boolean;
  message: string;
  data: Company[];
};

export interface CompanyOneResponse {
  status: boolean;
  message: string;
  data: Company;
};

export const CompanyShowAllAPI = async (payload: string) => {
  const response = await apiClient.get(
    `/api/v1/company/show-all?${payload}`
  );
  return response.data;
};

export const CompanyShowOneAPI = async (id: string) => {
  const response = await apiClient.get(
    `/api/v1/company/show-one/${id}`
  );
  return response.data;
};

export const CompanyCreateAPI = async (data: FormData) => {
  const response = await apiClient.post<CompanyCreateResponse>(
    "/api/v1/company/create",
    data
  );
  return response.data;
};

export const CompanyUpdateAPI = async (id: string, data: CompanyCreate) => {
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