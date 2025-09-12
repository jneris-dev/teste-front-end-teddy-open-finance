import type { ClientResponse } from "./client_interface";

export type ModuleTypes =
  | "createClient"
  | "editClient"
  | "deleteClient"
  | "saveClient"
  | "";

export interface ModalProps {
  title?: string | null;
  onSubmit: (data: any) => void;
  module: ModuleTypes;
  description?: string | null;
  data?: ClientResponse | null;
}

export interface ShowModalState {
  show: boolean;
  modal?: ModalProps | null;
}
