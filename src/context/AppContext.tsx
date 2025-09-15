import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
} from "react";

import type {
  AppContextData,
  Auth,
  Filters,
} from "../interfaces/app_interface";
import type { ShowModalState } from "../interfaces/modal_interface";
import type { Client, UsersResponse } from "../interfaces/client_interface";

import api from "../services/api";
import { formatDateTime } from "../util/formats";

interface AppContextProps {
  children: ReactElement;
}

const AppContext = createContext({} as AppContextData);

export function AppContextProvider({ children }: AppContextProps) {
  const [auth, setAuth] = useState<Auth | null>(null);
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

  useEffect(() => {
    const storedAuth = localStorage.getItem("authData");
    if (storedAuth) {
      try {
        const authData: Auth = JSON.parse(storedAuth);
        setAuth(authData);
      } catch (error) {
        console.error("Failed to parse auth data from localStorage", error);
        localStorage.removeItem("authData");
      }
    }
  }, []);

  const handleLogin = (userName: string) => {
    const storedAuth = localStorage.getItem("authData");
    let currentAuth: Auth | null = null;
    if (storedAuth) {
      try {
        currentAuth = JSON.parse(storedAuth);
      } catch (e) {
        console.error("Erro ao ler dados do localStorage", e);
      }
    }

    let updatedAuth: Auth;

    if (currentAuth && currentAuth.userName === userName) {
      updatedAuth = {
        ...currentAuth,
        startSession: formatDateTime(new Date()),
        loggedIn: true,
      };
      console.log(`User '${userName}' re-authenticated.`);
    } else {
      updatedAuth = {
        userName,
        startSession: formatDateTime(new Date()),
        clients: [],
        loggedIn: true,
      };
      console.log(`New user '${userName}' logged in.`);
    }

    localStorage.setItem("authData", JSON.stringify(updatedAuth));
    setAuth(updatedAuth);
  };

  const handleLogout = () => {
    const storedAuth = localStorage.getItem("authData");
    if (storedAuth) {
      try {
        const currentAuth: Auth = JSON.parse(storedAuth);
        const updatedAuth: Auth = {
          ...currentAuth,
          loggedIn: false,
        };
        localStorage.setItem("authData", JSON.stringify(updatedAuth));
        setAuth(updatedAuth);
        console.log("User logged out but data persisted.");
      } catch (e) {
        console.error("Erro ao ler dados do localStorage para logout", e);
        localStorage.removeItem("authData");
        setAuth(null);
      }
    }
  };

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

        auth,
        handleLogin,
        handleLogout,

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
