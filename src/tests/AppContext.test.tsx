import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";

import { AppContextProvider, useAppContext } from "../context/AppContext";
import { AuthContextProvider } from "../context/AuthContext";
import type { Client, UsersResponse } from "../interfaces/client_interface";
import type { Auth } from "../interfaces/app_interface";
import api from "../services/api";

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

const mockSetAuth = vi.fn();
vi.mock("../context/AuthContext", () => ({
  useAuthContext: () => ({ setAuth: mockSetAuth }),
  AuthContextProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

vi.mock("../services/api");

const customWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthContextProvider>
    <AppContextProvider>{children}</AppContextProvider>
  </AuthContextProvider>
);

describe("AppContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    vi.useFakeTimers();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Client Management Functions", () => {
    const mockClient: Client = {
      id: 1,
      name: "Test Client",
      salary: 50000,
      companyValuation: 1000000,
      createdAt: "",
      updatedAt: "",
    };

    it("deve criar um novo cliente com sucesso", async () => {
      (api.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        status: 201,
      });

      const { result } = renderHook(() => useAppContext(), {
        wrapper: customWrapper,
      });

      await act(async () => {
        await result.current.handleCreateClient(mockClient);
      });

      expect(api.post).toHaveBeenCalledWith("/users", mockClient);
      expect(result.current.showModal.show).toBe(true);
      expect(result.current.showModal.modal?.description).toBe(
        "Cliente cadastrado com sucesso!"
      );
    });

    it("deve mostrar um modal de erro na falha de criação de cliente", async () => {
      (api.post as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error("API error")
      );

      const { result } = renderHook(() => useAppContext(), {
        wrapper: customWrapper,
      });

      await act(async () => {
        await result.current.handleCreateClient(mockClient);
      });

      expect(result.current.showModal.show).toBe(true);
      expect(result.current.showModal.modal?.title).toBe(
        "Ops, ocorreu um erro"
      );
    });

    it("deve buscar usuários quando loadingUsers for true", async () => {
      const mockUsersResponse: UsersResponse = {
        clients: [mockClient],
        currentPage: 1,
        totalPages: 1,
      };
      (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockUsersResponse,
      });

      const { result } = renderHook(() => useAppContext(), {
        wrapper: customWrapper,
      });

      await act(async () => {
        result.current.setLoadingUsers(true);
      });

      vi.runAllTimers();

      await vi.waitFor(() => {
        expect(api.get).toHaveBeenCalledWith("/users?page=1&limit=16");
        expect(result.current.users).toEqual(mockUsersResponse);
        expect(result.current.loadingUsers).toBe(false);
      });
    });
  });

  describe("Selected Client Management", () => {
    const initialAuth: Auth = {
      userName: "test.user",
      startSession: "2025-01-01",
      clients: [],
      loggedIn: true,
    };
    const mockClient: Client = {
      id: 1,
      name: "Test Client",
      salary: 50000,
      companyValuation: 1000000,
      createdAt: "",
      updatedAt: "",
    };
    const anotherMockClient: Client = { ...mockClient, id: 2 };

    beforeEach(() => {
      localStorageMock.setItem("authData", JSON.stringify(initialAuth));
    });

    it("deve selecionar um cliente e adicioná-lo ao auth context", () => {
      const { result } = renderHook(() => useAppContext(), {
        wrapper: customWrapper,
      });

      act(() => {
        result.current.handleSelectedClient(mockClient);
      });

      const expectedAuth = { ...initialAuth, clients: [mockClient] };
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "authData",
        JSON.stringify(expectedAuth)
      );
      expect(mockSetAuth).toHaveBeenCalledWith(expectedAuth);
      expect(result.current.showModal.modal?.description).toBe(
        "Cliente selecionado com sucesso!"
      );
    });

    it("deve remover um cliente do auth context", () => {
      const authWithClient: Auth = { ...initialAuth, clients: [mockClient] };
      localStorageMock.setItem("authData", JSON.stringify(authWithClient));

      const { result } = renderHook(() => useAppContext(), {
        wrapper: customWrapper,
      });

      act(() => {
        result.current.handleRemoveClient(String(mockClient.id));
      });

      const expectedAuth = { ...initialAuth, clients: [] };
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "authData",
        JSON.stringify(expectedAuth)
      );
      expect(mockSetAuth).toHaveBeenCalledWith(expectedAuth);
    });

    it("deve limpar todos os clientes selecionados", () => {
      const authWithClients: Auth = {
        ...initialAuth,
        clients: [mockClient, anotherMockClient],
      };
      localStorageMock.setItem("authData", JSON.stringify(authWithClients));

      const { result } = renderHook(() => useAppContext(), {
        wrapper: customWrapper,
      });

      act(() => {
        result.current.handleClearClients();
      });

      const expectedAuth = { ...initialAuth, clients: [] };
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "authData",
        JSON.stringify(expectedAuth)
      );
      expect(mockSetAuth).toHaveBeenCalledWith(expectedAuth);
    });
  });
});
