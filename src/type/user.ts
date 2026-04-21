export type user = {
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

export type Role = {
  id: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Company = {
  id: string;
};
