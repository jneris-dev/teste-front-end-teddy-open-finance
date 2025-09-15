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
  const [loadingScreen, setLoadingScreen] = useState(true);

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
    const loadAuthAndSetDelay = async () => {
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 500));

      const authPromise = new Promise((resolve) => {
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
        resolve(null);
      });

      await Promise.all([authPromise, delayPromise]);

      setLoadingScreen(false);
    };

    loadAuthAndSetDelay().catch(console.error);
  }, []);

  const handleLogin = (userName: string) => {
    setLoadingScreen(true);

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
    } else {
      updatedAuth = {
        userName,
        startSession: formatDateTime(new Date()),
        clients: [],
        loggedIn: true,
      };
    }

    localStorage.setItem("authData", JSON.stringify(updatedAuth));
    setAuth(updatedAuth);

    setTimeout(() => setLoadingScreen(false), 500);
  };

  const handleLogout = () => {
    setLoadingScreen(true);

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
      } catch (e) {
        console.error("Erro ao ler dados do localStorage para logout", e);
        localStorage.removeItem("authData");
        setAuth(null);
      }
    }

    setTimeout(() => setLoadingScreen(false), 500);
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
        if (response.status === 201) {
          setShowModal({
            show: true,
            modal: {
              module: "default",
              description: "Cliente cadastrado com sucesso!",
              title: "Cliente cadastrado",
              reload: true,
            },
          });
        }
      })
      .catch((err) => {
        setShowModal({
          show: true,
          modal: {
            module: "default",
            description: "Erro ao criar um cliente!",
            title: "Ops, ocorreu um erro",
            reload: true,
          },
        });

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
        if (response.status === 200)
          setShowModal({
            show: true,
            modal: {
              module: "default",
              description: "Cliente editado com sucesso!",
              title: "Cliente editado",
              reload: true,
            },
          });
      })
      .catch((err) => {
        setShowModal({
          show: true,
          modal: {
            module: "default",
            description: "Erro ao editar o cliente!",
            title: "Ops, ocorreu um erro",
            reload: true,
          },
        });

        console.log(err);
      });
  }

  async function handleDeleteClient(id: number) {
    await api
      .delete(`/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setShowModal({
            show: true,
            modal: {
              module: "default",
              description: "Cliente deletado com sucesso!",
              title: "Cliente deletado",
              reload: true,
            },
          });
          handleRemoveClient(String(id));
        }
      })
      .catch((err) => {
        setShowModal({
          show: true,
          modal: {
            module: "default",
            description: "Erro ao deletar o cliente!",
            title: "Ops, ocorreu um erro",
            reload: true,
          },
        });

        console.log(err);
      });
  }

  function handleSelectedClient(client: Client) {
    const storedAuth = localStorage.getItem("authData");

    if (storedAuth) {
      try {
        const currentAuth: Auth = JSON.parse(storedAuth);
        const clientsCopy = [...currentAuth.clients];
        const clientIndex = clientsCopy.findIndex(
          (c: Client) => c.id === client.id
        );

        let updatedClients;

        if (clientIndex > -1) {
          clientsCopy[clientIndex] = client;
          updatedClients = clientsCopy;
        } else {
          updatedClients = [...clientsCopy, client];
        }

        const updatedAuth: Auth = {
          ...currentAuth,
          clients: updatedClients,
        };

        localStorage.setItem("authData", JSON.stringify(updatedAuth));
        setAuth(updatedAuth);

        setShowModal({
          show: true,
          modal: {
            module: "default",
            description: "Cliente selecionado com sucesso!",
            title: "Cliente selecionado",
          },
        });
      } catch (e) {
        console.error(
          "Erro ao ler/escrever dados do localStorage para o cliente",
          e
        );
      }
    }
  }

  function handleRemoveClient(clientId: string) {
    const storedAuth = localStorage.getItem("authData");

    if (storedAuth) {
      try {
        const currentAuth: Auth = JSON.parse(storedAuth);

        const updatedClients = currentAuth.clients.filter(
          (c: Client) => c.id !== Number(clientId)
        );

        const updatedAuth: Auth = {
          ...currentAuth,
          clients: updatedClients,
        };

        localStorage.setItem("authData", JSON.stringify(updatedAuth));
        setAuth(updatedAuth);

        setShowModal({
          show: true,
          modal: {
            module: "default",
            description: "Cliente removido com sucesso!",
            title: "Cliente removido",
          },
        });
      } catch (e) {
        console.error(
          "Erro ao ler/escrever dados do localStorage para remover o cliente",
          e
        );
      }
    }
  }

  function handleClearClients() {
    const storedAuth = localStorage.getItem("authData");

    if (storedAuth) {
      try {
        const currentAuth: Auth = JSON.parse(storedAuth);

        const updatedAuth: Auth = {
          ...currentAuth,
          clients: [],
        };

        localStorage.setItem("authData", JSON.stringify(updatedAuth));
        setAuth(updatedAuth);

        setShowModal({
          show: true,
          modal: {
            module: "default",
            description: "Lista de clientes selecionados limpo com sucesso!",
            title: "Clientes selecionados",
          },
        });
      } catch (e) {
        console.error(
          "Erro ao ler/escrever dados do localStorage para limpar os clientes",
          e
        );
      }
    }
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
        handleSelectedClient,
        handleRemoveClient,
        handleClearClients,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
