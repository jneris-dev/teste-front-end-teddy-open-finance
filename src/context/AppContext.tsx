import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
} from "react";

import type { AppContextData } from "../interfaces/app_interface";
import type { ShowModalState } from "../interfaces/modal_interface";

interface AppContextProps {
  children: ReactElement;
}

const AppContext = createContext({} as AppContextData);

export function AppContextProvider({ children }: AppContextProps) {
  const [theme, setTheme] = useState(() => localStorage.theme === "dark");
  const [showModal, setShowModal] = useState<ShowModalState>({
    show: false,
    modal: {
      module: "",
      data: null,
      description: null,
      onSubmit: () => {},
      title: null,
    },
  });
  const [loadingScreen, setLoadingScreen] = useState(false);

  function handleToggleTheme() {
    setTheme(!theme);
  }

  useEffect(() => {
    const rootElement = window.document.documentElement;
    const currentTheme = theme;

    const prevTheme = currentTheme ? "light" : "dark";
    rootElement.classList.remove(prevTheme);

    const nextTheme = currentTheme ? "dark" : "light";
    rootElement.classList.add(nextTheme);

    localStorage.setItem("theme", nextTheme);
  }, [theme]);

  useEffect(() => {
    const rootElement = window.document.documentElement;
    const currentTheme = showModal.show;

    const prevTheme = currentTheme ? "overflow-auto" : "overflow-hidden";
    rootElement.classList.remove(prevTheme);

    const nextTheme = currentTheme ? "overflow-hidden" : "overflow-auto";
    rootElement.classList.add(nextTheme);
  }, [showModal]);

  return (
    <AppContext.Provider
      value={{
        theme,
        handleToggleTheme,
        loadingScreen,
        setLoadingScreen,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
