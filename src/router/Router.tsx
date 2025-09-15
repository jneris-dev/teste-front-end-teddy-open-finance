import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useAppContext } from "../context/AppContext";
import { ProtectedRoute } from "../guards/ProtectedRoute";
import { PublicRoute } from "../guards/PublicRoute";

import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import SelectedClients from "../pages/SelectedClients";

export function Router() {
  const { pathname } = useLocation();
  const { auth } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/welcome"
        element={
          <PublicRoute>
            <Welcome />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/selected-clients"
        element={
          <ProtectedRoute>
            <SelectedClients />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate to={auth && auth.loggedIn ? "/" : "/welcome"} replace />
        }
      />
    </Routes>
  );
}
