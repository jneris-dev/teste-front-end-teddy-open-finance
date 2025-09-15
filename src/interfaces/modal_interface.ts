import type { Client } from "./client_interface";

export type ModuleTypes =
  | "createClient"
  | "editClient"
  | "deleteClient"
  | "saveClient"
  | "default"
  | "";

export interface ModalProps {
  title?: string | null;
  module: ModuleTypes;
  description?: string | null;
  data?: Client | null;
  reload?: boolean;
}

export interface ShowModalState {
  show: boolean;
  modal?: ModalProps | null;
}
