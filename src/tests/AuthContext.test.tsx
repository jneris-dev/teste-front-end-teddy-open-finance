import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { AuthContextProvider, useAuthContext } from "../context/AuthContext";
import type { Auth } from "../interfaces/app_interface";

const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key]),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

vi.mock("../util/crypto", () => ({
  encrypt: vi.fn((data: Auth) => JSON.stringify(data)),
  decrypt: vi.fn((data: string) => JSON.parse(data)),
}));

vi.mock("../util/formats", () => ({
  formatDateTime: vi.fn(() => "2025-01-01 12:00:00"),
}));

interface AuthContextWrapperProps {
  children: React.ReactNode;
}

const customWrapper = ({ children }: AuthContextWrapperProps) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

describe("AuthContext", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("deve iniciar com a tela de loading e carregar os dados do localStorage", async () => {
    const storedAuthData: Auth = {
      userName: "existing.user",
      startSession: "2025-01-01 10:00:00",
      clients: [],
      loggedIn: true,
    };
    localStorageMock.setItem("authData", JSON.stringify(storedAuthData));

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: customWrapper,
    });

    expect(result.current.loadingScreen).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.auth).toEqual(storedAuthData);
    expect(result.current.loadingScreen).toBe(false);
  });

  it("deve logar um novo usuário e salvar os dados no localStorage", async () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: customWrapper,
    });

    await act(async () => {
      result.current.handleLogin("new.user");
      vi.advanceTimersByTime(500);
    });

    const newAuthData = {
      userName: "new.user",
      startSession: "2025-01-01 12:00:00",
      clients: [],
      loggedIn: true,
    };

    expect(result.current.auth).toEqual(newAuthData);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "authData",
      JSON.stringify(newAuthData)
    );
    expect(result.current.loadingScreen).toBe(false);
  });

  it("deve deslogar o usuário e atualizar o estado e o localStorage", async () => {
    const loggedInAuthData: Auth = {
      userName: "logged.in",
      startSession: "2025-01-01 12:00:00",
      clients: [],
      loggedIn: true,
    };
    localStorageMock.setItem("authData", JSON.stringify(loggedInAuthData));

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: customWrapper,
    });

    await act(async () => {
      result.current.handleLogout();
      vi.advanceTimersByTime(500);
    });

    const loggedOutAuthData = { ...loggedInAuthData, loggedIn: false };

    expect(result.current.auth).toEqual(loggedOutAuthData);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "authData",
      JSON.stringify(loggedOutAuthData)
    );
    expect(result.current.loadingScreen).toBe(false);
  });
});
