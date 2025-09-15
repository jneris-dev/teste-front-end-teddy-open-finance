import { Navigate } from "react-router-dom";

import { useAppContext } from "../context/AppContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { auth } = useAppContext();

  if (auth && auth.loggedIn) {
    return children;
  } else {
    return <Navigate to="/welcome" replace />;
  }
}
