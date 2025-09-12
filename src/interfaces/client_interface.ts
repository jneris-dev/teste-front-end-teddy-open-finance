export interface Client {
  id?: number;
  name: string;
  salary: number | string;
  companyValuation: number | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UsersResponse {
  clients: Client[];
  currentPage: number;
  totalPages: number;
}
