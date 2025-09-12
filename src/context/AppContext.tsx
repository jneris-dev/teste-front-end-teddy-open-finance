import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
} from "react";

import type { AppContextData } from "../interfaces/app_interface";
import type { ShowModalState } from "../interfaces/modal_interface";

import api from "../services/api";
import type { ClientResponse } from "../interfaces/client_interface";

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

  const [clients, setClients] = useState([] as ClientResponse[]);
  const [loadingClients, setLoadingClients] = useState(false);

  useEffect(() => {
    if (loadingClients) {
      setClients([] as ClientResponse[]);
      const fetchData = async () => {
        api
          .get(`/users?page=1&limit=10`)
          .then((response) => {
            setClients(response.data.clients);
            setLoadingClients(false);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      fetchData().catch(console.error);
    }
  }, [loadingClients]);

  return (
    <AppContext.Provider
      value={{
        theme,
        handleToggleTheme,
        loadingScreen,
        setLoadingScreen,
        showModal,
        setShowModal,

        clients,
        loadingClients,
        setLoadingClients,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
