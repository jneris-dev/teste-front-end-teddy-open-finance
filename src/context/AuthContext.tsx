import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
} from "react";

import type { AuthContextData, Auth } from "../interfaces/app_interface";
import { formatDateTime } from "../util/formats";
import { encrypt, decrypt } from "../util/crypto";

interface AuthContextProps {
  children: ReactElement;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProps) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    const loadAuthAndSetDelay = async () => {
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 500));

      const authPromise = new Promise((resolve) => {
        const storedAuth = localStorage.getItem("authData");
        if (storedAuth) {
          try {
            const authData: Auth = decrypt(storedAuth);
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
        currentAuth = decrypt(storedAuth);
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

    localStorage.setItem("authData", encrypt(updatedAuth));
    setAuth(updatedAuth);

    setTimeout(() => setLoadingScreen(false), 500);
  };

  const handleLogout = () => {
    setLoadingScreen(true);

    const storedAuth = localStorage.getItem("authData");
    if (storedAuth) {
      try {
        const currentAuth: Auth = decrypt(storedAuth);
        const updatedAuth: Auth = {
          ...currentAuth,
          loggedIn: false,
        };
        localStorage.setItem("authData", encrypt(updatedAuth));
        setAuth(updatedAuth);
      } catch (e) {
        console.error("Erro ao ler dados do localStorage para logout", e);
        localStorage.removeItem("authData");
        setAuth(null);
      }
    }

    setTimeout(() => setLoadingScreen(false), 500);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        handleLogin,
        handleLogout,

        loadingScreen,
        setLoadingScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
