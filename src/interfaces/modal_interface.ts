import type { Client } from "./client_interface";

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
  data?: Client | null;
}

export interface ShowModalState {
  show: boolean;
  modal?: ModalProps | null;
}
