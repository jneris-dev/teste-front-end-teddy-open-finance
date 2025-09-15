import { Navigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { auth } = useAuthContext();

  if (auth && auth.loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
