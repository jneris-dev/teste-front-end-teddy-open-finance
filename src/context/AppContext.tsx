import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
} from "react";

import type { AppContextData, Filters } from "../interfaces/app_interface";
import type { ShowModalState } from "../interfaces/modal_interface";

import api from "../services/api";
import type { Client, UsersResponse } from "../interfaces/client_interface";

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

  const [filters, setFilters] = useState({
    page: 1,
    limit: 16,
  } as Filters);

  const [users, setUsers] = useState({} as UsersResponse);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (loadingUsers) {
      setUsers({} as UsersResponse);
      const fetchData = async () => {
        api
          .get(`/users?page=${filters.page}&limit=${filters.limit}`)
          .then((response) => {
            setUsers(response.data);
            setLoadingUsers(false);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      fetchData().catch(console.error);
    }
  }, [loadingUsers]);

  async function handleCreateClient(data: Client) {
    await api
      .post(`/users`, data)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleEditClient(id: number, data: Client) {
    await api
      .patch(`/users/${id}`, {
        name: data.name,
        salary: data.salary,
        companyValuation: data.companyValuation,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleDeleteClient(id: number) {
    await api
      .delete(`/users/${id}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        handleToggleTheme,
        loadingScreen,
        setLoadingScreen,
        showModal,
        setShowModal,

        filters,
        setFilters,

        users,
        loadingUsers,
        setLoadingUsers,

        handleCreateClient,
        handleEditClient,
        handleDeleteClient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
