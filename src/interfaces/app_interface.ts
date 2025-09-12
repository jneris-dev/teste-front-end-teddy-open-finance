import type { Client, UsersResponse } from "./client_interface";
import type { ShowModalState } from "./modal_interface";

export interface AppContextData {
  theme: boolean;
  handleToggleTheme: () => void;
  loadingScreen: boolean;
  setLoadingScreen: (loading: boolean) => void;
  showModal: ShowModalState;
  setShowModal: (state: ShowModalState) => void;

  filters: Filters;
  setFilters: (filters: Filters) => void;

  users: UsersResponse;
  loadingUsers: boolean;
  setLoadingUsers: (loading: boolean) => void;

  handleCreateClient: (data: Client) => void;
  handleEditClient: (id: number, data: Client) => void;
  handleDeleteClient: (id: number) => void;
}

export interface Filters {
  page: number;
  limit: number;
}
