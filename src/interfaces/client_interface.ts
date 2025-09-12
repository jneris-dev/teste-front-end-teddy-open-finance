export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UsersResponse {
  clients: Client[];
  currentPage: number;
  totalPages: number;
}
