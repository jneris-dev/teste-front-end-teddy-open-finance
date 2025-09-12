import type { ShowModalState } from "./modal_interface";

export interface AppContextData {
  theme: boolean;
  handleToggleTheme: () => void;
  loadingScreen: boolean;
  setLoadingScreen: (loading: boolean) => void;
  showModal: ShowModalState;
  setShowModal: (state: ShowModalState) => void;
}
